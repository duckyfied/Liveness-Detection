import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AadhaarInput.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { translations } from './translations';

function AadhaarInput() {
  const [aadhar, setAadharNumber] = useState("");
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/user", { aadhar });
      if (response.data && response.data.data) {
        // Navigate to FaceAuthentication with state
        navigate("/face-authentication", {
          state: { userData: response.data.data },
        });
      } else {
        window.alert(
          "The entered Aadhar number is invalid. Kindly re-enter your Aadhar number"
        );
      }
    } catch (err) {
      setError(translations.errorMessage[language]);
    }
  };

  const handleFaqToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const [language, setLanguage] = useState("en");
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  return (
    <div>
      
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
                    <i className="fa fa-exclamation-triangle" style={{ fontSize: '20px', color: 'red', marginRight: '8 px' }}></i>
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default AadhaarInput;