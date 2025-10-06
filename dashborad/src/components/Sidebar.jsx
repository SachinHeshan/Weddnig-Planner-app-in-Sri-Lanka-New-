import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/users', icon: 'fas fa-users', label: 'User Management' },
    { path: '/vendors', icon: 'fas fa-store', label: 'Vendor Management' },
    { path: '/packages', icon: 'fas fa-box', label: 'Package Management' },
    { path: '/bookings', icon: 'fas fa-calendar-check', label: 'Bookings' },
    { path: '/reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { path: '/settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  return (
    <div className={`sidebar ${isOpen ? '' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-ring logo-icon"></i>
          {isOpen && <span className="logo-text">Wedding Planner</span>}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className={`fas fa-${isOpen ? 'angle-left' : 'angle-right'}`}></i>
        </button>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <i className={item.icon}></i>
            {isOpen && <span className="menu-text">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;