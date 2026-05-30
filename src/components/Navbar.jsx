import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="logo">
          <Link to="/">
            <img src="/assests/logo.png" alt="Arshith Group Logo" />
          </Link>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
            </li>
            
            <li>
              <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
            </li>

            <li>
              <Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link>
            </li>

            <li>
              <Link to="/portfolio" className={isActive("/portfolio") ? "active" : ""}>Businesses</Link>
            </li>

            <li>
              <Link to="/industries" className={isActive("/industries") ? "active" : ""}>Industries</Link>
            </li>

            <li className="dropdown">
              <Link to="/blog" className={isActive("/blog") ? "active" : ""}>
                News <i className="ri-arrow-down-s-line"></i>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/blog">Latest News</Link>
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <Link to="/careers" className={isActive("/careers") ? "active" : ""}>
                Careers <i className="ri-arrow-down-s-line"></i>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/internship">Internship</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>
            </li>
          </ul>
        </nav>

        <button 
          className={`hamburger ${isOpen ? "hamburger-active" : ""}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div className={`mobile-nav-panel ${isOpen ? "mobile-nav-panel-open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""} onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={isActive("/about") ? "active" : ""} onClick={toggleMenu}>About</Link>
          </li>
          <li>
            <Link to="/services" className={isActive("/services") ? "active" : ""} onClick={toggleMenu}>Services</Link>
          </li>
          <li>
            <Link to="/portfolio" className={isActive("/portfolio") ? "active" : ""} onClick={toggleMenu}>Businesses</Link>
          </li>
          <li>
            <Link to="/industries" className={isActive("/industries") ? "active" : ""} onClick={toggleMenu}>Industries</Link>
          </li>
          <li>
            <Link to="/blog" className={isActive("/blog") ? "active" : ""} onClick={toggleMenu}>News</Link>
          </li>
          <li>
            <Link to="/careers" className={isActive("/careers") ? "active" : ""} onClick={toggleMenu}>Careers</Link>
          </li>
          <li>
            <Link to="/contact" className={isActive("/contact") ? "active" : ""} onClick={toggleMenu}>Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
