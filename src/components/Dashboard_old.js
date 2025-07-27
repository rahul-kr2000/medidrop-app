import { useEffect, useState } from "react";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from './config.json';

const Dashboard = ({ onLogout, userId , role, username}) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      setLoading(true);
      //const res = await fetch(`${config.API_BASE_URL}/api/records?userId=${userId}`);
      //const data = await res.json();
      const data = [
          {
              "RecordId": 1,
              "patientname": "John Doe",
              "Filename": "blood_test_report.pdf",
              "Fileurl": "https://example.com/uploads/blood_test_report.pdf"
          },
          {
              "RecordId": 2,
              "patientname": "Jane Smith",
              "Filename": "xray_chest.jpg",
              "Fileurl": "https://example.com/uploads/xray_chest.jpg"
          },
          {
              "RecordId": 3,
              "patientname": "Alice Johnson",
              "Filename": "mri_brain_scan.pdf",
              "Fileurl": "https://example.com/uploads/mri_brain_scan.pdf"
          },
          {
              "RecordId": 4,
              "patientname": "Bob Lee",
              "Filename": "covid_vaccine_card.png",
              "Fileurl": "https://example.com/uploads/covid_vaccine_card.png"
          }
      ];

      setRecords(data);
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
      await axios.delete(`${config.API_BASE_URL}/api/records/${id}`);
      // Refresh records list
      fetchRecords();
      alert("Record deleted successfully...");
    } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record.");
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
            {Number(role) === 2 ? "🤒" : "👨‍⚕️ Dr."} {username}
          </span></h2>
          <p>Welcome back to your dashboard</p>
        </div>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>


       {Number(role) === 2 && (
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
            <div key={record.RecordId} className="record-card">
              <h3>{record.patientname}</h3>
              <p>
                <a href={record.Fileurl} target="_blank" rel="noopener noreferrer">
                  {record.Filename}
                </a>
              </p>
              <button className="delete-button" onClick={() => handleDelete(record.RecordId)}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
