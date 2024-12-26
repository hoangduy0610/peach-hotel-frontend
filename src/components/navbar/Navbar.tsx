import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/booking">Booking</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/customer">Customer</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/staff">Staff</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/statistic">Statistic</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/coupon">Coupon</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
