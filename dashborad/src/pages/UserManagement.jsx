import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Michael Brown', email: 'michael@example.com', role: 'Customer', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Emily Davis', email: 'emily@example.com', role: 'Vendor', status: 'Active', joinDate: '2023-03-10' },
    { id: 4, name: 'James Wilson', email: 'james@example.com', role: 'Customer', status: 'Inactive', joinDate: '2023-04-05' },
    { id: 5, name: 'Olivia Martinez', email: 'olivia@example.com', role: 'Customer', status: 'Active', joinDate: '2023-05-12' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } 
        : user
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>User Management</h2>
          <p>Manage all users in the system</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New User
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="filter-group">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="form-control"
          >
            <option value="All">All Roles</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="filter-group">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-control"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge badge-${user.role === 'Admin' ? 'danger' : user.role === 'Vendor' ? 'warning' : 'info'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-${user.status === 'Active' ? 'success' : 'secondary'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline-primary" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-warning" 
                      title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      <i className={`fas fa-${user.status === 'Active' ? 'times' : 'check'}`}></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      title="Delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-info">
          Showing 1 to {filteredUsers.length} of {filteredUsers.length} entries
        </div>
      </div>
    </div>
  );
};

export default UserManagement;