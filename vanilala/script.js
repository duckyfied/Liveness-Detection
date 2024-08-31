import {
  FaceDetector,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const demosSection = document.getElementById("demos");

let faceDetector;
let runningMode = "IMAGE";

// Initialize the face detector
const initializefaceDetector = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );
  faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `blaze_face_short_range.tflite`,
      delegate: "GPU"
    },
    runningMode: runningMode
  });
  demosSection.classList.remove("invisible");
};
initializefaceDetector();

// Video Feed

let video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
let enableWebcamButton;

const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

var children = [];

if (hasGetUserMedia()) {
  enableWebcamButton = document.getElementById("webcamButton");
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}

async function enableCam(event) {
  if (!faceDetector) {
    alert("Face Detector is still loading. Please try again..");
    return;
  }

  enableWebcamButton.classList.add("removed");

  const constraints = {
    video: true
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
      video.addEventListener("loadeddata", predictWebcam);
    })
    .catch(err => {
      console.error(err);
    });
}

let lastVideoTime = -1;
async function predictWebcam() {
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO";
    await faceDetector.setOptions({ runningMode: "VIDEO" });
  }
  let startTimeMs = performance.now();

  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const detections = (await faceDetector.detectForVideo(video, startTimeMs)).detections;
    displayVideoDetections(detections);
  }

  window.requestAnimationFrame(predictWebcam);
}

function displayVideoDetections(detections) {
  for (let child of children) {
    liveView.removeChild(child);
  }
  children.splice(0);

  // Find the face with the highest confidence score
  if (detections.length === 0) return;

  const bestDetection = detections.reduce((prev, curr) => {
    return (prev.categories[0].score > curr.categories[0].score) ? prev : curr;
  });

  const p = document.createElement("p");
  p.innerText =
    "Confidence: " +
    Math.round(parseFloat(bestDetection.categories[0].score) * 100) +
    "% .";
  p.style =
    "left: " +
    (video.offsetWidth - bestDetection.boundingBox.width - bestDetection.boundingBox.originX) +
    "px;" +
    "top: " +
    (bestDetection.boundingBox.originY - 30) +
    "px; " +
    "width: " +
    (bestDetection.boundingBox.width - 10) +
    "px;";

  const highlighter = document.createElement("div");
  highlighter.setAttribute("class", "highlighter");
  highlighter.style =
    "left: " +
    (video.offsetWidth - bestDetection.boundingBox.width - bestDetection.boundingBox.originX) +
    "px;" +
    "top: " +
    bestDetection.boundingBox.originY +
    "px;" +
    "width: " +
    (bestDetection.boundingBox.width - 10) +
    "px;" +
    "height: " +
    bestDetection.boundingBox.height +
    "px;";

  liveView.appendChild(highlighter);
  liveView.appendChild(p);

  children.push(highlighter);
  children.push(p);

  const keypoints = bestDetection.keypoints;
  keypoints.forEach((keypoint, index) => {
    const keypointEl = document.createElement("span");
    keypointEl.className = "key-point";
    keypointEl.style.top = `${keypoint.y * video.offsetHeight - 3}px`;
    keypointEl.style.left = `${video.offsetWidth - keypoint.x * video.offsetWidth - 3}px`;
    keypointEl.innerText = index + 1;
    liveView.appendChild(keypointEl);
    children.push(keypointEl);
  });

  // New Instruction: Distance Calculation between Keypoints 3 and 5, and 3 and 6
  const calculateDistance = (p1, p2) => {
    let x = p2.x - p1.x;
    if (x < 0) {
      x = 0;
    }
    return x;
  };

  let keypoint3 = keypoints[2];
  let keypoint5 = keypoints[4];
  let keypoint6 = keypoints[5];

  if (keypoint3 && keypoint5 && keypoint6) {
    let distance3to5 = calculateDistance(keypoint5, keypoint3);
    let distance3to6 = calculateDistance(keypoint3, keypoint6);

    const instructionEl = document.createElement("p");
    instructionEl.className = "instruction";
    if (distance3to5 - distance3to6 >= 0.13) {
      instructionEl.innerText = "LEFT";
    } else if (distance3to6 - distance3to5 >= 0.13) {
      instructionEl.innerText = "RIGHT";
    } else {
      instructionEl.innerText = "STRAIGHT";
    }
    instructionEl.style.position = "absolute";
    instructionEl.style.left = `${video.offsetWidth - bestDetection.boundingBox.width - bestDetection.boundingBox.originX}px`;
    instructionEl.style.top = `${bestDetection.boundingBox.originY + bestDetection.boundingBox.height + 50}px`;
    liveView.appendChild(instructionEl);
    children.push(instructionEl);

    const distanceEl3to5 = document.createElement("p");
    distanceEl3to5.className = "distance";
    distanceEl3to5.innerText = `Distance between Point 3 and Point 5: ${distance3to5.toFixed(2)}`;
    distanceEl3to5.style.position = "absolute";
    distanceEl3to5.style.left = `${video.offsetWidth - bestDetection.boundingBox.width - bestDetection.boundingBox.originX}px`;
    distanceEl3to5.style.top = `${bestDetection.boundingBox.originY + bestDetection.boundingBox.height + 10}px`;
    liveView.appendChild(distanceEl3to5);
    children.push(distanceEl3to5);

    const distanceEl3to6 = document.createElement("p");
    distanceEl3to6.className = "distance";
    distanceEl3to6.innerText = `Distance between Point 3 and Point 6: ${distance3to6.toFixed(2)}`;
    distanceEl3to6.style.position = "absolute";
    distanceEl3to6.style.left = `${video.offsetWidth - bestDetection.boundingBox.width - bestDetection.boundingBox.originX}px`;
    distanceEl3to6.style.top = `${bestDetection.boundingBox.originY + bestDetection.boundingBox.height + 30}px`;
    liveView.appendChild(distanceEl3to6);
    children.push(distanceEl3to6);
  }
}
