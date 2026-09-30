from ultralytics import YOLO
import cv2
import threading
import time

# Load YOLO model
model = YOLO("yolo26n.pt")

# Open laptop webcam
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

# Crowd information shared with FastAPI
crowd_data = {
    "zone": "SAMADHI MANDIR",
    "people_count": 0,
    "crowd_level": "NO PEOPLE"
}

# Lock for safe data sharing
data_lock = threading.Lock()


def process_camera():
    global crowd_data

    while True:

        # Read webcam frame
        success, frame = cap.read()

        if not success:
            print("ERROR: Cannot read camera")
            time.sleep(1)
            continue

        # YOLO person detection + tracking
        results = model.track(
            source=frame,
            persist=True,
            tracker="bytetrack.yaml",
            conf=0.50,
            iou=0.45,
            classes=[0],
            verbose=False
        )

        result = results[0]

        # Count people
        people_count = 0

        if result.boxes is not None:
            people_count = len(result.boxes)

        # Determine crowd level
        if people_count == 0:
            crowd_level = "NO PEOPLE"

        elif people_count <= 500:
            crowd_level = "LOW"

        elif people_count <= 1000:
            crowd_level = "MEDIUM"

        else:
            crowd_level = "HIGH"

        # Update data for FastAPI
        with data_lock:
            crowd_data["people_count"] = people_count
            crowd_data["crowd_level"] = crowd_level

        # Display detection on camera
        annotated_frame = result.plot()

        cv2.putText(
            annotated_frame,
            f"PEOPLE: {people_count}",
            (30, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 0),
            3
        )

        cv2.putText(
            annotated_frame,
            f"CROWD: {crowd_level}",
            (30, 90),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 255),
            3
        )

        # Show live camera
        cv2.imshow(
            "Temple Crowd Monitoring - Live",
            annotated_frame
        )

        # Press Q to close camera
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


def start_camera():

    camera_thread = threading.Thread(
        target=process_camera,
        daemon=True
    )

    camera_thread.start()


def get_crowd_data():

    with data_lock:
        return crowd_data.copy()