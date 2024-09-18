import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./options.css";
import { translations } from './translations';
import logo1 from './logo1.png';
import logo2 from './logo2.svg';
import footer_icon from './footer_icon.png';

function OptionsPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleGazeTest = () => {
    navigate("/gaze-mouse");
  };

  const handleLeftRightTest = () => {
    navigate("/left-right");
  };
  const location = useLocation();
  const { userData } = location.state || {};
  
  const encoding = userData
    ? new Float32Array(JSON.parse(userData.encoding))
    : null;

  const handleMonitoringFailure = () => {
    console.log("Background monitoring failed.");

    // Notify the user
    alert(
      "Background monitoring failed. Please make sure you are in front of the camera and try again."
    );

    // Optionally redirect to a different page or retry the authentication
    window.location.href = "/face-authentication"; // Redirect to the face authentication page
    // OR
    // setAuthenticationMessage("Background monitoring failed. Please try again."); // Show a message in the UI

    // Optionally log the failure (e.g., to an analytics service or server)
    // axios.post('/api/log', { error: "Background monitoring failed" });
    
  };

  return (
    <div className="App">
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

      {/* Translation toggle */}
      <div className="language-toggle">
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('hi')}>हिन्दी</button>
        <button onClick={() => handleLanguageChange('tm')}>தமிழ்</button>
      </div>

      <div className="Options-container">
        <h4 className="ab">{translations.selectTest[language]}</h4>
        <button className="Option-button" onClick={handleGazeTest}>
          {translations.gazeTest[language]}
        </button>
        <button className="Option-button" onClick={handleLeftRightTest}>
          {translations.leftRightTest[language]}
        </button>
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
    </div>

  );
}

export default OptionsPage;
