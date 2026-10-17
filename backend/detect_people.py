import cv2
from ultralytics import YOLO
from pathlib import Path

# ==========================================
# 1. CONFIGURATION
# ==========================================

# YOLO model is stored in the main project folder
MODEL_PATH = Path(__file__).resolve().parent.parent / "yolo26n.pt"

CAMERA_INDEX = 0
CONFIDENCE = 0.35

print("=" * 45)
print("       AI CROWD MONITORING SYSTEM")
print("=" * 45)

# ==========================================
# 2. LOAD YOLO MODEL
# ==========================================

if not MODEL_PATH.exists():
    print(f"ERROR: Model not found at: {MODEL_PATH}")
    raise SystemExit(1)

print("Loading YOLO model...")

model = YOLO(str(MODEL_PATH))

print("YOLO model loaded successfully!")

# ==========================================
# 3. OPEN CAMERA
# ==========================================

camera = cv2.VideoCapture(CAMERA_INDEX, cv2.CAP_DSHOW)

if not camera.isOpened():
    camera.release()
    camera = cv2.VideoCapture(CAMERA_INDEX)

if not camera.isOpened():
    print("ERROR: Cannot open camera.")
    raise SystemExit(1)

# Set camera resolution
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

print("Camera opened successfully!")
print("Press Q to stop detection.")

# ==========================================
# 4. CROWD LEVEL FUNCTION
# ==========================================

def get_crowd_level(count):
    if count <= 500:
        return "LOW"
    elif count <= 1000:
        return "MEDIUM"
    else:
        return "HIGH"


# ==========================================
# 5. PEOPLE DETECTION AND TRACKING
# ==========================================

try:
    while True:

        # Read camera frame
        success, frame = camera.read()

        if not success:
            print("ERROR: Cannot read camera frame.")
            break

        # Detect and track people
        results = model.track(
            source=frame,
            persist=True,
            tracker="bytetrack.yaml",
            classes=[0],       # Class 0 = person
            conf=CONFIDENCE,
            iou=0.45,
            verbose=False
        )

        person_count = 0

        # Process detection results
        for result in results:

            if result.boxes is None:
                continue

            for box in result.boxes:

                # Count detected people in the current frame
                person_count += 1

                # Get bounding box coordinates
                x1, y1, x2, y2 = map(
                    int,
                    box.xyxy[0].tolist()
                )

                # Get tracking ID
                track_id = None

                if box.id is not None:
                    track_id = int(box.id[0].item())

                # Draw rectangle around person
                cv2.rectangle(
                    frame,
                    (x1, y1),
                    (x2, y2),
                    (0, 255, 0),
                    2
                )

                # Display ID
                if track_id is not None:
                    label = f"Person ID: {track_id}"
                else:
                    label = "Person"

                cv2.putText(
                    frame,
                    label,
                    (x1, max(y1 - 10, 20)),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                    2
                )

        # ==========================================
        # 6. CALCULATE CROWD LEVEL
        # ==========================================

        crowd_level = get_crowd_level(person_count)

        # ==========================================
        # 7. DISPLAY COUNT AND CROWD LEVEL
        # ==========================================

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

        # Display camera window
        cv2.imshow(
            "AI Crowd Monitoring System",
            frame
        )

        # Print count in terminal
        print(
            f"\rPeople: {person_count} | "
            f"Crowd Level: {crowd_level}   ",
            end=""
        )

        # Press Q to exit
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

except KeyboardInterrupt:
    print("\nDetection stopped by user.")

finally:
    camera.release()
    cv2.destroyAllWindows()
    print("\nCamera closed.")
    print("Crowd monitoring stopped.")