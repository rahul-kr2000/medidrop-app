import { useEffect, useState } from "react";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from './config.json';
import { format } from 'date-fns';

const Dashboard = ({ onLogout, userId , role, username}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${config.API_BASE_URL}/getrecords`);
      const data = await res.json();
      if(role=== "Patient") {
        // Filter records for Doctor role
        const patientRecords = data.filter(record => record.name === username);
        setRecords(patientRecords);
      }else{
        // For Doctor or Admin, show all records
        setRecords(data);
      }

    } catch (err) {
      console.error("Error fetching records:", err);
    }
    finally {
    setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRecords();
    }
  }, [userId]);

  const handleUpload = () => {    
    navigate("/upload");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      const response = await fetch(`${config.API_BASE_URL}/delete-record/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete failed');
      fetchRecords();
      alert("Record deleted successfully...");


    } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record.");
    }
  };
   
  const handleDownload = async (s3key) => {
    try {
      // Call your backend API to get presigned URL

      const res = await fetch(`${config.API_BASE_URL}/downloadPresigneUrl?s3key=${encodeURIComponent(s3key)}`);
      const data = await res.json();

      if (!data.downloadUrl) {
        alert('Could not generate download URL');
        return;
      }

      // Open the presigned URL in new tab to view/download
      window.open(data.downloadUrl, '_blank');
      } catch (error) {
        console.error('Error fetching presigned URL:', error);
        alert('Download failed');
      }
  };

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header">
        <h1>Uploaded Records</h1>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div> */}

      <header className="dashboard-header">
        <div className="dashboard-top-bar">
          <h2>Hi, <span style={{ fontSize: "1.2rem" }}>
            {role === "Doctor" ? "👨‍⚕️ Dr." : "🤒"} {username}
          </span></h2>
          <p>Welcome back to your dashboard</p>
        </div>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>


       {role === "Patient" && (
        <button className="upload-button" onClick={handleUpload}>Upload Record
          </button>
       )}
      <div className="record-list">
        {loading ? (
          <div className="spinner-container">
            <span className="spinner"></span>
          </div>
        ) : records.length === 0 ? (
          <p>No records found.</p>
        ) 
        
        : (
          records.map((record) => (
            <div key={record.DocId} className="record-card">
              <h3>{record.name}</h3>              
              <p>
                {record.testtype} = {record.value} {record.unit} <br/>
                Date : {format(new Date(record.uploadedat), 'MMMM d, yyyy')} <br/>
                <a href="#" onClick={() => handleDownload(record.s3key)} rel="noopener noreferrer">
                  ⬇️ Download
                </a>
              </p>
              <button className="delete-button" onClick={() => handleDelete(record.docid)}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
