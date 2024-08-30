import React, { useEffect, useState, useRef } from 'react';

function GazeMouse() {
  const [gazePosition, setGazePosition] = useState({ x: 0, y: 0 });
  const [points, setPoints] = useState([
    { x: 100, y: 100, checked: false, clicked: false },
    { x: 300, y: 100, checked: false, clicked: false },
    { x: 100, y: 300, checked: false, clicked: false },
    { x: 300, y: 300, checked: false, clicked: false },
  ]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const webgazer = window.webgazer;

    if (webgazer) {
      webgazer.setGazeListener((data) => {
        if (data) {
          setGazePosition({ x: data.x, y: data.y });
        }
      }).begin();
    }

    return () => {
      if (webgazer && typeof webgazer.clearGazeListener === 'function') {
        webgazer.clearGazeListener();
        //webgazer.close();
      }
    };
  }, []);

  const handleClick = (index) => {
    const point = points[index];
    const distance = Math.sqrt(
      Math.pow(point.x - gazePosition.x, 2) + Math.pow(point.y - gazePosition.y, 2)
    );

    if (distance < 120) { 
      const newPoints = [...points];
      newPoints[index].clicked = true;
      setPoints(newPoints);

      const checkedPoints = newPoints.filter(p => p.clicked).length;
      if (checkedPoints >= 2) {
        setLive(true);
      }
    }
  };

  return (
    <div className="GazeMouse" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      
      {points.map((point, index) => (
        <div
          key={index}
          className={`point ${point.clicked ? 'checked' : ''}`}
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            backgroundColor: point.clicked ? 'green' : 'orange',
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2, 
            cursor: 'pointer'
          }}
          onClick={() => handleClick(index)}
        ></div>
      ))}
      {live && (
        <div
          className="live-status"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 255, 0, 0.8)',
            padding: '10px 20px',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '18px',
            zIndex: 3, 
          }}
        >
          User is live!
        </div>
      )}
    </div>
  );
}

export default GazeMouse;
