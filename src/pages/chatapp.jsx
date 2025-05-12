import React, { useState, useEffect } from "react";
import api from "../api";
import Chatbot from "../components/chat/Chatbot";
import Session from "../components/chat/Session";
import "../styles/ChatBox.css";
import Navbar from "../components/Navbar";

const ChatApp = () => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch sessions on mount
  useEffect(() => {
    fetchChatSessions();
  }, []);

  // Fetch all chat sessions
  const fetchChatSessions = async () => {
    try {
      const response = await api.get("/api/chat/sessions/");
      // console(response.data);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // Create a new session
  const createChatSession = async () => {
    if (!sessionName.trim()) return;
    try {
      const response = await api.post("/api/chat/sessions/", {
        session_name: sessionName,
      });
      setSessions((prev) => [...prev, response.data]);
      setSessionName("");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  const deletesession= async (session_name) => {
    try {
      // const response = await api.delete(`/api/chat/sessions/${sessionId}`);
      const response = await api.delete(`/api/chat/sessions/${session_name}/delete/`);

      console.log(response.data);
      fetchChatSessions();
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  }

  // Fetch messages for a session
  const fetchMessages = async (sessionId) => {
    // if (!sessionId) return;
    try {
      const response = await api.get(`/api/chat/sessions/${sessionId}/messages/`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send a user message
  const handleSendMessage = async (message) => {
    if (!message.trim() || !activeSessionId) return;

    setLoading(true);
    try {
      const response = await api.post(
        `/api/chat/sessions/${activeSessionId}/messages/`,
        { message }
      );

      // Append the new user and bot messages
      setMessages((prev) => [
        ...prev,
        { user_message: message, bot_response: response.data.response, timestamp: Date.now() },
        
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-app">
      <Navbar />
      
    <div className="chat-container">
     <div className="session">
        <Session
        sessionName={sessionName}
        setSessionName={setSessionName}
        createChatSession={createChatSession}
        sessions={sessions}
        activeSessionId={activeSessionId}
        setActiveSessionId={setActiveSessionId}
        fetchMessages={fetchMessages}
        deletesession={deletesession}
      />
      </div>
      {/* Chatbot component */}
      <div className="chat-box">
        <Chatbot messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
    </div>

  );
};

export default ChatApp;
