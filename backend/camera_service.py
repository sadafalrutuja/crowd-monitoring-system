import cv2
import threading
from pathlib import Path
from ultralytics import YOLO


# ---------------- CONFIGURATION ----------------

ZONE_NAME = "SAMADHI MANDIR"

MODEL_PATH = Path(__file__).resolve().parent / "yolo26n.pt"

# Camera 1 is tried first because it worked in your camera test.
CAMERA_INDEXES = [1, 0]

CONFIDENCE = 0.4


# ---------------- GLOBAL VARIABLES ----------------

camera = None
model = None

running = False

latest_frame = None
camera_thread = None

lock = threading.Lock()


crowd_data = {
    "zone": ZONE_NAME,
    "people_count": 0,
    "crowd_level": "LOW",
    "status": "STOPPED"
}


# ---------------- CROWD LEVEL ----------------

def get_crowd_level(count):

    if count <= 500:
        return "LOW"

    elif count <= 1000:
        return "MEDIUM"

    else:
        return "HIGH"


# ---------------- LOAD YOLO MODEL ----------------

def load_model():

    global model

    if model is None:

        if not MODEL_PATH.exists():

            raise FileNotFoundError(
                f"YOLO model not found: {MODEL_PATH}"
            )

        model = YOLO(str(MODEL_PATH))

    return model


# ---------------- CAMERA WORKER ----------------

def camera_worker():

    global running, camera, latest_frame, crowd_data

    try:

        detector = load_model()

        while running:

            current_camera = camera

            if current_camera is None:
                break

            success, frame = current_camera.read()

            if not success:

                with lock:

                    crowd_data["status"] = "CAMERA_ERROR"

                    crowd_data["error"] = (
                        "Camera opened but could not read a frame."
                    )

                break

            # YOLO + BYTETRACK DETECTION

            results = detector.track(

                frame,

                persist=True,

                tracker="bytetrack.yaml",

                classes=[0],

                conf=CONFIDENCE,

                iou=0.45,

                verbose=False
            )

            # COUNT CURRENTLY DETECTED PEOPLE

            people_count = 0

            if results and results[0].boxes is not None:

                people_count = len(results[0].boxes)

            # CROWD LEVEL

            crowd_level = get_crowd_level(people_count)

            # DRAW DETECTION BOXES

            annotated_frame = results[0].plot()

            # DISPLAY ZONE NAME

            cv2.putText(

                annotated_frame,

                f"Zone: {ZONE_NAME}",

                (20, 40),

                cv2.FONT_HERSHEY_SIMPLEX,

                1,

                (0, 255, 0),

                2
            )

            # DISPLAY PEOPLE COUNT

            cv2.putText(

                annotated_frame,

                f"People: {people_count} | Crowd: {crowd_level}",

                (20, 80),

                cv2.FONT_HERSHEY_SIMPLEX,

                0.8,

                (0, 255, 255),

                2
            )

            # UPDATE LIVE DATA

            with lock:

                latest_frame = annotated_frame

                crowd_data.update({

                    "zone": ZONE_NAME,

                    "people_count": people_count,

                    "crowd_level": crowd_level,

                    "status": "RUNNING"

                })

    except Exception as error:

        with lock:

            crowd_data["status"] = "ERROR"

            crowd_data["error"] = str(error)

    finally:

        running = False

        if camera is not None:

            camera.release()

            camera = None

        with lock:

            if crowd_data["status"] not in (

                "CAMERA_ERROR",

                "ERROR"

            ):

                crowd_data["status"] = "STOPPED"


# ---------------- START CAMERA ----------------

def start_camera():

    global camera, running, camera_thread, latest_frame

    if running:

        return get_crowd_data()

    if camera_thread is not None and camera_thread.is_alive():

        return {

            **get_crowd_data(),

            "message": "Camera worker is still shutting down. Try again shortly."

        }

    # RELEASE OLD CAMERA

    if camera is not None:

        camera.release()

        camera = None

    # TRY AVAILABLE CAMERA INDEXES

    new_camera = None

    for index in CAMERA_INDEXES:

        test_camera = cv2.VideoCapture(
            index,
            cv2.CAP_DSHOW
        )

        if not test_camera.isOpened():

            test_camera.release()

            test_camera = cv2.VideoCapture(index)

        if test_camera.isOpened():

            success, test_frame = test_camera.read()

            if success and test_frame is not None:

                new_camera = test_camera

                break

        test_camera.release()

    # CAMERA ERROR

    if new_camera is None:

        with lock:

            crowd_data.update({

                "zone": ZONE_NAME,

                "people_count": 0,

                "crowd_level": "LOW",

                "status": "CAMERA_ERROR",

                "error": "Unable to open a working camera. Check camera permissions."

            })

        return get_crowd_data()

    # CAMERA SETTINGS

    new_camera.set(
        cv2.CAP_PROP_FRAME_WIDTH,
        1280
    )

    new_camera.set(
        cv2.CAP_PROP_FRAME_HEIGHT,
        720
    )

    camera = new_camera

    # RESET LIVE DATA

    with lock:

        latest_frame = None

        crowd_data.clear()

        crowd_data.update({

            "zone": ZONE_NAME,

            "people_count": 0,

            "crowd_level": "LOW",

            "status": "STARTING"

        })

    # START DETECTION THREAD

    running = True

    camera_thread = threading.Thread(

        target=camera_worker,

        daemon=True

    )

    camera_thread.start()

    return get_crowd_data()


# ---------------- STOP CAMERA ----------------

def stop_camera():

    global running

    running = False

    with lock:

        if crowd_data["status"] not in (

            "CAMERA_ERROR",

            "ERROR"

        ):

            crowd_data["status"] = "STOPPED"

    return get_crowd_data()


# ---------------- GET CROWD DATA ----------------

def get_crowd_data():

    with lock:

        return crowd_data.copy()


# ---------------- GET LIVE CAMERA FRAME ----------------

def get_camera_frame():

    with lock:

        if latest_frame is None:

            return None
        return latest_frame.copy()