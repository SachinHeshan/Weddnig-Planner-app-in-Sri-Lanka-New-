import React, { useState } from 'react';
import './VendorManagement.css';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Grand Ballroom Hotel', category: 'Venue', email: 'info@grandballroom.com', phone: '+1234567890', status: 'Active', rating: 4.8 },
    { id: 2, name: 'Capture Moments Photography', category: 'Photography', email: 'hello@capturemoments.com', phone: '+1234567891', status: 'Active', rating: 4.9 },
    { id: 3, name: 'Blooming Beauties Florists', category: 'Flowers', email: 'orders@bloomingbeauties.com', phone: '+1234567892', status: 'Inactive', rating: 4.6 },
    { id: 4, name: 'The Wedding Band', category: 'Music', email: 'bookings@theweddingband.com', phone: '+1234567893', status: 'Active', rating: 4.7 },
    { id: 5, name: 'Gourmet Catering Co.', category: 'Catering', email: 'events@gourmetcatering.com', phone: '+1234567894', status: 'Active', rating: 4.9 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || vendor.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || vendor.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteVendor = (vendorId) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(vendor => vendor.id !== vendorId));
    }
  };

  const handleToggleStatus = (vendorId) => {
    setVendors(vendors.map(vendor => 
      vendor.id === vendorId 
        ? { ...vendor, status: vendor.status === 'Active' ? 'Inactive' : 'Active' } 
        : vendor
    ));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Vendor Management</h2>
          <p>Manage all vendors in the system</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Vendor
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search vendors..."
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
            <option value="Venue">Venue</option>
            <option value="Photography">Photography</option>
            <option value="Flowers">Flowers</option>
            <option value="Music">Music</option>
            <option value="Catering">Catering</option>
            <option value="Beauty">Beauty</option>
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
              <th>Vendor Name</th>
              <th>Category</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>
                  <span className="badge badge-info">
                    {vendor.category}
                  </span>
                </td>
                <td>
                  <div>{vendor.email}</div>
                  <div className="phone">{vendor.phone}</div>
                </td>
                <td>
                  <span className={`badge badge-${vendor.status === 'Active' ? 'success' : 'secondary'}`}>
                    {vendor.status}
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <i className="fas fa-star star-filled"></i>
                    {vendor.rating}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-outline-primary" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-warning" 
                      title={vendor.status === 'Active' ? 'Deactivate' : 'Activate'}
                      onClick={() => handleToggleStatus(vendor.id)}
                    >
                      <i className={`fas fa-${vendor.status === 'Active' ? 'times' : 'check'}`}></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      title="Delete"
                      onClick={() => handleDeleteVendor(vendor.id)}
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
          Showing 1 to {filteredVendors.length} of {filteredVendors.length} entries
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;