import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import TypingPlaceholder from "../../components/TypingPlaceholder";
import "../../styles/ChatBox.css";

const Chatbot = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [localMessages, setLocalMessages] = useState(messages);

  const chatBoxRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  // Sync local messages when props update
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }

    // Stop "thinking..." when bot response arrives
    if (
      messages.length > prevMessagesLength.current &&
      messages[messages.length - 1]?.bot_response
    ) {
      setIsWaiting(false);
      prevMessagesLength.current = messages.length;
    }
  }, [messages]);

  // Initialize speech recognition
  const initializeRecognition = () => {
    const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const instance = new SpeechAPI();
    instance.continuous = true;
    instance.interimResults = true;
    instance.lang = "en-US";

    instance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    instance.onerror = () => {
      console.error("Speech recognition error");
      setIsListening(false);
    };

    instance.onend = () => setIsListening(false);

    return instance;
  };

  const startListening = () => {
    if (!isListening) {
      const instance = initializeRecognition();
      setRecognition(instance);
      setIsListening(true);
      instance.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    stopListening();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      user_message: trimmed,
      bot_response: "",
      timestamp: new Date().toISOString(),
    };

    setInput("");
    setIsWaiting(true);
    setLocalMessages((prev) => [...prev, userMessage]);
    await onSendMessage(trimmed);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-box" ref={chatBoxRef}>
        {localMessages.length === 0 ? (
          <TypingPlaceholder />
        ) : (
          localMessages.map((msg, idx) => (
            <div key={idx} className="chat-message-group">
              <div className="chat-message user">
                <p>{msg.user_message}</p>
              </div>
              {msg.bot_response && (
                <div className="chat-message bot">
                  <p>{msg.bot_response}</p>
                  <small>{new Date(msg.timestamp).toLocaleString()}</small>
                </div>
              )}
            </div>
          ))
        )}
        {isWaiting && (
          <div className="chat-message bot">
            <p><em>SoulSync is thinking...</em></p>
          </div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          rows="2"
        />
        <div className="input-controls">
          <button
            className="btn_heal"
            onClick={handleSendMessage}
            disabled={!input.trim()}
          >
            <AiOutlineSend /> Heal
          </button>
          <button onClick={isListening ? stopListening : startListening}>
            <FaMicrophone
              style={{
                fontSize: "24px",
                color: isListening ? "red" : "black",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
