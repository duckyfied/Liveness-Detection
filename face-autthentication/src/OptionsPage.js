import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./options.css";
import { translations } from './translations';


function OptionsPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

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
      <div className="Options-container">
        <h4 className="ab">{translations.selectTest[language]}</h4>
        <button className="Option-button" onClick={handleGazeTest}>
          {translations.gazeTest[language]}
        </button>
        <button className="Option-button" onClick={handleLeftRightTest}>
          {translations.leftRightTest[language]}
        </button>
      </div>
      
    </div>

  );
}

export default OptionsPage;
