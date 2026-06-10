from ultralytics import YOLO

# Load YOLO model
model = YOLO("yolov8n.pt")

def detect_objects(image_path):
    results = model(image_path)

    detections = []

    for result in results:
        boxes = result.boxes

        for box in boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            detections.append({
                "name": model.names[class_id],
                "confidence": round(confidence * 100, 2)
            })

    return detections