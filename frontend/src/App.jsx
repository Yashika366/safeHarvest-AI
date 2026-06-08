import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const uploadImage = async () => {

    const formData = new FormData();

    formData.append("image", file);

    const response = await axios.post(
      "http://127.0.0.1:5000/upload",
      formData
    );

    setResult(response.data.message);
  };

  return (
    <div>

      <h1>SafeHarvest AI</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br /><br />

      <button onClick={uploadImage}>
        Upload
      </button>

      <h3>{result}</h3>

    </div>
  );
}

export default App;