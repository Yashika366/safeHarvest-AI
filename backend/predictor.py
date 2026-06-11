from ultralytics import YOLO
import os

# Load YOLO model
model = YOLO("yolov8n.pt")

def detect_objects(image_path):
    results = model(image_path)

    detections = []

    annotated_image_path = None

    for result in results:

        boxes = result.boxes

        for box in boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            detections.append({
                "name": model.names[class_id],
                "confidence": round(confidence * 100, 2)
            })

        # Save annotated image
        annotated_image = result.plot()

        filename = os.path.basename(image_path)

        annotated_image_path = os.path.join(
            "uploads",
            f"detected_{filename}"
        )

        import cv2

        cv2.imwrite(
            annotated_image_path,
            annotated_image
        )

    return detections, annotated_image_path