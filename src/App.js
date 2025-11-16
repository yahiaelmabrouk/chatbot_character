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
  // Default selected character is Sakura (id:1)
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  // Track the last active character so when user returns to selection
  // they can see which character they're currently working with
  const [activeCharacter, setActiveCharacter] = useState(1);
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
    // When returning to the character list, keep using the last active character
    const id = selectedCharacter ?? activeCharacter;
    if (!id) return null;
    return getSessionsForCharacter(id).find(s => s.id === currentSessionId) || null;
  };

  // No chat toggle anymore

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
    // remember this as the active character
    setActiveCharacter(characterId);
    // Select first session by default (dummy[0] if newly created)
    setCurrentSessionId(prev => (chatSessions[characterId]?.[0]?.id) || dummy[0].id);
  // Chat is always open; no toggle
    // Close sidebar on mobile after selecting character
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  // Initialize sessions for default selected character (Sakura) on first load
  useEffect(() => {
    const initForSelected = async () => {
      if (!selectedCharacter) return;
      if (chatSessions[selectedCharacter]) return; // already initialized

      const char = characters.find(c => c.id === selectedCharacter);
      if (!char) return;

      // Create a fresh, empty chat session for the default selected character
      const newId = Date.now();
      const newSession = {
        id: newId,
        title: `New chat with ${char.name}`,
        messages: []
      };

      // Also include previous dummy sessions so the "Previous Chats" list is populated
      const baseTime = newId + 1000;
      const dummyOlder = [
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

      setChatSessions(prev => ({ ...prev, [selectedCharacter]: [newSession, ...dummyOlder] }));
      setCurrentSessionId(prev => prev || newId);
    };

    initForSelected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacter]);

  const handleReturnToCharacterSelection = () => {
    // Return to character list but keep active character/session so chat persists
    setSelectedCharacter(null);
  };

  const handleStartNewSession = () => {
    const targetId = selectedCharacter ?? activeCharacter;
    if (!targetId) return;
    const char = characters.find(c => c.id === targetId);
    const newId = Date.now();
    const newSession = {
      id: newId,
      title: `New chat with ${char.name}`,
      // Start completely empty so the user can begin the conversation
      messages: []
    };
    setChatSessions(prev => {
      const sessions = prev[targetId] || [];
      return {
        ...prev,
        [targetId]: [...sessions, newSession]
      };
    });
    setCurrentSessionId(newId);
    // On mobile, jump straight into the chat view
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSendMessage = async (content) => {
    // Support sending while viewing the character list by using last active
    const targetCharId = selectedCharacter ?? activeCharacter;
    if (!targetCharId) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };

    // Append to current session
    setChatSessions(prev => {
      const sessions = prev[targetCharId] || [];
      let sessionIdToUse = currentSessionId;
      let updatedSessions = sessions;
      if (!sessionIdToUse) {
        // Create a new session on the fly if none is active
        const char = characters.find(c => c.id === targetCharId);
        sessionIdToUse = Date.now();
        updatedSessions = [
          ...sessions,
          { id: sessionIdToUse, title: `New chat with ${char?.name || 'Character'}`, messages: [] }
        ];
        setCurrentSessionId(sessionIdToUse);
      }
      const updated = updatedSessions.map(s =>
        s.id === sessionIdToUse ? { ...s, messages: [...s.messages, userMessage] } : s
      );
      return { ...prev, [targetCharId]: updated };
    });

    // Call ChatGPT API
    try {
      const currentCharacter = characters.find(c => c.id === targetCharId);
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
        const sessions = prev[targetCharId] || [];
        const updated = sessions.map(s =>
          s.id === currentSessionId ? { ...s, messages: [...s.messages, characterResponse] } : s
        );
        return { ...prev, [targetCharId]: updated };
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
        const sessions = prev[targetCharId] || [];
        const updated = sessions.map(s =>
          s.id === currentSessionId ? { ...s, messages: [...s.messages, errorMessage] } : s
        );
        return { ...prev, [targetCharId]: updated };
      });
    }
  };

  // Get current character
  const getCurrentCharacter = () => {
    const id = selectedCharacter ?? activeCharacter;
    if (id == null) return null;
    return characters.find(char => char.id === id) || null;
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

  // On mobile, keep the sidebar open when no character is selected
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setIsSidebarOpen(selectedCharacter == null);
    }
  }, [selectedCharacter]);

  return (
    <div className="App">
  {/* Main Chat Interface - always visible */}
  <div className={"chatbot-container"}>
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          characters={characters}
          selectedCharacter={selectedCharacter}
          activeCharacter={activeCharacter}
          sessions={selectedCharacter ? getSessionsForCharacter(selectedCharacter) : []}
          currentSessionId={currentSessionId}
          onSelectCharacter={handleSelectCharacter}
          onReturn={handleReturnToCharacterSelection}
          onSelectSession={id => {
            setCurrentSessionId(id);
            // On mobile, close sidebar when opening an existing chat
            if (typeof window !== 'undefined' && window.innerWidth <= 768) {
              setIsSidebarOpen(false);
            }
          }}
          onNewSession={handleStartNewSession}
        />
        <MainChat
          selectedCharacter={getCurrentCharacter() || characters.find(c => c.id === activeCharacter)}
          characterMessages={getCurrentSession() ? getCurrentSession().messages : []}
          onSendMessage={handleSendMessage}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          // no close button
        />
      </div>

      {/* Chat toggle removed */}

      {/* Mobile Sidebar Overlay removed to keep character list clear */}
    </div>
  );
}

export default App;
