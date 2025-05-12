import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Community from "./Community";
import Chat from "./chatapp";
import Profile from "./ProfileComponent";
import Diary from "./Diary";
import "../styles/main.css";

function Main() {
    const [activeComponent, setActiveComponent] = useState("community");
  
    return (
      <div className="app-container">
        <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        <div className="main-content">
          <Routes>
            <Route path="community" element={<Community />} />
            <Route path="chat" element={<Chat />} />
            <Route path="profile" element={<Profile />} />
            <Route path="diary" element={<Diary />} />
            <Route path="*" element={<Navigate to="/user/community" />} /> {/* Default to community */}
          </Routes>
        </div>
      </div>
    );
  }
  
  export default Main;
  
