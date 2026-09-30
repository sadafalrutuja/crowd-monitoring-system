from ultralytics import YOLO
import cv2

# ==============================
# 1. LOAD YOLO MODEL
# ==============================

model = YOLO("yolo26n.pt")


# ==============================
# 2. CAMERA 1
# ==============================

camera_source = 0

cap = cv2.VideoCapture(camera_source, cv2.CAP_DSHOW)

if not cap.isOpened():
    print("ERROR: Camera not found")
    exit()

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)


# ==============================
# 3. ZONE SETTINGS
# ==============================

zone_name = "SAMADHI MANDIR"

ZONE_X1 = 100
ZONE_Y1 = 100
ZONE_X2 = 900
ZONE_Y2 = 650


# ==============================
# 4. MAIN LOOP
# ==============================

while True:

    success, frame = cap.read()

    if not success:
        print("ERROR: Cannot read frame")
        break


    # ==============================
    # 5. YOLO + BYTETRACK
    # ==============================

    results = model.track(
        source=frame,
        persist=True,
        tracker="bytetrack.yaml",
        conf=0.25,
        iou=0.45,
        classes=[0],
        verbose=False
    )

    result = results[0]


    # ==============================
    # 6. COUNT PEOPLE INSIDE ZONE
    # ==============================

    people_count = 0

    if result.boxes is not None:

        for box in result.boxes.xyxy:

            x1, y1, x2, y2 = map(int, box)

            # Find center of person
            center_x = (x1 + x2) // 2
            center_y = (y1 + y2) // 2

            # Check if center is inside zone
            if (
                ZONE_X1 <= center_x <= ZONE_X2
                and
                ZONE_Y1 <= center_y <= ZONE_Y2
            ):
                people_count += 1


    # ==============================
    # 7. CROWD LEVEL
    # ==============================

    if people_count == 0:

        crowd_level = "NO PEOPLE"
        crowd_color = (255, 255, 255)

    elif people_count <= 500:

        crowd_level = "LOW"
        crowd_color = (0, 255, 0)

    elif people_count <= 1000:

        crowd_level = "MEDIUM"
        crowd_color = (0, 255, 255)

    else:

        crowd_level = "HIGH"
        crowd_color = (0, 0, 255)


    # ==============================
    # 8. DRAW YOLO DETECTIONS
    # ==============================

    annotated_frame = result.plot()


    # ==============================
    # 9. DRAW MONITORING ZONE
    # ==============================

    cv2.rectangle(
        annotated_frame,
        (ZONE_X1, ZONE_Y1),
        (ZONE_X2, ZONE_Y2),
        (255, 0, 0),
        3
    )

    cv2.putText(
        annotated_frame,
        zone_name,
        (ZONE_X1, ZONE_Y1 - 10),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (255, 0, 0),
        2
    )


    # ==============================
    # 10. DISPLAY PEOPLE COUNT
    # ==============================

    cv2.putText(
        annotated_frame,
        f"PEOPLE: {people_count}",
        (30, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        3
    )


    # ==============================
    # 11. CROWD LEVEL BOX
    # ==============================

    frame_height, frame_width = annotated_frame.shape[:2]

    box_width = 300
    box_height = 120

    box_x1 = frame_width - box_width - 20
    box_y1 = 20

    box_x2 = frame_width - 20
    box_y2 = box_y1 + box_height


    # Black background
    cv2.rectangle(
        annotated_frame,
        (box_x1, box_y1),
        (box_x2, box_y2),
        (0, 0, 0),
        -1
    )


    # Border
    cv2.rectangle(
        annotated_frame,
        (box_x1, box_y1),
        (box_x2, box_y2),
        crowd_color,
        3
    )


    # CROWD LEVEL text
    cv2.putText(
        annotated_frame,
        "CROWD LEVEL",
        (box_x1 + 15, box_y1 + 35),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.7,
        (255, 255, 255),
        2
    )


    # Crowd level
    cv2.putText(
        annotated_frame,
        crowd_level,
        (box_x1 + 15, box_y1 + 85),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        crowd_color,
        3
    )


    # ==============================
    # 12. SHOW CAMERA
    # ==============================

    cv2.imshow(
        "Temple People Counting System - Camera 1",
        annotated_frame
    )


    # ==============================
    # 13. PRESS Q TO EXIT
    # ==============================

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# ==============================
# 14. RELEASE CAMERA
# ==============================

cap.release()
cv2.destroyAllWindows()