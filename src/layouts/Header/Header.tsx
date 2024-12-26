import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useSystemContext } from "@/hooks/useSystemContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const context = useSystemContext();  // Get context for token or login state
  const { token } = context;  // You can use token or isLoggedIn from context

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = (e: any) => {
    const header = document.querySelector('.header-section');
    if (!header) return;
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
  };

  const closeMenu = () => {
    if (window.innerWidth <= 991) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    // Clear token or any session-related info
    context.setToken("");  // Reset token in context
    localStorage.removeItem("token");  // Remove token from localStorage
    navigate("/login");  // Redirect to home page or login page
  };

  return (

    <header className="header-section">
      <Container>

        <Navbar expand="lg" className="p-0">
          {/* Logo Section  */}
          <Navbar.Brand>
            <NavLink to="/"> Weekendmonks</NavLink>
          </Navbar.Brand>
          {/* End Logo Section  */}

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            show={open}
          >
            {/*mobile Logo Section  */}
            <Offcanvas.Header>
              <h1 className="logo">Weekendmonks</h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>
            {/*end mobile Logo Section  */}

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/" onClick={closeMenu}>
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/about-us" onClick={closeMenu}>
                  ABOUT US
                </NavLink>
                <NavLink className="nav-link" to="/rooms" onClick={closeMenu}>
                  ROOMS
                </NavLink>
                <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                  CONTACT
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Conditionally render Login or LogOut button */}
          <div className="ms-md-4 ms-2">
            {!token ? (
              <NavLink className="primaryBtn d-none d-sm-inline-block" to="/login">
                Login
              </NavLink>
            ) : (
              <button
                className="primaryBtn d-none d-sm-inline-block"
                onClick={handleLogout}
              >
                LogOut
              </button>
            )}
          </div>
        </Navbar>

      </Container>
    </header>
  );
};

export default Header;