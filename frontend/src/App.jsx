import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onDrop = (acceptedFiles) => {
  const selectedFile = acceptedFiles[0];

  if (selectedFile) {
  setFile(selectedFile);
  setPreview(URL.createObjectURL(selectedFile));

  // Reset previous results
  setResult(null);
  setDetectedImage(null);
  setSuccessMessage("");
}
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: {
    "image/*": [],
  },
  multiple: false,
});

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData
      );

      setResult(response.data);
      setDetectedImage(response.data.image_url);

      setSuccessMessage(
  "✅ Analysis completed successfully!"
   );
    } catch (error) {
      console.error(error);
      alert("Error uploading image.");
    }

    setLoading(false);
  };

  const groupedDetections = {};

  result?.detections?.forEach((item) => {
    if (!groupedDetections[item.name]) {
      groupedDetections[item.name] = {
        count: 1,
        confidence: item.confidence,
      };
    } else {
      groupedDetections[item.name].count++;

      groupedDetections[item.name].confidence = Math.max(
        groupedDetections[item.name].confidence,
        item.confidence
      );
    }
  });

  return (
    <div className="app">
      <h1 className="logo">
        SafeHarvest AI 🌿
      </h1>

      <p className="subtitle">
        AI-powered Fruit & Vegetable Detection System
      </p>

      <div className="upload-card">
        <div
  {...getRootProps()}
  className={`dropzone ${
    isDragActive ? "dropzone-active" : ""
  }`}
>
  <input {...getInputProps()} />

  {isDragActive ? (
    <p>📥 Drop the image here...</p>
  ) : (
    <>
      <div className="upload-icon">
        📷
      </div>

      <p className="dropzone-title">
        Drag & Drop your image here
      </p>

      <p className="dropzone-subtitle">
        or click to browse
      </p>

      {file && (
        <p className="file-name">
          Selected: {file.name}
        </p>
      )}
    </>
  )}
</div>

        <button
          className="upload-btn"
          onClick={uploadImage}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Analyzing image using AI...</p>
        </div>
      )}

      {successMessage && !loading && (
       <div className="success-message fade-in">
        {successMessage}
       </div>
)}

      {(preview || detectedImage) && !loading && (
        <div className="image-section">
          {preview && (
            <div className="image-card fade-in">
              <h2>Original Image</h2>

              <img
                src={preview}
                alt="Preview"
                className="result-image"
              />
            </div>
          )}

          {detectedImage && (
            <div className="image-card fade-in">
              <h2>AI Detection Result</h2>

              <img
                src={detectedImage}
                alt="Detected"
                className="result-image"
              />
            </div>
          )}
        </div>
      )}

      <div className="results-container">
        {Object.entries(groupedDetections).map(([name, details]) => (
          <div key={name} className="result-card fade-in">
            <h2>{name.toUpperCase()}</h2>

            <p>Detected: {details.count}</p>

            <p>Confidence: {details.confidence}%</p>

            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${details.confidence}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="future-card">
        <h2>🚀 Future Vision</h2>

        <p>
  Current implementation uses a pre-trained YOLOv8 model for
  proof-of-concept fruit detection. Future versions will
  incorporate a custom-trained dataset to improve accuracy
  and support a wider range of produce. Additionally,
  SafeHarvest AI aims to integrate chemical residue analysis
  and supply-chain traceability to enhance food safety
  assessment.
</p>
      </div>
    </div>
  );
}

export default App;