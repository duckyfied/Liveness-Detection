import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AadhaarInput from "./AadhaarInput";
import FaceAuthentication from "./FaceAuthentication";
import OptionsPage from "./OptionsPage";
import GazeMouse from "./GazeMouse";
import LeftRight from "./LeftRight";
import BackgroundMonitor from "./BackgroundMonitor";
import PhotoOnPhoto from "./PhotoOnPhoto";

function App() {
  const [encoding, setEncoding] = useState(null);

  const handleEncoding = (newEncoding) => {
    setEncoding(newEncoding);
  };

  const handleMonitoringFailure = () => {
    console.log("Background monitoring failed.");
    alert("Background monitoring failed. Please make sure you are in front of the camera and try again.");
    window.location.href = "/face-authentication";
  };

  const ConditionalBackgroundMonitor = () => {
    const location = useLocation();
    const shouldRenderMonitor = [
      "/face-authentication",
      "/options",
      "/gaze-mouse",
      "/left-right"
    ].includes(location.pathname);

    return shouldRenderMonitor ? <BackgroundMonitor encoding={encoding} onFail={handleMonitoringFailure} /> : null;
  };

  const ConditionalPhotoOnPhoto = () => {
    const location = useLocation();
    const shouldRenderMonitor = [
      "/face-authentication",
      "/options",
      "/gaze-mouse",
      "/left-right"
    ].includes(location.pathname);

    return shouldRenderMonitor ? <PhotoOnPhoto /> : null;
  };

  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AadhaarInput setEncoding={handleEncoding} />} />
        <Route path="/face-authentication" element={<FaceAuthentication />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/gaze-mouse" element={<GazeMouse />} />
        <Route path="/left-right" element={<LeftRight />} />
      </Routes>
      
      <ConditionalBackgroundMonitor />
      <ConditionalPhotoOnPhoto />
    </Router>
  );
}

export default App;
