import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../styles/Home.css'; // Import the CSS for styling
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/SoulSync Logo.png";
import FeaturesSection from "../components/home/FeaturesSection";
import CtaSection from "../components/home/CtaSection";
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import ServiceSection from '../components/home/ServiceSection';
function Home() {

  return (

    <div className="scroll-container">
      <Navbar />
      <section className="hero-section">

        <div className="i">
          <div className="content">
            <h1>
              <img src={logo} alt="SoulSync Logo" className="soulsync-inline-logo" />
              <span className="therapist-text">Your silent companion for emotional healing and mental clarity.</span>
            </h1>
            <div className="buttons">
              <Link className="talk-btn" to="/Chatbot">Talk to SoulSyncAI</Link>
              <a href="#" className="partner-link">Partner with us →</a>
            </div>
          </div>
          <div className="image">
            <div className="chat-boxes">
              <div className="chat user-message">
                <div className="icon user-icon">👤</div>
                <p>
                  I'm so overwhelmed trying to get everything done, and every new task feels like a punishment. I no longer have any motivation.
                </p>
              </div>
              <div className="chat ai-message">
                <div className="icon ai-icon">🔵</div>
                <p>
                  I am sorry you are going through this. Ideally, work should give you energy, not take it away. Can you think of the last time you actually enjoyed your work? What were you working on then?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      
      
      <FeaturesSection />
      <HowItWorksSection />
      <ServiceSection />
      <CtaSection />
     
      <section><Footer /></section>

    </div>
  );
}

export default Home;
