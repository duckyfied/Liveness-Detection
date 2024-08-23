import cv2
import mediapipe as mp
import time

class FaceMeshDetector:
    def __init__(self, max_num_faces=1):

       # self.cap = cv2.VideoCapture("test_videos/test1.mp4")
        self.cap = cv2.VideoCapture(0)
        self.pTime = 0

        self.mpDraw = mp.solutions.drawing_utils
        self.mpFaceMesh = mp.solutions.face_mesh
        self.faceMesh = self.mpFaceMesh.FaceMesh(max_num_faces=max_num_faces)
        self.drawSpec = self.mpDraw.DrawingSpec(thickness=1, circle_radius=1, color=(0, 255, 0))

    def process_frame(self, img):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = self.faceMesh.process(imgRGB)
        if results.multi_face_landmarks:
            for faceLms in results.multi_face_landmarks:
                self.mpDraw.draw_landmarks(img,
                                           faceLms,
                                           self.mpFaceMesh.FACEMESH_CONTOURS,
                                           self.drawSpec,
                                           self.drawSpec)
        return img

    def display_fps(self, img):
        cTime = time.time()
        fps = 1 / (cTime - self.pTime)
        self.pTime = cTime
        cv2.putText(img, f'FPS: {int(fps)}', (20, 70), cv2.FONT_HERSHEY_PLAIN, 3, (0, 255, 0), 3)

    def run(self):
        while True:
            success, img = self.cap.read()
            if not success:
                print("Failed to capture image")
                break

            img = self.process_frame(img)
            self.display_fps(img)

            cv2.imshow("Image", img)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        self.cap.release()
        cv2.destroyAllWindows()
