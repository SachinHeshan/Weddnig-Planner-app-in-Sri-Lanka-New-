import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import VendorManagement from './pages/VendorManagement';
import PackageManagement from './pages/PackageManagement';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${sidebarOpen ? '' : 'collapsed'}`}>
          <Header toggleSidebar={toggleSidebar} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/vendors" element={<VendorManagement />} />
              <Route path="/packages" element={<PackageManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;