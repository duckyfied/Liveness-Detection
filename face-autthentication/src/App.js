import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AadhaarInput from "./AadhaarInput";
import FaceAuthentication from "./FaceAuthentication";
import OptionsPage from "./OptionsPage";
import GazeMouse from "./GazeMouse";
import LeftRight from "./LeftRight";
import BackgroundMonitor from "./BackgroundMonitor";
import PhotoOnPhoto from "./PhotoOnPhoto";
import logo1 from './logo1.png';
import logo2 from './logo2.svg';
import footer_icon from './footer_icon.png';
import { translations } from './translations';
function App() {
  const [encoding, setEncoding] = useState(null);

  const handleEncoding = (newEncoding) => {
    setEncoding(newEncoding);
  };

  const handleMonitoringFailure = () => {
    console.log("Background monitoring failed.");

    // Notify the user
    alert("Background monitoring failed. Please make sure you are in front of the camera and try again.");

    // Optionally redirect to a different page or retry the authentication
    window.location.href = "/face-authentication"; // Redirect to the face authentication page
    // OR
    // setAuthenticationMessage("Background monitoring failed. Please try again."); // Show a message in the UI

    // Optionally log the failure (e.g., to an analytics service or server)
    // axios.post('/api/log', { error: "Background monitoring failed" });
  };

  // Component to conditionally render BackgroundMonitor based on the route
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

    return shouldRenderMonitor ? <PhotoOnPhoto/> : null;
  };
  const [language, setLanguage] = useState("en");
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  return (
    <Router>      
      <div className="header">
        <div className="logo-container">
          <img src={logo1} alt="logo1" />
          <img src={logo2} alt="logo2" />
        </div>
        <nav className="navbar">
          <ul className="navbar-menu">
            <li><a href="#">{translations.myAadhar[language]}</a></li>
            <li><a href="#">{translations.aboutUIDAI[language]}</a></li>
            <li><a href="#">{translations.ecosystem[language]}</a></li>
            <li><a href="#">{translations.mediaAndResources[language]}</a></li>
            <li><a href="#">{translations.contactAndResources[language]}</a></li>
          </ul>
          <div className="navbar-search">
            <input type="text" placeholder={translations.searchPlaceholder[language]} />
            <button type="button">{translations.goButton[language]}</button>
          </div>
        </nav>
      </div>
      <div className="language-toggle">
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('hi')}>हिन्दी</button>
        <button onClick={() => handleLanguageChange('tm')}>தமிழ்</button>
      </div>
      
      <footer className="footer">
        <div className="text-container">
          <p>Copyright © 2022 Unique Identification Authority of India All Rights Reserved</p>
          <p>JavaScript must be enabled to access this site.</p>
          <p>Supports: Firefox 37+ Chrome OS: 6.0+ Internet Explorer 9.0+ Safari 4.0+</p>
          <p>Last reviewed and updated on: August 29, 2024</p>
        </div>
        <img src={footer_icon} alt="footer_icon" />
      </footer>
<ConditionalBackgroundMonitor />
      <Routes>
        <Route
          path="/"
          element={<AadhaarInput setEncoding={handleEncoding} />}
        />
        <Route path="/face-authentication" element={<FaceAuthentication />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/gaze-mouse" element={<GazeMouse />} />
        <Route path="/left-right" element={<LeftRight />} />
      </Routes>
    </Router>
  );
}

export default App;