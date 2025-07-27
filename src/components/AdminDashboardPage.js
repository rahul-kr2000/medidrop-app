import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from './config.json';
import './AdminDashboardPage.css';

const AdminDashboard = ({  onLogout, userId , role, username }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    userid: '',
    name: '',
    email: '',
    role: 'Admin', 
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
 const handleAddMember = async (user) => {
    try {
        if(!newUser.role){
            newUser.role= 'Admin'; // Default role if not specified
        }
        const res = await fetch(`${config.API_BASE_URL}/postUser`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(user),
         });


        if (!res.ok) {
            throw new Error('Failed to add user');
        }

        const data = await res.json();
        console.log("User added successfully:", data);
        alert("User added successfully:");
        fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
        console.error("Error adding user:", error);
    }   
};
const handleDeleteUser = async (userid) => {
    try {               
        const res = await fetch(`${config.API_BASE_URL}/delete-user/${userid}`, {
            method: 'DELETE',
        }); 

        if (!res.ok) {
        throw new Error('Failed to delete user');
        }

        const data = await res.json();
        console.log("User deleted successfully:", data);
        alert("User deleted successfully:");
        fetchUsers(); // Refresh the user list after deleting a user
    } catch (error) {
    console.error("Error deleting user:", error);
  }
};

  const submitNewUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.password || !newUser.email) {
        alert('All fields required');
        return;
    }
    handleAddMember(newUser);
    setShowModal(false);
    setNewUser({ userid: '', email: '', Name: '' ,role: '' });
  };
  
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${config.API_BASE_URL}/user`);
      const data = await res.json(); ;

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        fetchUsers(); 
    }, []);

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-header">
        <h2>📋 Admin Dashboard</h2>
        <p>Manage users, roles, and access below.</p>
        <button className="add-member-btn" onClick={() => setShowModal(true)}>➕ Add New Member</button>
      </div>
      <div className="top-bar">
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>

      <div className="user-cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user, index) => (
            <div key={user.userid} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role }</p>
              <button className="delete-btn" onClick={() => handleDeleteUser(user.userid)}>🗑️ Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New Member</h3>
            <input type="text" name="name" placeholder="Full Name" value={newUser.name} onChange={handleInputChange} required/>
            <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required/>
            <input type="password" name="password" placeholder="Enter Password" value={newUser.password}  onChange={handleInputChange} required/>
            <select name="role" value={newUser.role} onChange={handleInputChange}>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
            </select>
            <button className="submit-btn" onClick={submitNewUser}>Add Member</button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
