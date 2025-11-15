import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  HiPaperAirplane,
  HiXMark,
  HiBars3
} from 'react-icons/hi2';

const MainChat = ({ selectedCharacter, characterMessages, onSendMessage, onClose, onOpenSidebar }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const character = selectedCharacter || {
    id: 1,
    name: 'Sakura',
    personality: 'Sweet and cheerful',
    greeting: "Hello Master! ♥ How may I serve you today?",
    image: '/chat1.jpg'
  };
  
  const chatMessages = useMemo(() => characterMessages || [], [characterMessages]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Call the parent's send message handler
      if (onSendMessage) {
        onSendMessage(inputValue.trim());
      }
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const EmptyState = () => (
    <div className="empty-state-character">
      
      <div className="suggestion-buttons">
        {[
          `Tell me about yourself, ${character.name}`,
          "What do you like to do?",
          "How are you feeling today?",
          "Let's have a chat!"
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setInputValue(suggestion)}
            className="suggestion-btn"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="message character">
      <div className="message-avatar character-avatar-small">
        <img src={character.image} alt={character.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      </div>
      <div className="message-content character-message">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );

  const chatStarted = (selectedCharacter && (chatMessages?.length || 0) > 0);
  return (
    <div className={`main-chat ${chatStarted ? 'chat-started' : 'chat-intro'}`} data-character={character.id}>
      {/* Shared Background for all characters */}
      <div 
        className="character-background"
        style={{
          backgroundImage: `url(/bg6.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="character-overlay" />
      
      {/* Close Button */}
      {onClose && (
        <button className="close-chat-btn" onClick={onClose} aria-label="Close chat">
          <HiXMark />
        </button>
      )}
      
      {/* Chat Header */}
      <div className="chat-header">
        {/* Mobile menu button to open sidebar */}
        <button
          className="header-mobile-menu"
          aria-label="Open character list"
          onClick={() => onOpenSidebar && onOpenSidebar()}
        >
          <HiBars3 size={20} />
        </button>
        <div className="character-header-content">
          <div 
            className="character-avatar-header"
            style={{
              backgroundImage: `url(${character.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
          </div>
          <div>
            <h2 className="chat-title">
              {character.name}
            </h2>
            <p className="character-subtitle">
              {character.personality}
            </p>
          </div>
        </div>
        <div className="online-status">
          <div className="status-dot"></div>
          Online
        </div>
      </div>

      {/* Messages Area */}
  <div className={`chat-messages ${chatStarted ? 'chat-active-bg' : ''}`}>
        {chatMessages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {chatMessages.map((message) => (
              <div key={message.id} className={`message ${message.type === 'user' ? 'user' : 'character'}`}>
                <div className={`message-avatar ${message.type === 'character' ? 'character-avatar-small' : 'user-avatar-small'}`}>
                  {message.type === 'user' ? '👤' : (
                    <img src={character.image} alt={character.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  )}
                </div>
                <div className={`message-content ${message.type === 'user' ? 'user-message' : 'character-message'}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder={`Message ${character.name}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{
              minHeight: '48px',
              maxHeight: '120px',
              resize: 'none',
              overflow: 'hidden'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <HiPaperAirplane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChat;