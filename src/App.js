import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import ChatToggle from './components/ChatToggle';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date().toISOString()
    }
  ]);

  // Sample chat data
  const [chats, setChats] = useState([
    { id: 1, title: "Welcome Chat", lastMessage: "Hello! I'm your AI assistant...", timestamp: "now" },
    { id: 2, title: "React development tips", lastMessage: "Tell me about React hooks", timestamp: "2 hours ago" },
    { id: 3, title: "CSS Grid vs Flexbox", lastMessage: "What's the difference between...", timestamp: "1 day ago" },
    { id: 4, title: "JavaScript best practices", lastMessage: "How to write clean code", timestamp: "3 days ago" },
    { id: 5, title: "API integration help", lastMessage: "How to handle async requests", timestamp: "1 week ago" },
  ]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    // Close sidebar when closing chat on mobile
    if (isChatOpen) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    const newChatId = Math.max(...chats.map(c => c.id)) + 1;
    const newChat = {
      id: newChatId,
      title: "New Chat",
      lastMessage: "Hello! I'm your AI assistant...",
      timestamp: "now"
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChatId);
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date().toISOString()
      }
    ]);
    // Close sidebar on mobile after creating new chat
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
    // Load messages for selected chat (in real app, this would fetch from API)
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date().toISOString()
      }
    ]);
    // Close sidebar on mobile after selecting chat
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  // Get current chat title
  const getCurrentChatTitle = () => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    return currentChat ? currentChat.title : 'AI Assistant';
  };

  const handleSendMessage = (content) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Update chat title if this is the first user message in a "New Chat"
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (currentChat && currentChat.title === "New Chat" && messages.length <= 1) {
      const newTitle = generateChatTitle(content);
      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, title: newTitle, lastMessage: content }
          : chat
      ));
    }
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(content),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  // Generate a title from the user's first message
  const generateChatTitle = (message) => {
    // Simple title generation - in a real app, this could use AI
    const words = message.toLowerCase().split(' ');
    if (words.length <= 4) {
      return message.charAt(0).toUpperCase() + message.slice(1);
    }
    
    // Take first 4 words and capitalize
    const titleWords = words.slice(0, 4);
    return titleWords.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') + '...';
  };

  // Simple bot response generator (in real app, this would be AI API call)
  const getBotResponse = (userMessage) => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand what you're asking. Here's what I think...",
      "Thanks for sharing that with me. Let me provide some insights.",
      "That's interesting! Based on what you've told me...",
      "I'd be happy to help you with that. Here's my suggestion...",
      "Great point! Let me break this down for you.",
      "I can definitely assist with that. Here's what I recommend...",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('react')) {
      return "React is a fantastic library! " + randomResponse + " React's component-based architecture makes it great for building interactive UIs.";
    }
    if (userMessage.toLowerCase().includes('css')) {
      return "CSS is so powerful for styling! " + randomResponse + " Modern CSS has amazing features like Grid, Flexbox, and custom properties.";
    }
    if (userMessage.toLowerCase().includes('javascript')) {
      return "JavaScript is the language of the web! " + randomResponse + " It's constantly evolving with new features and best practices.";
    }
    
    return randomResponse + " Feel free to ask me anything else you'd like to know!";
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add mobile CSS for responsive sidebar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .sidebar {
          position: fixed !important;
          left: 0 !important;
          top: 0 !important;
          height: 100vh !important;
          z-index: 1000 !important;
          transform: translateX(-100%) !important;
          transition: transform 0.3s ease !important;
        }
        
        .sidebar.open {
          transform: translateX(0) !important;
        }
        
        .mobile-toggle {
          display: block !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        {/* Main Chat Interface */}
        <div className={`chatbot-container ${!isChatOpen ? 'hidden' : ''}`}>
          <Sidebar
            isOpen={isSidebarOpen}
            onToggle={toggleSidebar}
            onNewChat={handleNewChat}
            chats={chats}
            activeChat={activeChat}
            onSelectChat={handleSelectChat}
          />
          <MainChat
            activeChat={activeChat}
            activeChatTitle={getCurrentChatTitle()}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Floating Chat Toggle Button */}
        <ChatToggle isOpen={isChatOpen} onToggle={toggleChat} />

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              display: window.innerWidth <= 768 ? 'block' : 'none'
            }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
