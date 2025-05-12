import React from "react";
import { FaTrash } from "react-icons/fa";
import "../../styles/SessionsBox.css";

const Session = ({
  sessionName,
  setSessionName,
  createChatSession,
  deletesession,
  sessions,
  activeSessionId,
  setActiveSessionId,
  fetchMessages,
}) => {
  return (
    <div className="sessions">
      <input
      style={{color: "black" }}
        type="text"
        placeholder="New session name"
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
      />
      <button className="create_session_btn" onClick={createChatSession}>Create Session</button>
      <div>
        <h3>Active Sessions</h3>
      </div>      
      {sessions.length === 0 ? (
        <p>No active sessions</p>
      ) : (
        sessions.map((session) => {
          const formattedDate = new Date(session.created_at).toLocaleString();
          return (
            <div className="session_bar" key={session.id}>
            <button 
              onClick={() => {
                setActiveSessionId(session.id);
                fetchMessages(session.id);
              }}
              className={`session_title_btn ${activeSessionId === session.id ? "active" : ""}`}
            >
              {session.session_name}
            </button>
              <button className="session_delete_btn"
                onClick={() => {
                  const isConfirmed = window.confirm(
                    `Delete session "${session.session_name}"?`
                  );
                  if (isConfirmed) {
                    deletesession(session.session_name);
                  }
                }}
              >
                <FaTrash />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Session;