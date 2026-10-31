import time
import cv2

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

import camera_service


# ---------------- FASTAPI APP ----------------

app = FastAPI(
    title="AI Crowd Monitoring System",
    version="0.2.1"
)


# ---------------- CORS SETTINGS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ---------------- HOME ROUTE ----------------

@app.get("/")
def home():
    return {
        "message": "AI Crowd Monitoring System",
        "status": "running",
        "zone": "SAMADHI MANDIR"
    }


# ---------------- START CAMERA ----------------

@app.post("/api/camera/start")
def start_detection():
    return camera_service.start_camera()


# ---------------- STOP CAMERA ----------------

@app.post("/api/camera/stop")
def stop_detection():
    return camera_service.stop_camera()


# ---------------- CAMERA STATUS ----------------

@app.get("/api/camera/status")
def camera_status():
    return camera_service.get_crowd_data()


# ---------------- CROWD DATA ----------------

@app.get("/api/crowd")
def crowd_data():
    return camera_service.get_crowd_data()


# ---------------- LIVE CAMERA FRAMES ----------------

def generate_frames():

    while True:

        frame = camera_service.get_camera_frame()

        if frame is None:

            status = camera_service.get_crowd_data()["status"]

            if status in ("STOPPED", "CAMERA_ERROR", "ERROR"):
                break

            time.sleep(0.1)
            continue

        success, buffer = cv2.imencode(".jpg", frame)

        if not success:
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes()
            + b"\r\n"
        )


# ---------------- CAMERA STREAM ROUTE ----------------

@app.get("/api/camera/stream")
def camera_stream():

    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )