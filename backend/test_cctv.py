import cv2

camera = cv2.VideoCapture(0, cv2.CAP_DSHOW)

if not camera.isOpened():
    camera.release()
    camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Cannot open camera")
    raise SystemExit(1)

print("Camera opened successfully!")

while True:
    success, frame = camera.read()

    if not success:
        print("Cannot read camera frame")
        break

    cv2.imshow("Crowd Monitoring System", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

camera.release()
cv2.destroyAllWindows()

print("Camera closed")