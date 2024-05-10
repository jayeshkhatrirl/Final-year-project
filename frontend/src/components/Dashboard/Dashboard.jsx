import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Charts from '../Chart/Chart';
import "./Dashboard.css"



const Dashboard = () => {
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
            <li>Booking 1 - Tour to XYZ</li>
            <li>Booking 2 - Cruise to ABC</li>
            {/* Add more recent bookings */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

