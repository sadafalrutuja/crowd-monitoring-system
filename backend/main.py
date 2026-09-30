from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from camera_service import start_camera, get_crowd_data


app = FastAPI(
    title="Temple Crowd Monitoring API",
    description="AI-Based Smart Crowd Monitoring System",
    version="1.0"
)


# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Start camera when backend starts
@app.on_event("startup")
def startup_event():
    start_camera()


# Home API
@app.get("/")
def home():
    return {
        "message": "Temple Crowd Monitoring Backend is Running"
    }


# Crowd API
@app.get("/api/crowd")
def get_crowd():
    return get_crowd_data()