import React, { useRef, useState, useEffect } from 'react';
import * as ort from 'onnxruntime-web';
import Webcam from 'react-webcam';
import './App.css';

const MODEL_URL = '/model/facenet_simplified.onnx';
const EMBEDDING_PATH = '/model/pre_existing_embedding.json';

function App() {
  const [model, setModel] = useState(null);
  const webcamRef = useRef(null);
  const [storedEmbeddings, setStoredEmbeddings] = useState([]);
  const [authenticatedName, setAuthenticatedName] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inLiveMode, setInLiveMode] = useState(false);
  const [authenticationMessage, setAuthenticationMessage] = useState('');

  useEffect(() => {
    const loadModel = async () => {
      try {
        const session = await ort.InferenceSession.create(MODEL_URL);
        setModel(session);
        const response = await fetch(EMBEDDING_PATH);
        const data = await response.json();
        setStoredEmbeddings(data.embeddings);
      } catch (error) {
        console.error("Error loading model or embeddings:", error);
      }
    };
    loadModel();
  }, []);

  const preprocessImage = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
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

    return new ort.Tensor('float32', data, [1, 3, 160, 160]);
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

  const checkSimilarity = (newEmbedding) => {
    let maxSimilarity = 0;
    let name = null;

    storedEmbeddings.forEach((storedEmbedding) => {
      const similarity = compareEmbeddings(newEmbedding, storedEmbedding.embedding);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        name = storedEmbedding.name;
      }
    });

    return { similarity: maxSimilarity, name };
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

          const { similarity, name } = checkSimilarity(newEmbedding);

          if (similarity > 0.1) { 
            setAuthenticatedName(name);
            setAuthenticationMessage(`User Found: ${name}`);
          } else {
            setAuthenticatedName(null);
            setAuthenticationMessage('Not Authenticated');
          }

          // Transition to live mode
          setInLiveMode(true);

        } catch (error) {
          console.error("Error running inference:", error);
        }
      };
    }
  };

  useEffect(() => {
    const processFrame = async () => {
      if (webcamRef.current && model && inLiveMode && !isProcessing) {
        setIsProcessing(true);
        const imageSrc = webcamRef.current.getScreenshot();
        const img = new Image();
        img.src = imageSrc;
        img.onload = async () => {
          const tensor = preprocessImage(img);
          try {
            const feeds = { input: tensor };
            const results = await model.run(feeds);
            const newEmbedding = results.output.data;

            checkSimilarity(newEmbedding);

          } catch (error) {
            console.error("Error running inference:", error);
          }
          setIsProcessing(false);
        };
      }
    };

    if (inLiveMode) {
      const intervalId = setInterval(processFrame, 1000); 
      return () => clearInterval(intervalId);
    }
  }, [model, storedEmbeddings, inLiveMode, isProcessing]);

  return (
    <div className="App">
      <h1>Face Authentication</h1>
      {authenticatedName && !inLiveMode && (
        <h2>{authenticatedName}</h2>
      )}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <div>
        {!inLiveMode && (
          <>
            <button onClick={handleCaptureAndCheck}>Capture Image and Check</button>
            <h3>Capture Image to find USER</h3>
            {authenticationMessage && authenticatedName  && (
              <div>                
                <h2>{authenticationMessage}</h2>
              </div>
            )}
          </>
        )}
        {inLiveMode && (
          <div>
            <h3>Welcome, {authenticatedName}</h3>
            <h2>Live Video Mode</h2>
            
            <p>Your Live Video is being captured</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
