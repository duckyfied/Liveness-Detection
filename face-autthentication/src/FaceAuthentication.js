import React, { useState, useEffect, useRef } from "react";
import * as ort from "onnxruntime-web";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import { openDB, getModelFromDB, saveModelToDB } from "./indexedDB";
import "./faceauth.css";
import { translations } from './translations';
const MODEL_URL = "/model/facenet_simplified.onnx";
const DB_NAME = "ModelCacheDB";
const STORE_NAME = "models";
const MODEL_KEY = "facenet_model";

function FaceAuthentication() {
  const [model, setModel] = useState(null);
  const webcamRef = useRef(null);
  const [authenticatedName, setAuthenticatedName] = useState(null);
  const [aadharNumber, setAadharNumber] = useState(null);
  const [encoding, setEncoding] = useState(null);
  const [authenticationMessage, setAuthenticationMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const language = location.state?.language || "en";
  
  useEffect(() => {
    const { state } = location;
    if (state && state.userData) {
      setAuthenticatedName(state.userData.name);
      setAadharNumber(state.userData.aadhar);
      const storedEncoding = JSON.parse(state.userData.encoding);
      setEncoding(new Float32Array(storedEncoding));
    }
  }, [location]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Open or create the IndexedDB database
        const db = await openDB(DB_NAME, STORE_NAME);

        // Attempt to load the model from IndexedDB
        let session = await getModelFromDB(db, STORE_NAME, MODEL_KEY);

        if (session) {
          // If the model is found in IndexedDB, create a session from the binary data
          session = await ort.InferenceSession.create(session);
          console.log("Loaded model from IndexedDB.");
        } else {
          // If not found, fetch the model from the server
          const modelBytes = await (await fetch(MODEL_URL)).arrayBuffer();
          session = await ort.InferenceSession.create(modelBytes);

          // Save the fetched model to IndexedDB for future use
          await saveModelToDB(db, STORE_NAME, MODEL_KEY, modelBytes);
          console.log("Downloaded model and saved to IndexedDB.");
        }

        // Set the model in the state
        setModel(session);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);


  const preprocessImage = (image) => {
    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");
    const resizeCanvas = document.createElement("canvas");
    const resizeCtx = resizeCanvas.getContext("2d");
    const outputSize = 160;
    resizeCanvas.width = outputSize;
    resizeCanvas.height = outputSize;
    const cropSize = Math.min(image.width, image.height);
    const cropX = (image.width - cropSize) / 2;
    const cropY = 0;
    cropCanvas.width = cropSize;
    cropCanvas.height = cropSize;
    cropCtx.drawImage(
      image,
      cropX,
      cropY,
      cropSize,
      cropSize,
      0,
      0,
      cropSize,
      cropSize
    );
    resizeCtx.drawImage(
      cropCanvas,
      0,
      0,
      cropSize,
      cropSize,
      0,
      0,
      outputSize,
      outputSize
    );
    const imgData = resizeCtx.getImageData(0, 0, outputSize, outputSize);
    const data = new Float32Array(outputSize * outputSize * 3);
    for (let i = 0; i < outputSize * outputSize; i++) {
      data[i] = imgData.data[i * 4] / 255.0; // R channel
      data[i + outputSize * outputSize] = imgData.data[i * 4 + 1] / 255.0; // G channel
      data[i + outputSize * outputSize * 2] = imgData.data[i * 4 + 2] / 255.0; // B channel
    }
    return new ort.Tensor("float32", data, [1, 3, outputSize, outputSize]);
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

            console.log("New Embedding:", newEmbedding);
            console.log("Stored Encoding:", encoding);
            console.log("Similarity:", similarity);
            if (similarity > 0.5) {
              setAuthenticationMessage(
                `Authentication Successful for: ${authenticatedName}`
              );
              setAuthenticatedName(null); // Hide details after capture
              setAadharNumber(null);
              const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                  if (prev === 1) {
                    clearInterval(countdownInterval);
                    navigate("/options");
                  }
                  return prev - 1;
                });
              }, 1000);
            } else {
              setAuthenticationMessage("Authentication Failed");
              setAuthenticatedName(null); // Hide details after capture
              setAadharNumber(null);
              const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                  if (prev === 1) {
                    clearInterval(countdownInterval);
                    window.location.reload();
                  }
                  return prev - 1;
                });
              }, 1000);
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
      {/* <h1>Face Authentication</h1> */}
      <div className="FaceAuthentication-container">
        <div className="Webcam-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="Webcam-feed"
          />
        </div>
        <div className="Auth-details-container">
          {authenticatedName && aadharNumber && (
            <>
              <h2>{translations.welcomeMessage[language]} {authenticatedName}</h2>
<p>{translations.aadhaarNumberLabel[language]} {aadharNumber}</p>
<button className="b1" onClick={handleCaptureAndCheck}>
  {translations.captureAndCheckButton[language]}
</button>
            </>
          )}
          {authenticationMessage && (
            <div>
              <h2>{authenticationMessage}</h2>
              <p>{translations.redirectingMessage[language]} {countdown} {translations.secondsLabel[language]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FaceAuthentication;
