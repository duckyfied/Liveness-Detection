import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AadhaarInput from "./AadhaarInput";
import FaceAuthentication from "./FaceAuthentication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AadhaarInput />} />
        <Route path="/face-authentication" element={<FaceAuthentication />} />
      </Routes>
    </Router>
  );
}

export default App;
