import React from 'react';
import { 
  HiPlus, 
  HiChatBubbleLeftRight, 
  HiSun, 
  HiMoon,
  HiSparkles,
  HiClock,
  HiBars3
} from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({ isOpen, onToggle, onNewChat, chats, activeChat, onSelectChat }) => {
  const { isDark, toggleTheme } = useTheme();

  // Sample chat data - in a real app, this would come from props or state
  const chatHistory = chats || [
    { id: 1, title: "React development tips", lastMessage: "Tell me about React hooks", timestamp: "2 hours ago" },
    { id: 2, title: "CSS Grid vs Flexbox", lastMessage: "What's the difference between...", timestamp: "1 day ago" },
    { id: 3, title: "JavaScript best practices", lastMessage: "How to write clean code", timestamp: "3 days ago" },
    { id: 4, title: "API integration help", lastMessage: "How to handle async requests", timestamp: "1 week ago" },
    { id: 5, title: "Design system creation", lastMessage: "Building reusable components", timestamp: "2 weeks ago" },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <HiSparkles />
          Chat with your character
        </div>
        <button 
          className="mobile-toggle"
          onClick={onToggle}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            cursor: 'pointer',
            display: 'none' 
          }}
        >
          <HiBars3 size={20} />
        </button>
      </div>

      {/* New Chat Button */}
      <button className="new-chat-btn" onClick={onNewChat}>
        <HiPlus size={16} />
        New Chat
      </button>

      {/* Chat History */}
      <div className="chat-history">
        <div style={{ 
          fontSize: '12px', 
          fontWeight: '600', 
          color: 'var(--text-tertiary)', 
          padding: '8px 12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Recent Chats
        </div>
        
        {chatHistory.map((chat) => (
          <div 
            key={chat.id}
            className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => onSelectChat && onSelectChat(chat.id)}
          >
            <HiChatBubbleLeftRight size={16} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ 
                fontWeight: '500',
                marginBottom: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {chat.title}
              </div>
              <div style={{ 
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {chat.lastMessage}
              </div>
            </div>
            <div style={{ 
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <HiClock size={12} />
              {chat.timestamp}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? <HiSun size={16} /> : <HiMoon size={16} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;