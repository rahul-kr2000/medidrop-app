import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from 'axios';
import './UploadPage.css';
import config from './config.json';

// oxlint-disable-next-line no-unused-vars
const UploadPage = ({ userId }) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (document) {
      console.log("Uploading:", { document });
      setLoading(true);
      try {
        //const response = await axios.post(`${config.API_BASE_URL}/api/records`, formData);
        const uniqueFileName = `${Date.now()}_${document.name}`;
        const response = await fetch(
            `${config.API_BASE_URL}/generatePresignedUrl?fileName=${encodeURIComponent(uniqueFileName)}&fileType=${encodeURIComponent(document.type)}`
          );

          const data = await response.json();
          const { uploadUrl } = data;

          const s3Upload = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': document.type
            },
            body: document
          });
          if (s3Upload.ok){
            setTimeout(() => {
              alert("Record uploaded successfully!");
              navigate("/dashboard");
            }, 2000);
          }
        } catch (error) {
          console.error(error);
          alert('Upload failed');
          setLoading(false);
          navigate("/dashboard");
        }            
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h2>Upload Patient Record</h2>
        <Link to="/dashboard" className="close-link">✕ Close</Link>
      </div>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setDocument(e.target.files[0])}
        />
        <button type="submit" disabled={loading}> {loading ? <span className="spinner"></span> : "Submit"}</button>
      </form>
    </div>
  );
};

export default UploadPage;
