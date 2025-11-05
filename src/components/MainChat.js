import React, { useState, useRef, useEffect } from 'react';
import { 
  HiPaperAirplane, 
  HiUser, 
  HiSparkles,
  HiChatBubbleLeftRight,
  HiLightBulb,
  HiXMark
} from 'react-icons/hi2';

const MainChat = ({ activeChat, activeChatTitle, messages, onSendMessage, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample messages - in a real app, this would come from props
  const defaultMessages = [
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ];
  
  const chatMessages = messages || defaultMessages;

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
    <div className="empty-state">
      <div className="empty-state-icon">
        <HiSparkles />
      </div>
      <h3>Start a conversation</h3>
      <p>Ask me anything! I'm here to help with your questions, provide information, or just have a friendly chat.</p>
      
      <div className="suggestion-buttons">
        {[
          "What can you help me with?",
          "Explain a concept to me",
          "Help me write some code",
          "Give me creative ideas"
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
    <div className="message bot">
      <div className="message-avatar">
        <HiSparkles />
      </div>
      <div className="message-content">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-chat">
      {/* Close Button */}
      {onClose && (
        <button className="close-chat-btn" onClick={onClose} aria-label="Close chat">
          <HiXMark />
        </button>
      )}
      
      {/* Chat Header */}
      <div className="chat-header">
        <div>
          <h2 className="chat-title">
            <HiChatBubbleLeftRight style={{ marginRight: '8px' }} />
            {activeChatTitle || 'CSS Grid vs Flexbox'}
          </h2>
          <p style={{ 
            fontSize: '13px', 
            color: 'var(--text-secondary)', 
            margin: '4px 0 0 32px',
            fontWeight: 500
          }}>
            Ready to help with any questions you have
          </p>
        </div>
        <div className="online-status">
          <div className="status-dot"></div>
          Online
        </div>
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {chatMessages.length === 1 && chatMessages[0].type === 'bot' ? (
          <EmptyState />
        ) : (
          <>
            {chatMessages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'user' ? <HiUser /> : <HiSparkles />}
                </div>
                <div className="message-content">
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
            placeholder="Type your message here..."
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
        
        <div className="input-hint">
          <HiLightBulb size={14} />
          Press Enter to send Shift + Enter for new line
        </div>
      </div>
    </div>
  );
};

export default MainChat;