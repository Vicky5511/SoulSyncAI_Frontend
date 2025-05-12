// CtaSection.jsx
import "../../styles/CtaSection.css" // Import the CSS for styling
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { MessageSquare } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-box">
          <div className="cta-content">
            <h2>Ready to Start Your Wellness Journey?</h2>
            <p>
              Take the first step toward better mental health with SoulSync AI. Our compassionate AI is ready to listen,
              support, and guide you.
            </p>
            {/* <a href="#" className="cta-button">
              <MessageSquare className="icon" style={{ height: "20px", width: "20px" }} />
              Talk to the AI Now
            </a> */}

            <div className="cta-button">
              <Link className="icon" style={{ height: "20px",textAlign: "center" }} to="/Chatbot">Talk to SoulSyncAI</Link>
            </div>
            <p className="cta-note">No registration required. Start a conversation instantly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
