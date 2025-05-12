// HeroSection.jsx
import "../../styles/HeroSection.css" // Import the CSS for styling
import { ArrowRight } from "lucide-react"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-text">
                    <h1 className="hero-title">Your AI Companion for Mental Wellness</h1>
                    <p className="hero-subtitle">
                        SoulSync AI is a compassionate chatbot designed to offer therapeutic conversations and support your mental
                        wellbeing journey.
                    </p>
                    <div className="hero-buttons">

                        <button
                            className="cta-button"
                            style={{
                                background: "linear-gradient(to right, #3b82f6, #9333ea)",
                                padding: "1.5rem 2rem",
                                fontSize: "1.125rem",
                                borderRadius: "0.75rem",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            <Link
                                to="/Chatbot"
                                style={{ color: "white", textDecoration: "none" }}
                            >
                                Talk to SoulSyncAI
                            </Link>
                        </button>




                        <button
                            className="cta-button-outline"
                            style={{
                                backgroundColor: "white",
                                color: "#2563eb",
                                border: "1px solid #bfdbfe",
                                padding: "1.5rem 2rem",
                                fontSize: "1.125rem",
                                borderRadius: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "pointer"
                            }}
                        >
                            Learn more <ArrowRight style={{ width: "20px", height: "20px" }} />
                        </button>
                    </div>
                </div>
                <div className="hero-right">
                    <div className="hero-chat-wrapper">
                        <div className="hero-chat-glow"></div>
                        <div className="hero-chat-box">
                            <div className="hero-chat-inner">
                                <div className="hero-chat-header">
                                    <div className="hero-avatar">AI</div>
                                    <div className="hero-chat-info">
                                        <h3>SoulSync AI</h3>
                                        <p>Virtual Therapist</p>
                                    </div>
                                </div>
                                <div className="chat-bubble">
                                    <p>How are you feeling today? I'm here to listen and support you.</p>
                                </div>
                                <div className="chat-bubble user">
                                    <p>I've been feeling a bit overwhelmed lately with work.</p>
                                </div>
                                <div className="chat-bubble">
                                    <p>
                                        I understand. Let's talk about what's causing you to feel overwhelmed and explore some strategies
                                        that might help.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
