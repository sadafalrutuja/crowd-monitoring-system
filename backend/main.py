from fastapi import FastAPI

app = FastAPI(title="Crowd Monitoring System")


@app.get("/")
def home():
    return {
        "message": "Crowd Monitoring System Backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }