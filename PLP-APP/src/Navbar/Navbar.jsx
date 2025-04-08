// Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { CiUser, CiSearch, CiHeart } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoChevronDown } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

import "./Navbar.css"; 

const Navbar = () => {
  const [navbarOpen, setNavBarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    setShowLogout(false);
    navigate("/login");
  };

  const handleOpenNav = () => {
    setNavBarOpen(!navbarOpen);
  };

  const handleUserClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <header className="navbar-header">
      <header className="navbar-header">
        <div className="nav-tik">
          
          <p className="p-item">Lorem ipsum dolor</p>
          <p className="p-item">Lorem ipsum dolor</p>
          <p className="p-item">Lorem ipsum dolor</p>
        </div>
      </header>

      <div className="navbar-top">
        <div className="navbar-left">
          <span className="hamburger-icon" onClick={handleOpenNav}>
            <RxHamburgerMenu />
          </span>
          <img src={Logo} alt="src={bar}Menu Icon" className="logo-image" />
        </div>

        <div className="navbar-title">
          <h1>LOGO</h1>
        </div>

        <div className="navbar-right">
          <span className="icon">
            <CiSearch />
          </span>
          <span className="icon">
            <CiHeart />
          </span>
          <span className="icon">
            <HiOutlineShoppingBag />
          </span>

          <span className="user-icon" onClick={handleUserClick}>
            <CiUser />
          </span>

          {showLogout && (
            <div className="logout-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

          <div className="lang-dropdown">
            <span>ENG</span>
            <GoChevronDown />
          </div>
        </div>
      </div>

      {navbarOpen && (
        <div className="mobile-menu">
          {["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"].map((link) => (
            <a
              key={link}
              href="#"
              className="mobile-link"
              onClick={() => setNavBarOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      <div className="desktop-menu">
        {["SHOP", "SKILLS", "STORIES", "ABOUT", "CONTACT US"].map((link) => (
          <a key={link} href="#" className="desktop-link">
            {link}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
