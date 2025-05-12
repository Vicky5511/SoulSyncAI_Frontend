import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/SoulSync Logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedInUserName = localStorage.getItem("username") || "Guest";

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="custom-navbar-wrapper">
      
        <div className="custom-navbar-left" onClick={() => navigate("/#")} style={{ cursor: "pointer" }}>
             <img src={logo} alt="SoulSync Logo" className="custom-navbar-logo" />
        </div>
        <div className="custom-navbar-toggle" onClick={toggleMenu}>
          ☰
        </div>

        <div className={`custom-navbar-center ${menuOpen ? "show" : ""}`}>
          <ul className="custom-navbar-links">
            <li onClick={() => navigate("/chatbot")}>My Therapist</li>
            <li onClick={() => navigate("/perosnaldiary")}>My Journal</li>
            <li onClick={() => navigate("/community")}>Support Circle</li>
            <li onClick={() => navigate("/recommendation")}>Recommendation</li>
            <li onClick={() => navigate("/profile")}>My Space</li>

          </ul>
        </div>

        <div className="custom-navbar-right">
          <span className="custom-navbar-user">Welcome, {loggedInUserName}</span>
          <button className="custom-navbar-logout-btn" onClick={Logout}>Logout</button>
        </div>      
    </header>
  );
}

export default Navbar;
