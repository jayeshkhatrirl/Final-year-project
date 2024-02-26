import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Add more navigation links */}
      </ul>
    </div>
  );
};

export default Sidebar;
