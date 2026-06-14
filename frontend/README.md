# 🌿 SafeHarvest AI

SafeHarvest AI is an AI-powered web application designed to identify fruits and vegetables from images using computer vision techniques. The system enables users to upload an image and receive real-time object detection results along with confidence scores, providing an initial step toward intelligent food quality assessment.

---

## Features

* 📷 Upload images using drag-and-drop or file selection.
* 🤖 Detect fruits and vegetables using YOLOv8.
* 📊 Display confidence scores for detected items.
* 📈 Visualize detection results with progress indicators.
* 🖼️ Compare the original image with the AI-annotated output.
* ✨ Modern and responsive user interface built with React.
* 🔄 Analyze multiple images using the "Try Another Image" feature.

---

##  Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Dropzone
* CSS

### Backend

* Python
* Flask
* Flask-CORS

### Artificial Intelligence

* YOLOv8 (Ultralytics)
* OpenCV

---

##  Project Structure

```
safeHarvest-AI/
│
├── backend/
│   ├── app.py
│   ├── predictor.py
│   ├── uploads/
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

##  Installation and Setup

### Clone the repository

```bash
git clone https://github.com/yashika366/safeHarvest-AI.git
cd safeHarvest-AI
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

The backend server will start at:

```
http://127.0.0.1:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The frontend application will run at:

```
http://localhost:5173
```

---

##  How It Works

1. Upload an image containing fruits or vegetables.
2. The image is sent to the Flask backend.
3. YOLOv8 performs object detection on the uploaded image.
4. Detection results are returned to the frontend.
5. The application displays:

   * Original image
   * AI-generated detection image
   * Detected objects
   * Confidence scores

---

##  Sample Output

* Original image preview.
* AI detection image with bounding boxes.
* Detection summary cards showing:

  * Item name
  * Number of detections
  * Highest confidence score

---
## Application Screenshots

![Home Page](screenshots/home.png)
![Detection Result](screenshots/result.png)

##  Limitations

* The current implementation uses a pre-trained YOLOv8 model for proof-of-concept fruit detection.
* Detection accuracy is limited to the object classes supported by the pre-trained model.
* Some fruits and vegetables may not be recognized accurately due to dataset limitations.
* Overlapping detections can occasionally lead to duplicate counts.

---

## 🚀 Future Improvements

* Train a custom YOLO model using a dedicated fruit and vegetable dataset.
* Improve detection accuracy and expand the range of supported produce.
* Integrate chemical residue analysis for enhanced food safety assessment.
* Add supply-chain traceability features.
* Deploy the application for public access.
* Incorporate nutritional information and freshness estimation.

---

##  Use Cases

* Educational demonstrations of computer vision applications.
* Food technology and safety awareness projects.
* Hackathons focused on AI for social good.
* Portfolio and placement projects showcasing full-stack AI development skills.

---

## Author

**Yashika Keshari**

If you found this project interesting, consider giving it a ⭐ on GitHub.
