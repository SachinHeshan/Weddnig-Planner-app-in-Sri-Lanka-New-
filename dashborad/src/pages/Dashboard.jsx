import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Sample data for statistics
  const statsData = [
    { id: 1, title: 'Total Users', value: '1,248', icon: 'users', color: '#3498db' },
    { id: 2, title: 'Total Vendors', value: '142', icon: 'store', color: '#2ecc71' },
    { id: 3, title: 'Active Packages', value: '86', icon: 'box', color: '#9b59b6' },
    { id: 4, title: 'Monthly Revenue', value: '$24,560', icon: 'dollar-sign', color: '#f1c40f' },
  ];

  // Sample data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4000, bookings: 24 },
    { name: 'Feb', revenue: 3000, bookings: 13 },
    { name: 'Mar', revenue: 2000, bookings: 18 },
    { name: 'Apr', revenue: 2780, bookings: 38 },
    { name: 'May', revenue: 1890, bookings: 25 },
    { name: 'Jun', revenue: 2390, bookings: 21 },
  ];

  const packageData = [
    { name: 'Basic', value: 400 },
    { name: 'Premium', value: 300 },
    { name: 'Deluxe', value: 300 },
    { name: 'Luxury', value: 200 },
  ];

  const COLORS = ['#3498db', '#2ecc71', '#9b59b6', '#f1c40f'];

  // Sample recent activity data
  const activities = [
    { id: 1, type: 'user', title: 'New User Registered', description: 'Sarah Johnson registered as a new user', time: '2 hours ago' },
    { id: 2, type: 'vendor', title: 'New Vendor Added', description: 'Grand Ballroom Hotel added as a new vendor', time: '5 hours ago' },
    { id: 3, type: 'package', title: 'Package Updated', description: 'Premium Wedding Package details updated', time: '1 day ago' },
    { id: 4, type: 'user', title: 'New Booking', description: 'Michael Brown booked the Deluxe Package', time: '1 day ago' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Dashboard</h2>
          <p>Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      <div className="stats-container">
        {statsData.map((stat) => (
          <div className="stat-card" key={stat.id}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <i className={`fas fa-${stat.icon}`}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Revenue & Bookings</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3498db" name="Revenue ($)" />
              <Bar dataKey="bookings" fill="#2ecc71" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Package Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={packageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {packageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-activity">
        <div className="chart-header">
          <h3>Recent Activity</h3>
        </div>
        <ul className="activity-list">
          {activities.map((activity) => (
            <li className="activity-item" key={activity.id}>
              <div className={`activity-icon ${activity.type}`}>
                <i className={`fas fa-${activity.type === 'user' ? 'user' : activity.type === 'vendor' ? 'store' : 'box'}`}></i>
              </div>
              <div className="activity-content">
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
                <div className="activity-time">{activity.time}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;