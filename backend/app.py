from predictor import detect_objects
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return jsonify({
        "message": "SafeHarvest Backend Running"
    })

@app.route("/upload", methods=["POST"])
def upload():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"})

    file = request.files["image"]

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    file.save(filepath)

    detections, annotated_path = detect_objects(filepath)

    return jsonify({
     "message": "Analysis completed",
     "detections": detections,
     "image_url": f"http://127.0.0.1:5000/{annotated_path}"
})

@app.route('/uploads/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(
        'uploads',
        filename
    )
if __name__ == "__main__":
    app.run(debug=True)