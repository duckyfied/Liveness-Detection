import React, { useState, useEffect, useRef } from "react";
import * as ort from "onnxruntime-web";
import Webcam from "react-webcam";
import { useLocation } from "react-router-dom";
import "./App.css";

const MODEL_URL = "/model/facenet_simplified.onnx";

function FaceAuthentication() {
  const [model, setModel] = useState(null);
  const webcamRef = useRef(null);
  const [authenticatedName, setAuthenticatedName] = useState(null);
  const [aadharNumber, setAadharNumber] = useState(null);
  const [encoding, setEncoding] = useState(null);
  const [authenticationMessage, setAuthenticationMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state && state.userData) {
      setAuthenticatedName(state.userData.name);
      setAadharNumber(state.userData.aadhar);
      // Convert the stored encoding string to a Float32Array
      const storedEncoding = JSON.parse(state.userData.encoding);
      setEncoding(new Float32Array(storedEncoding));
    }
  }, [location]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const session = await ort.InferenceSession.create(MODEL_URL);
        setModel(session);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, []);

  const preprocessImage = (image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 160;
    canvas.height = 160;
    ctx.drawImage(image, 0, 0, 160, 160);
    const imgData = ctx.getImageData(0, 0, 160, 160);

    const data = new Float32Array(160 * 160 * 3);
    for (let i = 0; i < 160 * 160; i++) {
      data[i] = imgData.data[i * 4] / 255.0; // R
      data[i + 160 * 160] = imgData.data[i * 4 + 1] / 255.0; // G
      data[i + 160 * 160 * 2] = imgData.data[i * 4 + 2] / 255.0; // B
    }

    return new ort.Tensor("float32", data, [1, 3, 160, 160]);
  };

  const compareEmbeddings = (embedding1, embedding2) => {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
      normA += embedding1[i] ** 2;
      normB += embedding2[i] ** 2;
    }
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    const similarity = dotProduct / (normA * normB);
    return similarity;
  };

  const handleCaptureAndCheck = async () => {
    if (webcamRef.current && model) {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = imageSrc;
      img.onload = async () => {
        const tensor = preprocessImage(img);
        try {
          const feeds = { input: tensor };
          const results = await model.run(feeds);
          const newEmbedding = results.output.data;

          if (encoding) {
            const similarity = compareEmbeddings(newEmbedding, encoding);

            // Log embeddings and similarity for debugging
            console.log("New Embedding:", newEmbedding);
            console.log("Stored Encoding:", encoding);
            console.log("Similarity:", similarity);

            if (similarity > 0.1) {
              setAuthenticationMessage(
                `Authentication Successful for: ${authenticatedName}`
              );
            } else {
              setAuthenticationMessage("Authentication Failed");
            }
          } else {
            setAuthenticationMessage("No encoding found for comparison");
          }
        } catch (error) {
          console.error("Error running inference:", error);
        }
      };
    }
  };

  return (
    <div className="App">
      <h1>Face Authentication</h1>
      <div className="Webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="Webcam"
        />
        <div className="Face-overlay-container">
          <div className="Face-overlay"></div>
        </div>
      </div>
      <div>
        <h3>
          {authenticatedName
            ? `Welcome, ${authenticatedName}`
            : "Please capture your image"}
        </h3>
        {aadharNumber && <p>Aadhar Number: {aadharNumber}</p>}
        <button className="Capture-button" onClick={handleCaptureAndCheck}>
          Capture Image and Check
        </button>
        {authenticationMessage && (
          <div>
            <h2>{authenticationMessage}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default FaceAuthentication;
