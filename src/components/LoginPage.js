import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import './LoginPage.css';
import config from './config.json';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("patient");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${config.API_BASE_URL}/user?value=${encodeURIComponent(username)}`);
      const data = await res.json(); ;

      if (data) {
        const user = data.find(user => user.email.toLocaleLowerCase() === username.toLocaleLowerCase() && user.password === password);
        if(!user) {
          alert("Invalid credentials");
          return;
        }
        const userId = user.userid;
        const role  = user.role;
        const name = user.name;

        onLogin(userId, role, name);

        if (role === "Admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }     
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login error");
    }
  };
  return (
    <div className="login-container">
      <div className="login-graphic"></div>

      <div className="login-card">
        <h2>You can Login Here</h2>      
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
