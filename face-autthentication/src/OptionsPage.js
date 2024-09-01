import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundMonitor from "./BackgroundMonitor";
import "./options.css";

function OptionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};
  const encoding = userData
    ? new Float32Array(JSON.parse(userData.encoding))
    : null;

  const handleGazeTest = () => {
    navigate("/gaze-mouse");
  };

  const handleLeftRightTest = () => {
    navigate("/left-right");
  };

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
        <h4 className="ab">Select a Test</h4>
        <button className="Option-button" onClick={handleGazeTest}>
          Gaze Test
        </button>
        <button className="Option-button" onClick={handleLeftRightTest}>
          Left Right Test
        </button>
        {encoding && (
          <BackgroundMonitor
            encoding={encoding}
            onFail={handleMonitoringFailure}
          />
        )}
      </div>
    </div>
  );
}

export default OptionsPage;
