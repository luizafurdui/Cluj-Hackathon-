import React, { useState, useEffect } from 'react';
import "../assets/css/UsersList.css";
import { getAllUsers, updateFlowPermissions } from "../api.js";

function UsersList({ existingUsersFlow, flowId, toggleUsersListVisibility }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        getAllUsers(setUsers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchAllUsers();
  }, []);

  const filteredUsers = users.map(user => {
    // Determine permission level based on existingUsersFlow
    const isReadWrite = existingUsersFlow.usersreadwrite.includes(user._id);
    const isRead = existingUsersFlow.usersread.some(u => u._id === user._id);
    const permissionLevel = isReadWrite ? 2 : isRead ? 1 : 0;
    console.log(user._id, user.username, permissionLevel, existingUsersFlow);
    return { ...user, permission: permissionLevel };
  }).filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePermissionChange = (userId, permission) => {
    updateFlowPermissions(flowId, userId, permission)
      .then(() => {
        // Update the local state to reflect the change immediately
        setUsers(users.map(user => 
          user._id === userId ? { ...user, permission } : user
        ));
      })
      .catch(error => {
        console.error("Failed to update permissions", error);
      });
  };

  return (
    <div className="users-container">
      <input
        type="text"
        placeholder="Search users..."
        className="search-input"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul className="users-list">
        {filteredUsers.map(user => (
          <li key={user._id} className="user-info">
            {user.username} ({user.rank})
            <select
              value={user.permission}
              onChange={(e) => handlePermissionChange(user._id, parseInt(e.target.value, 10))}
            >
              <option value="0">No Access</option>
              <option value="1">Read</option>
              <option value="2">Read/Write</option>
            </select>
          </li>
        ))}
      </ul>
      <button onClick={toggleUsersListVisibility} className="toggle-users-btn">
        Hide Users
      </button>
    </div>
  );
}

export default UsersList;
