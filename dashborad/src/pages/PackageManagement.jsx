import React, { useState } from 'react';
import './PackageManagement.css';

const PackageManagement = () => {
  const [packages, setPackages] = useState([
    { id: 1, name: 'Basic Wedding Package', category: 'Budget', price: 2500, status: 'Active', vendors: 5, bookings: 12 },
    { id: 2, name: 'Premium Wedding Package', category: 'Standard', price: 5000, status: 'Active', vendors: 8, bookings: 24 },
    { id: 3, name: 'Deluxe Wedding Package', category: 'Premium', price: 8500, status: 'Active', vendors: 12, bookings: 8 },
    { id: 4, name: 'Luxury Wedding Package', category: 'Premium', price: 15000, status: 'Inactive', vendors: 15, bookings: 3 },
    { id: 5, name: 'Elopement Package', category: 'Budget', price: 1200, status: 'Active', vendors: 3, bookings: 17 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || pkg.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || pkg.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeletePackage = (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== packageId));
    }
  };

  const handleToggleStatus = (packageId) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, status: pkg.status === 'Active' ? 'Inactive' : 'Active' } 
        : pkg
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Package Management</h2>
          <p>Manage all wedding packages in the system</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Package
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="filter-group">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-control"
          >
            <option value="All">All Categories</option>
            <option value="Budget">Budget</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
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
              <th>Package Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Vendors</th>
              <th>Bookings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map(pkg => (
              <tr key={pkg.id}>
                <td>{pkg.name}</td>
                <td>
                  <span className={`badge badge-${pkg.category === 'Premium' ? 'warning' : pkg.category === 'Standard' ? 'primary' : 'info'}`}>
                    {pkg.category}
                  </span>
                </td>
                <td>${pkg.price.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${pkg.status === 'Active' ? 'success' : 'secondary'}`}>
                    {pkg.status}
                  </span>
                </td>
                <td>{pkg.vendors}</td>
                <td>{pkg.bookings}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline-primary" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-warning" 
                      title={pkg.status === 'Active' ? 'Deactivate' : 'Activate'}
                      onClick={() => handleToggleStatus(pkg.id)}
                    >
                      <i className={`fas fa-${pkg.status === 'Active' ? 'times' : 'check'}`}></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      title="Delete"
                      onClick={() => handleDeletePackage(pkg.id)}
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
          Showing 1 to {filteredPackages.length} of {filteredPackages.length} entries
        </div>
      </div>
    </div>
  );
};

export default PackageManagement;