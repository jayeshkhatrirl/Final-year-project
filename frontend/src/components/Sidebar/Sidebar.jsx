import React from 'react';
// import { Link } from 'react-router-dom';
import '../Sidebar/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
          {/* <Link to="/">Home</Link> */}
          {/* <img src={images} alt="Not loaded" /> */}
          <h1>Admin</h1>
          <h1>Dashboard</h1>
          <hr />
    </div>
  );
};

export default Sidebar;