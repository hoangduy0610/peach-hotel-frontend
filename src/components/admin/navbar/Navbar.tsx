import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import { comparePathname } from '@/utils/uri';

const Navbar: React.FC = () => {
  const [currentPath, setCurrentPath] = useState("");

  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const routes = [
    {
      title: 'Dashboard',
      link: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
      roles: ['ROLE_ADMIN', 'ROLE_RECEP'],
    },
    {
      title: 'Booking',
      link: '/admin/booking',
      icon: 'fas fa-book',
      roles: ['ROLE_ADMIN', 'ROLE_RECEP'],
    },
    {
      title: 'Rooms',
      link: '/admin/room',
      icon: 'fas fa-bed',
      roles: ['ROLE_ADMIN'],
    },
    {
      title: 'Room Tier',
      link: '/admin/roomtier',
      icon: 'fas fa-layer-group',
      roles: ['ROLE_ADMIN'],
    },
    {
      title: 'Service',
      link: '/admin/service',
      icon: 'fas fa-cogs',
      roles: ['ROLE_ADMIN'],
    },
    {
      title: 'Promote',
      link: '/admin/promote',
      icon: 'fas fa-tags',
      roles: ['ROLE_ADMIN'],
    },
    {
      title: 'Staff',
      link: '/admin/staff',
      icon: 'fas fa-users',
      roles: ['ROLE_ADMIN'],
    },
    {
      title: 'Customer',
      link: '/admin/customer',
      icon: 'fas fa-user-friends',
      roles: ['ROLE_ADMIN', 'ROLE_RECEP'],
    },
    {
      title: 'Blacklist',
      link: '/admin/blacklist',
      icon: 'fas fa-ban',
      roles: ['ROLE_ADMIN', 'ROLE_RECEP'],
    },
    {
      title: 'Rating',
      link: '/admin/rating',
      icon: 'fas fa-star',
      roles: ['ROLE_ADMIN', 'ROLE_RECEP'],
    },
    {
      title: 'Payment History',  // New Route
      link: '/admin/paymenthistory',  // Add your route here
      icon: 'fas fa-credit-card',  // You can use any icon you prefer
      roles: ['ROLE_ADMIN', 'ROLE_RECEP'],  // Add your role here
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('role');
    window.location.href = '/admin/login';
  }

  return (
    <div className="d-flex flex-column align-items-center w-100 min-vh-100 sidebar px-2">
      <h1 className="logo">
        {/* <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s"} style={{ width: '100%', height: 'auto' }} /> */}
        <img src={require("@/assets/logo.jpg")} style={{ height: 150, width: 'auto' }} />
      </h1>
      <h5 className="systems">Navigation Systems</h5>
      <ul className="nav nav-pills d-flex flex-column w-100">
        {
          routes.map((route, index) => {
            const isActive = comparePathname(currentPath, route.link);
            if (!route.roles.includes(localStorage.getItem('role') || '')) {
              return null;
            }
            return (
              <li key={index} className={`flex-1 nav-item`}>
                <Link
                  to={route.link}
                  className={`nav-link ${isActive ? "nav-link-active" : "text-dark"}`}
                >
                  <span className="icon-circle">
                    <i className={route.icon}></i>
                  </span>
                  <span
                    className={`title ${isActive ? "title-active" : "text-dark"}`}
                  >
                    {route.title}
                  </span>
                </Link>
              </li>
            );
          })
        }
        <li key={99999} className={`flex-1 nav-item`}>
          <Link
            to={"#"}
            onClick={handleLogout}
            className={`nav-link text-dark`}
          >
            <span className="icon-circle">
              <i className="fas fa-right-from-bracket"></i>
            </span>
            <span
              className={`title text-dark`}
            >
              Logout
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
