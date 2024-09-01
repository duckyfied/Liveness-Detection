import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function OptionsPage() {
  const navigate = useNavigate();

  const handleGazeTest = () => {
    navigate("/gaze-mouse");
  };

  const handleLeftRightTest = () => {
    navigate("/left-right");
  };

  return (
    <div className="App">
      <h1>Select a Test</h1>
      <button className="Option-button" onClick={handleGazeTest}>
        Gaze Test
      </button>
      <button className="Option-button" onClick={handleLeftRightTest}>
        Left Right Test
      </button>
    </div>
  );
}

export default OptionsPage;
