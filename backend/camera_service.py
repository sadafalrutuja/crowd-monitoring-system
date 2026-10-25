import cv2
import threading
import time
from pathlib import Path
from ultralytics import YOLO


# ==================================================
# 1. CONFIGURATION
# ==================================================

MODEL_PATH = (
    Path(__file__).resolve().parent.parent / "yolo26n.pt"
)

CAMERA_INDEX = 0

CONFIDENCE = 0.25
IOU_THRESHOLD = 0.50
IMAGE_SIZE = 960

FRAME_WIDTH = 1280
FRAME_HEIGHT = 720

WINDOW_NAME = "AI Crowd Monitoring System"


# ==================================================
# 2. SHARED VARIABLES
# ==================================================

camera = None
model = None
camera_thread = None

stop_event = threading.Event()
lock = threading.Lock()

latest_frame = None

crowd_data = {
    "camera_status": "STOPPED",
    "people_count": 0,
    "crowd_level": "LOW",
    "tracked_people": [],
    "last_updated": None,
    "error": None
}


# ==================================================
# 3. CROWD LEVEL
# ==================================================

def get_crowd_level(count):

    if count <= 500:
        return "LOW"

    elif count <= 1000:
        return "MEDIUM"

    else:
        return "HIGH"


# ==================================================
# 4. LOAD YOLO MODEL
# ==================================================

def load_model():

    global model

    if model is not None:
        return

    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"YOLO model not found: {MODEL_PATH}"
        )

    print("Loading YOLO model...")

    model = YOLO(str(MODEL_PATH))

    print("YOLO model loaded successfully!")


# ==================================================
# 5. OPEN CAMERA
# ==================================================

def open_camera():

    cam = cv2.VideoCapture(
        CAMERA_INDEX,
        cv2.CAP_DSHOW
    )

    if not cam.isOpened():

        cam.release()

        cam = cv2.VideoCapture(CAMERA_INDEX)

    if not cam.isOpened():

        cam.release()

        raise RuntimeError(
            "Cannot open camera. Check camera permissions."
        )

    cam.set(
        cv2.CAP_PROP_FRAME_WIDTH,
        FRAME_WIDTH
    )

    cam.set(
        cv2.CAP_PROP_FRAME_HEIGHT,
        FRAME_HEIGHT
    )

    return cam


# ==================================================
# 6. CAMERA DETECTION WORKER
# ==================================================

def camera_worker():

    global camera
    global latest_frame

    try:

        load_model()

        camera = open_camera()

        with lock:

            crowd_data["camera_status"] = "RUNNING"
            crowd_data["error"] = None

        print("Camera started successfully!")

        while not stop_event.is_set():

            success, frame = camera.read()

            if not success:

                with lock:
                    crowd_data["error"] = (
                        "Cannot read camera frame"
                    )

                time.sleep(0.1)

                continue

            # ------------------------------------------
            # YOLO DETECTION AND BYTETRACK
            # ------------------------------------------

            results = model.track(
                source=frame,
                persist=True,
                tracker="bytetrack.yaml",
                classes=[0],
                conf=CONFIDENCE,
                iou=IOU_THRESHOLD,
                imgsz=IMAGE_SIZE,
                verbose=False
            )

            person_count = 0
            tracked_people = []

            # ------------------------------------------
            # PROCESS DETECTIONS
            # ------------------------------------------

            for result in results:

                if result.boxes is None:
                    continue

                for box in result.boxes:

                    person_count += 1

                    coordinates = (
                        box.xyxy[0]
                        .cpu()
                        .tolist()
                    )

                    x1, y1, x2, y2 = map(
                        int,
                        coordinates
                    )

                    track_id = None

                    if box.id is not None:

                        track_id = int(
                            box.id[0].item()
                        )

                    confidence = float(
                        box.conf[0].item()
                    )

                    # Draw bounding box
                    cv2.rectangle(
                        frame,
                        (x1, y1),
                        (x2, y2),
                        (0, 255, 0),
                        2
                    )

                    # Display ID and confidence
                    if track_id is not None:

                        label = (
                            f"ID: {track_id} "
                            f"Conf: {confidence:.2f}"
                        )

                        tracked_people.append({
                            "track_id": track_id,
                            "confidence": round(
                                confidence, 3
                            ),
                            "box": [
                                x1, y1, x2, y2
                            ]
                        })

                    else:

                        label = (
                            f"Person {confidence:.2f}"
                        )

                        tracked_people.append({
                            "track_id": None,
                            "confidence": round(
                                confidence, 3
                            ),
                            "box": [
                                x1, y1, x2, y2
                            ]
                        })

                    cv2.putText(
                        frame,
                        label,
                        (x1, max(y1 - 10, 20)),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.55,
                        (0, 255, 0),
                        2
                    )

            # ------------------------------------------
            # CALCULATE CROWD LEVEL
            # ------------------------------------------

            crowd_level = get_crowd_level(
                person_count
            )

            # ------------------------------------------
            # DISPLAY COUNT
            # ------------------------------------------

            cv2.putText(
                frame,
                f"People Detected: {person_count}",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (255, 255, 255),
                2
            )

            cv2.putText(
                frame,
                f"Crowd Level: {crowd_level}",
                (20, 80),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (0, 255, 255),
                2
            )

            # ------------------------------------------
            # UPDATE SHARED DATA
            # ------------------------------------------

            with lock:

                crowd_data["people_count"] = (
                    person_count
                )

                crowd_data["crowd_level"] = (
                    crowd_level
                )

                crowd_data["tracked_people"] = (
                    tracked_people
                )

                crowd_data["last_updated"] = (
                    time.strftime(
                        "%Y-%m-%d %H:%M:%S"
                    )
                )

                crowd_data["error"] = None

                latest_frame = frame.copy()

            # ------------------------------------------
            # SHOW CAMERA WINDOW
            # ------------------------------------------

            cv2.imshow(
                WINDOW_NAME,
                frame
            )

            # Press Q to stop camera
            if cv2.waitKey(1) & 0xFF == ord("q"):

                stop_event.set()

                break

    except Exception as error:

        with lock:

            crowd_data["error"] = str(error)
            crowd_data["camera_status"] = "ERROR"

        print("Camera error:", error)

    finally:

        if camera is not None:

            camera.release()

            camera = None

        cv2.destroyAllWindows()

        with lock:

            if crowd_data["camera_status"] != "ERROR":

                crowd_data["camera_status"] = "STOPPED"

        print("Camera stopped.")


# ==================================================
# 7. START CAMERA
# ==================================================

def start_camera():

    global camera_thread

    if (
        camera_thread is not None
        and camera_thread.is_alive()
    ):

        return {
            "message": "Camera is already running",
            "camera_status": "RUNNING"
        }

    stop_event.clear()

    with lock:

        crowd_data["camera_status"] = "STARTING"
        crowd_data["error"] = None

    camera_thread = threading.Thread(
        target=camera_worker,
        daemon=True
    )

    camera_thread.start()

    return {
        "message": "Camera starting",
        "camera_status": "STARTING"
    }


# ==================================================
# 8. STOP CAMERA
# ==================================================

def stop_camera():

    global camera_thread

    stop_event.set()

    if (
        camera_thread is not None
        and camera_thread.is_alive()
    ):

        camera_thread.join(timeout=5)

    with lock:

        return {
            "message": "Camera stop requested",
            "camera_status": (
                crowd_data["camera_status"]
            )
        }


# ==================================================
# 9. GET CROWD DATA
# ==================================================

def get_crowd_data():

    with lock:

        return {
            "camera_status": (
                crowd_data["camera_status"]
            ),

            "people_count": (
                crowd_data["people_count"]
            ),

            "crowd_level": (
                crowd_data["crowd_level"]
            ),

            "tracked_people": [
                person.copy()
                for person in crowd_data[
                    "tracked_people"
                ]
            ],

            "last_updated": (
                crowd_data["last_updated"]
            ),

            "error": (
                crowd_data["error"]
            )
        }


# ==================================================
# 10. GET LATEST CAMERA FRAME
# ==================================================

def get_camera_frame():

    with lock:

        if latest_frame is None:
            return None

        return latest_frame.copy()