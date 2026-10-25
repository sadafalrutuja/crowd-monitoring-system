from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import time

from camera_service import (
    start_camera,
    stop_camera,
    get_crowd_data,
    get_camera_frame
)

app = FastAPI(
    title="AI Crowd Monitoring System",
    description="AI-based people detection and crowd monitoring",
    version="1.0.0"
)

# Allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


# =====================================
# HOME
# =====================================

@app.get("/")
def home():
    return {
        "message": "AI Crowd Monitoring System",
        "status": "running"
    }


# =====================================
# START CAMERA
# =====================================

@app.post("/api/camera/start")
def start_camera_endpoint():
    return start_camera()


# =====================================
# STOP CAMERA
# =====================================

@app.post("/api/camera/stop")
def stop_camera_endpoint():
    return stop_camera()


# =====================================
# CROWD INFORMATION
# =====================================

@app.get("/api/crowd")
def crowd_endpoint():
    return get_crowd_data()


# =====================================
# CAMERA STATUS
# =====================================

@app.get("/api/camera/status")
def camera_status_endpoint():
    data = get_crowd_data()

    return {
        "camera_status": data["camera_status"],
        "error": data["error"]
    }


# =====================================
# LIVE CAMERA STREAM
# =====================================

def generate_camera_stream():
    while True:
        frame = get_camera_frame()

        if frame is None:
            time.sleep(0.1)
            continue

        success, buffer = cv2.imencode(".jpg", frame)

        if not success:
            time.sleep(0.05)
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes()
            + b"\r\n"
        )

        time.sleep(0.03)


@app.get("/api/camera/stream")
def camera_stream_endpoint():
    return StreamingResponse(
        generate_camera_stream(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )