// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Fetch data from the backend to get registration count, bookings, and total sales
    fetch('/api/admin/dashboard') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data.registrations);
        setBookings(data.bookings);
        setTotalSales(data.totalSales);
      })
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-item">
        <h3>Registrations</h3>
        <p>{registrations}</p>
      </div>

      <div className="dashboard-item">
        <h3>Bookings</h3>
        <p>{bookings}</p>
      </div>

      <div className="dashboard-item">
        <h3>Total Sales</h3>
        <p>{totalSales}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;