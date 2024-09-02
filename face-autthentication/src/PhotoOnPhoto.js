import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as ort from 'onnxruntime-web';
import { useLocation } from 'react-router-dom';
import { openDB, getModelFromDB, saveModelToDB } from './indexedDB'; // Import IndexedDB utility functions

const MODEL_URL = '/model/live_vs_photo_model.onnx';
const DB_NAME = 'onnxModels';
const STORE_NAME = 'models';
const MODEL_KEY = 'live_vs_photo_model';


// const MODEL_URL = '/model/live_vs_photo_model.onnx';

const PhotoOnPhoto = () => {
  const [model, setModel] = useState(null);
  const [isPhoto, setIsPhoto] = useState(false);
  const webcamRef = useRef(null);
  const location = useLocation();

  
  useEffect(() => {
    const loadModel = async () => {
      try {
        const db = await openDB(DB_NAME, STORE_NAME);
        let session = await getModelFromDB(db, STORE_NAME, MODEL_KEY);
        
        if (session) {
          // If model exists in IndexedDB, use it
          session = await ort.InferenceSession.create(session);
          console.log("Loaded model from IndexedDB");
        } else {
          // Otherwise, load model from server
          session = await ort.InferenceSession.create(MODEL_URL);
          const modelBytes = await (await fetch(MODEL_URL)).arrayBuffer();
          await saveModelToDB(db, STORE_NAME, MODEL_KEY, modelBytes);
          console.log("Loaded model from server and saved to IndexedDB");
        }

        const inputNames = session.inputNames;
        console.log("Model Input Names:", inputNames);
        setModel(session);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  useEffect(() => {
    const detectPhoto = async () => {
      if (!model || !webcamRef.current) return;

      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const img = new Image();
      img.onload = async () => {
        try {
          const inputTensor = preprocessImage(img);
      
          if (!inputTensor) {
            console.error("Input tensor is null or undefined.");
            return;
          }
      
          const results = await model.run({ keras_tensor: inputTensor });
      
          console.log("Model inference results:", results);
          
          const outputTensor = results['output_0'];
          if (!outputTensor) {
            console.error("Output tensor is undefined.");
            return;
          }
      
          const output = outputTensor.data[0];
      
          if (output > 0.5) {
            setIsPhoto(true);
            handleMonitoringFailure();
          } else {
            setIsPhoto(false);
          }
        } catch (error) {
          console.error("Error during photo detection:", error);
        }
      };
      
      
      img.src = imageSrc;
    };

    const intervalId = setInterval(detectPhoto, 1000);
    return () => clearInterval(intervalId);
  }, [model]);

  const preprocessImage = (image) => {
    try {
      if (!image || !image.width || !image.height) {
        throw new Error("Invalid image dimensions.");
      }
  
      const cropCanvas = document.createElement('canvas');
      const cropCtx = cropCanvas.getContext('2d');
      const resizeCanvas = document.createElement('canvas');
      const resizeCtx = resizeCanvas.getContext('2d');
      const outputSize = 160;
      
      resizeCanvas.width = outputSize;
      resizeCanvas.height = outputSize;
      const cropSize = Math.min(image.width, image.height);
      const cropX = (image.width - cropSize) / 2;
      const cropY = 0;
  
      cropCanvas.width = cropSize;
      cropCanvas.height = cropSize;
      cropCtx.drawImage(image, cropX, cropY, cropSize, cropSize, 0, 0, cropSize, cropSize);
      resizeCtx.drawImage(cropCanvas, 0, 0, cropSize, cropSize, 0, 0, outputSize, outputSize);
  
      const imgData = resizeCtx.getImageData(0, 0, outputSize, outputSize);
      const data = new Float32Array(outputSize * outputSize * 3);
  
      for (let y = 0; y < outputSize; y++) {
        for (let x = 0; x < outputSize; x++) {
          const idx = (y * outputSize + x) * 4;
          const r = imgData.data[idx] / 255.0;
          const g = imgData.data[idx + 1] / 255.0;
          const b = imgData.data[idx + 2] / 255.0;
          
          data[(y * outputSize + x) * 3] = r; // R channel
          data[(y * outputSize + x) * 3 + 1] = g; // G channel
          data[(y * outputSize + x) * 3 + 2] = b; // B channel
        }
      }
  
      console.log("Data successfully formatted for tensor.");
      console.log("Tensor shape:", [1, outputSize, outputSize, 3]);
  
      return new ort.Tensor('float32', data, [1, outputSize, outputSize, 3]);
    } catch (error) {
      console.error("Error preprocessing image:", error);
      return null;
    }
  };
  
  

  const handleMonitoringFailure = () => {
    console.log("Background monitoring failed.");

    alert("Background monitoring failed. Please ensure you are in front of the camera and try again.");

    window.location.href = "http://localhost:3000/"; // Redirect to the face authentication page
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          // opacity: 0, // Make it invisible
          pointerEvents: 'none' // Prevent it from blocking interactions
        }}  
      />
      {isPhoto && <p style={{ color: 'red' }}>Photo detected - please use a live person</p>}
    </div>
  );
};

export default PhotoOnPhoto;
