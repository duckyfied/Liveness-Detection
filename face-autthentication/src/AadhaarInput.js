import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AadhaarInput.css";
import logo1 from './logo1.png';
import logo2 from './logo2.svg';
import footer_icon from './footer_icon.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { translations } from './translations'; 

function AadhaarInput() {
  const [aadhar, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [language, setLanguage] = useState("en"); 
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user", { aadhar });
      if (response.data) {
        navigate("/face-authentication", {
          state: { userData: response.data.data },
        });
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
      </div>

      <div className="content">
        <div className="main-container">
          <h1>{translations.title[language]}</h1>
          <div className="info-container">
            <div className="instructions">
              <h2>{translations.instructions[language]}</h2>
              <p><strong>1. {translations.enterAadhaar[language]}</strong></p>
              <ul>
                {translations.submitInstructions[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>2. {translations.submitYourAadhaar[language]}</strong></p>
              <ul>
                {translations.submitInstructions[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>3. {translations.allowCameraAccess[language]}</strong></p>
              <ul>
                {translations.cameraAccessInstructions[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>4. {translations.positionFace[language]}</strong></p>
              <ul>
                {translations.facePositionInstructions[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>5. {translations.followInstructions[language]}</strong></p>
              <ul>
                {translations.followInstructionsDetails[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>6. {translations.waitVerification[language]}</strong></p>
              <ul>
                {translations.waitVerificationDetails[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>7. {translations.receiveResult[language]}</strong></p>
              <ul>
                {translations.receiveResultDetails[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p><strong>8. {translations.endSession[language]}</strong></p>
              <ul>
                {translations.endSessionDetails[language].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
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
                <i className="fa fa-exclamation-triangle" style={{ fontSize: '20px', color: 'red', marginRight: '8 px' }}></i>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>

          <div className="faq-section">
            <h2>{translations.faqs[language]}</h2>
            {[
              { question: translations.faq1[language], answer: translations.faq1Answer[language] },
              { question: translations.faq2[language], answer: translations.faq2Answer[language] },
              { question: translations.faq3[language], answer: translations.faq3Answer[language] },
              { question: translations.whatToDoIfLivenessFails[language], answer: translations.livenessFailsDetails[language] },
              { question: translations.isDataSecure[language], answer: translations.dataSecureDetails[language] },
              { question: translations.useOnMobileDevice[language], answer: translations.mobileDeviceDetails[language] },
              { question: translations.noCameraOnDevice[language], answer: translations.noCameraDetails[language] },
              { question: translations.verificationTime[language], answer: translations.verificationTimeDetails[language] },
              { question: translations.ensureSuccessfulAuthentication[language], answer: translations.successfulAuthenticationDetails[language] },
              { question: translations.technicalIssues[language], answer: translations.technicalIssuesDetails[language] },
            ].map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question" onClick={() => handleFaqToggle(index)}>
                  {faq.question}
                  <span className={activeIndex === index ? "toggle-icon active" : "toggle-icon"}>+</span>
                </div>
                <div className={`expandable ${activeIndex === index ? "show" : ""}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="text-container">
          <p>Copyright © 2022 Unique Identification Authority of India All Rights Reserved</p>
          <p>JavaScript must be enabled to access this site.</p>
          <p>Supports: Firefox 37+ Chrome OS: 6.0+ Internet Explorer 9.0+ Safari 4.0+</p>
          <p>Last reviewed and updated on: August 29, 2024</p>
          <p>UIDAI website translation is done by Bhashini Machine Translation which may not be correct. This is done on an experimental basis and will be improved over time. Kindly ignore the errors if any.</p>
        </div>
        <img src={footer_icon} alt="footer_icon" />
      </footer>
    </div>
  );
}

export default AadhaarInput;
