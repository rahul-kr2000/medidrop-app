import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import UploadPage from "./components/UploadPage";
import AdminDashboard from "./components/AdminDashboardPage";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [name, setUsername] = useState(localStorage.getItem('name'));

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUserId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (id, role, name) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setIsAuthenticated(true);
    setUserId(id);
    setRole(role);
    setUsername(name);
  };

  const handleLogout = () => {
   localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
    setUserId(null);
    setRole(null);
    setUsername(null);
  };

  const handlePage = ()=>{
    if (role === "Admin") {
      return <AdminDashboard onLogout={handleLogout} userId={userId} role={role} username={name}/>;
    } else if (role === "Doctor" || role === "Patient") {
      return <Dashboard onLogout={handleLogout} userId={userId} role={role} username={name}/>;
    } else {
      return <Navigate to="/" />;
    } 
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? handlePage() : <LoginPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout} userId={userId} role={role} username={name}/> : <Navigate to="/" />} />
        <Route path="/admin-dashboard" element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} userId={userId} role={role} username={name}/>: <Navigate to="/" />} />
        <Route path="/upload" element={isAuthenticated ? <UploadPage userId={userId} role={role}/> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
