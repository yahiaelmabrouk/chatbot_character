import React from 'react';
import { 
  HiPlus, 
  HiChatBubbleLeftRight, 
  HiSun, 
  HiMoon,
  HiClock,
  HiBars3,
  HiBell
} from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ isOpen, onToggle, onNewChat, chats, activeChat, onSelectChat }) => {
  const { isDark, toggleTheme } = useTheme();

  // Sample chat data - in a real app, this would come from props or state
  const chatHistory = chats || [
    { id: 1, title: "Welcome Chat", lastMessage: "Hello! I'm your AI assistant...", timestamp: "now" },
    { id: 2, title: "React developmen...", lastMessage: "Tell me about React hooks", timestamp: "2h" },
    { id: 3, title: "JavaScript best pr...", lastMessage: "How to write clean code", timestamp: "1d" },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header with Character Avatar */}
      <div className="sidebar-header">
        <div className="character-avatar">
          <img 
            src="/character-avatar.svg" 
            alt="Character Avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="sidebar-title">
          <span className="sidebar-title-main">Chat with your character</span>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
            Ready to help with any questions you have
          </span>
        </div>
        <button 
          className="mobile-toggle"
          onClick={onToggle}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer',
            display: 'none',
            position: 'absolute',
            right: '16px',
            top: '16px'
          }}
        >
          <HiBars3 size={20} />
        </button>
      </div>

      {/* New Chat Button */}
      <button className="new-chat-btn" onClick={onNewChat}>
        <HiPlus size={18} />
        New Chat
      </button>

      {/* Chat History */}
      <div className="chat-history">
        <div className="recent-chats-label">
          Recent Chats
        </div>
        
        {chatHistory.map((chat) => (
          <div 
            key={chat.id}
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => onSelectChat && onSelectChat(chat.id)}
          >
            <div className="chat-item-icon">
              <HiChatBubbleLeftRight />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontWeight: '600',
                marginBottom: '4px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: '13px'
              }}>
                {chat.title}
              </div>
              <div style={{ 
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <HiClock size={11} />
                {chat.timestamp}
              </div>
            </div>
            {chat.id === 2 && (
              <div style={{
                background: 'var(--bg-accent)',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '700'
              }}>
                <HiBell size={12} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
          {isDark ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

export default Sidebar;