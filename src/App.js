import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import { API_BASE } from './config';
// Removed ChatToggle; chat is now a full page always-on experience

function App() {
  // Chat is always visible now; no open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Start with no character selected so user sees selection first
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  // Track sessions per character: { [charId]: [ { id, title, messages: [] } ] }
  const [chatSessions, setChatSessions] = useState({});
  const [currentSessionId, setCurrentSessionId] = useState(null);
  
  // Character data
  const characters = [
    {
      id: 1,
      name: 'Sakura',
      personality: 'Sweet & Cheerful Maid',
      greeting: "Hello Master! ♥ How may I serve you today?",
      image: '/chat1.jpg',
      description: 'A sweet and dedicated maid who always greets you with a warm smile'
    },
    {
      id: 2,
      name: 'Yuki',
      personality: 'Elegant & Graceful Maid',
      greeting: "Good day, Master. It's my pleasure to assist you today.",
      image: '/chat2.jpg',
      description: 'An elegant maid with refined manners and impeccable service'
    }
  ];

  // Helper: get sessions array for current character
  const getSessionsForCharacter = (charId) => chatSessions[charId] || [];
  const getCurrentSession = () => {
    if (!selectedCharacter) return null;
    return getSessionsForCharacter(selectedCharacter).find(s => s.id === currentSessionId) || null;
  };

  // No chat toggle anymore

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openSidebar = () => setIsSidebarOpen(true);

  const handleSelectCharacter = (characterId) => {
    // Initialize dummy sessions if first time selecting this character
    const char = characters.find(c => c.id === characterId);
    const baseTime = Date.now();
    const dummy = [
      {
        id: baseTime,
        title: `Getting to know ${char.name}`,
        messages: [
          { id: baseTime + 1, type: 'character', content: char.greeting, timestamp: new Date().toISOString() },
          { id: baseTime + 2, type: 'user', content: `Hello ${char.name}!`, timestamp: new Date().toISOString() },
          { id: baseTime + 3, type: 'character', content: `It's lovely to chat with you, Master. Ask me anything!`, timestamp: new Date().toISOString() }
        ]
      },
      {
        id: baseTime + 10,
        title: `Casual talk with ${char.name}`,
        messages: [
          { id: baseTime + 11, type: 'character', content: `We can talk about hobbies or your day.`, timestamp: new Date().toISOString() }
        ]
      }
    ];

    setChatSessions(prev => {
      if (prev[characterId]) return prev; // already have sessions
      return { ...prev, [characterId]: dummy };
    });
    setSelectedCharacter(characterId);
    // Select first session by default (dummy[0] if newly created)
    setCurrentSessionId(prev => (chatSessions[characterId]?.[0]?.id) || dummy[0].id);
  // Chat is always open; no toggle
    // Close sidebar on mobile after selecting character
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleReturnToCharacterSelection = () => {
    setSelectedCharacter(null);
    setCurrentSessionId(null);
  };

  const handleStartNewSession = () => {
    if (!selectedCharacter) return;
    const char = characters.find(c => c.id === selectedCharacter);
    const newId = Date.now();
    const newSession = {
      id: newId,
      title: `New chat with ${char.name}`,
      // Start completely empty so the user can begin the conversation
      messages: []
    };
    setChatSessions(prev => {
      const sessions = prev[selectedCharacter] || [];
      return {
        ...prev,
        [selectedCharacter]: [...sessions, newSession]
      };
    });
    setCurrentSessionId(newId);
  };

  const handleSendMessage = async (content) => {
    if (!selectedCharacter) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };

    // Append to current session
    setChatSessions(prev => {
      const sessions = prev[selectedCharacter] || [];
      const updated = sessions.map(s =>
        s.id === currentSessionId ? { ...s, messages: [...s.messages, userMessage] } : s
      );
      return { ...prev, [selectedCharacter]: updated };
    });

    // Call ChatGPT API
    try {
      const currentCharacter = getCurrentCharacter();
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for session management
        body: JSON.stringify({
          message: content,
          characterContext: {
            name: currentCharacter.name,
            personality: currentCharacter.personality,
            greeting: currentCharacter.greeting
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      
      const characterResponse = {
        id: Date.now() + 1,
        type: 'character',
        content: data.ai, // Use actual AI response
        timestamp: data.timestamp
      };
      
      setChatSessions(prev => {
        const sessions = prev[selectedCharacter] || [];
        const updated = sessions.map(s =>
          s.id === currentSessionId ? { ...s, messages: [...s.messages, characterResponse] } : s
        );
        return { ...prev, [selectedCharacter]: updated };
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'character',
        content: "I apologize, Master. I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString()
      };
      
      setChatSessions(prev => {
        const sessions = prev[selectedCharacter] || [];
        const updated = sessions.map(s =>
          s.id === currentSessionId ? { ...s, messages: [...s.messages, errorMessage] } : s
        );
        return { ...prev, [selectedCharacter]: updated };
      });
    }
  };

  // Get current character
  const getCurrentCharacter = () => {
    if (selectedCharacter == null) return null;
    return characters.find(char => char.id === selectedCharacter) || null;
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

  return (
    <div className="App">
  {/* Main Chat Interface - always visible */}
  <div className={"chatbot-container"}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          characters={characters}
          selectedCharacter={selectedCharacter}
          sessions={selectedCharacter ? getSessionsForCharacter(selectedCharacter) : []}
          currentSessionId={currentSessionId}
          onSelectCharacter={handleSelectCharacter}
          onReturn={handleReturnToCharacterSelection}
          onSelectSession={id => setCurrentSessionId(id)}
          onNewSession={handleStartNewSession}
        />
        <MainChat
          selectedCharacter={getCurrentCharacter()}
          characterMessages={getCurrentSession() ? getCurrentSession().messages : []}
          onSendMessage={handleSendMessage}
          onOpenSidebar={openSidebar}
          // no close button
        />
      </div>

      {/* Chat toggle removed */}

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
  );
}

export default App;
