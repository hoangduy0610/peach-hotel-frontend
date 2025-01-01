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
    },
    {
      title: 'Booking',
      link: '/admin/booking',
      icon: 'fas fa-book',
    },
    {
      title: 'Rooms',
      link: '/admin/room',
      icon: 'fas fa-bed',
    },
    {
      title: 'Room Tier',
      link: '/admin/roomtier',
      icon: 'fas fa-layer-group',
    },
    {
      title: 'Service',
      link: '/admin/service',
      icon: 'fas fa-cogs',
    },
    {
      title: 'Promote',
      link: '/admin/promote',
      icon: 'fas fa-tags',
    },
    {
      title: 'Staff',
      link: '/admin/staff',
      icon: 'fas fa-users',
    },
    {
      title: 'Rating',
      link: '/admin/rating',
      icon: 'fas fa-star',
    },
  ];

  return (
    <div className="d-flex flex-column align-items-center w-100 min-vh-100 sidebar px-2">
      <h1 className="logo">
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s"} style={{ width: '100%', height: 'auto' }} />
      </h1>
      <h5 className="systems">Navigation Systems</h5>
      <ul className="nav nav-pills d-flex flex-column w-100">
        {
          routes.map((route, index) => {
            const isActive = comparePathname(currentPath, route.link);

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
      </ul>
    </div>
  );
};

export default Navbar;
