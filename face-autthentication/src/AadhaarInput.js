import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AadhaarInput.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { translations } from './translations';
import logo1 from './logo1.png';
import logo2 from './logo2.svg';
import footer_icon from './footer_icon.png';

function AadhaarInput() {
  const [aadhar, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user", { aadhar });
      if (response.data && response.data.data) {
        navigate("/face-authentication", { state: { userData: response.data.data } });
      } else {
        window.alert("The entered Aadhar number is invalid. Kindly re-enter your Aadhar number");
      }
    } catch (err) {
      setError(translations.errorMessage[language]);
    }
  };

  const handleFaqToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {/* Header */}
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

      {/* Main content */}
      <div className="content">
        <div className="main-container">
          <h1>{translations.title[language]}</h1>
          <div className="info-container">
            <div className="instructions">
              <h2>{translations.instructions[language]}</h2>

              <p><strong>1. {translations.enterAadhaar[language]}</strong></p>
              <p><strong>2. {translations.submitYourAadhaar[language]}</strong></p>
              <p><strong>3. {translations.waitVerification[language]}</strong></p>
            </div>

            <div className="aadhaar-form-container">
              <form onSubmit={handleSubmit} className="aadhaar-form">
                <input
                  type="text"
                  value={aadhar}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  placeholder={translations.enterAadhaar[language]}
                />
                <button type="submit">{translations.submit[language]}</button>
                {error && (
                  <p>
                    <i className="fa fa-exclamation-triangle" style={{ fontSize: '20px', color: 'red', marginRight: '8px' }}></i>
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default AadhaarInput;
