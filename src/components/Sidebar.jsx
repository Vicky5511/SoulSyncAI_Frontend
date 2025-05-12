import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Sidebars.css";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "community", label: "Community" },
    { name: "chat", label: "Chat" },
    { name: "profile", label: "Profile" },
    { name: "diary", label: "Diary" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`menu-item ${activeComponent === item.name ? "active" : ""}`}
            onClick={() => {
              setActiveComponent(item.name);
              navigate(`/user/${item.name}`); // ✅ Fix: Use `/user/${item.name}`
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
