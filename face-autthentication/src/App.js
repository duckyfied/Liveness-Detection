import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AadhaarInput from "./AadhaarInput";
import FaceAuthentication from "./FaceAuthentication";
import OptionsPage from "./OptionsPage";
import GazeMouse from "./GazeMouse";
import LeftRight from "./LeftRight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AadhaarInput />} />
        <Route path="/face-authentication" element={<FaceAuthentication />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/gaze-mouse" element={<GazeMouse />} />
        <Route path="/left-right" element={<LeftRight />} />
      </Routes>
    </Router>
  );
}

export default App;
