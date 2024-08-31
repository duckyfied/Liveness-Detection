import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './GazeMouse.css';

function GazeMouse() {
  const [gazePosition, setGazePosition] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState([
    { x: "25%", y: "30%", checked: false, clicked: false },
    { x: "75%", y: "30%", checked: false, clicked: false },
    { x: "25%", y: "70%", checked: false, clicked: false },
    { x: "75%", y: "70%", checked: false, clicked: false },
  ]);
  const [live, setLive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const webgazer = window.webgazer;

    if (webgazer) {
      webgazer
        .setRegression("ridge")
        .setGazeListener((data) => {
          if (data) {
            setGazePosition({ x: data.x, y: data.y });
          }
        })
        .begin();

      webgazer.applyKalmanFilter(false);
      webgazer.setTracker("clmtrackr");
      webgazer.showFaceOverlay(false);
      webgazer.showFaceFeedbackBox(false);
    }

    const handlePopState = () => {
      window.location.href = "http://localhost:3000/options";
    };

    window.history.pushState(null, '');

    window.history.replaceState(null, '');

    window.addEventListener('popstate', handlePopState);

    return () => {
      if (webgazer) {
        webgazer.clearGazeListener();
        webgazer.pause();

        const videoElement = document.getElementById('webgazerVideoContainer');
        if (videoElement) {
          videoElement.remove();
        }
      }

      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleClick = (index) => {
    const pointElement = document.getElementById(`point-${index}`);
    const pointRect = pointElement.getBoundingClientRect();

    const distance = Math.sqrt(
      Math.pow(pointRect.left + pointRect.width / 2 - gazePosition.x, 2) +
        Math.pow(pointRect.top + pointRect.height / 2 - gazePosition.y, 2)
    );

    if (distance < 120) {
      const newPoints = [...points];
      newPoints[index].clicked = true;
      setPoints(newPoints);

      const checkedPoints = newPoints.filter((p) => p.clicked).length;
      if (checkedPoints >= 2) {
        setLive(true);

        const webgazer = window.webgazer;
        if (webgazer) {
          webgazer.clearGazeListener();
          webgazer.pause();
        }

        const videoElement = document.getElementById("webgazerVideoContainer");
        if (videoElement) {
          videoElement.remove();
        }

        window.history.replaceState(null, '');

        window.location.href = "https://uidai.gov.in/en/";
      }
    }
  };

  return (
    <div className="GazeMouse">
      <div id="webgazerVideoContainer" className="webgazer-container"></div>
      {points.map((point, index) => (
        <div
          key={index}
          id={`point-${index}`}
          className={`point ${point.clicked ? "checked" : ""}`}
          style={{
            left: point.x,
            top: point.y,
          }}
          onClick={() => handleClick(index)}
        ></div>
      ))}
      {live && (
        <div className="live-status">
          User is live!
        </div>
      )}
    </div>
  );
}

export default GazeMouse;
