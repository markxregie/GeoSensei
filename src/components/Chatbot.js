import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

import userAvatar from '../images/user.png';
import botAvatar from '../images/bott.png';
import minimizeIcon from '../images/minus.svg';
import sendIcon from '../images/send.svg';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages([...messages, { text: input, sender: 'user', time: timestamp }]);
      setInput('');

      setTimeout(() => {
        const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Hello! How can I assist you today?', sender: 'bot', time: botTimestamp },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbot-container ${isOpen ? '' : 'minimized'}`} onClick={() => !isOpen && toggleChatbot()}>
      {!isOpen && <img src={botAvatar} alt="Bot Avatar" />}
      {isOpen && (
        <div className="chatbot-content">
          <div className="chatbot-header">
            <h3>Geobot</h3>
            <button onClick={toggleChatbot} className="minimize-button">
              <img src={minimizeIcon} alt="Minimize" />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-wrapper ${msg.sender}`}>
                {msg.sender === 'bot' && <img src={botAvatar} alt="Bot" className="avatar" />}
                <div className="message-content">
                  <span className="message-text">{msg.text}</span>
                  <div className="timestamp">{msg.time}</div>
                </div>
                {msg.sender === 'user' && <img src={userAvatar} alt="User" className="avatar" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button onClick={handleSend} className="send-button">
              <img src={sendIcon} alt="Send" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
