// src/components/AdminDashboard.js

import React, { useState, useEffect } from 'react';

import Sidebar from '../components/Sidebar/Sidebar';
import Charts from '../components/Chart/Chart';
import '../components/Dashboard/Dashboard.css'
// import '../styles/AdminDashboard.css'

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState(5);
  const [bookings, setBookings] = useState(4);
  const [totalSales, setTotalSales] = useState();

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

    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <h1>Welcome to Tours and Travels Dashboard</h1>
        <div className="overview">
          <h2>Overview</h2>
          <p>This is where you can get an overview of your tours and travels business.</p>
        </div>
        <div className="charts">
          <h2>Sales Chart</h2>
          <Charts />
        </div>
        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <ul>
            <li>Booking 1 - Westminister Bridge</li>
            <li>Booking 2 - Bali, Indonesia</li>
            <li>Booking 3 - Nusa Pendia Bali, Indonesia</li>
            {/* Add more recent bookings */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;