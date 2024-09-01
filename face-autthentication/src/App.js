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

  return (
    <Router>      
      <ConditionalBackgroundMonitor />
      <ConditionalPhotoOnPhoto />
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
