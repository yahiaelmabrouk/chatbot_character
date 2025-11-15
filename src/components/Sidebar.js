import React from 'react';
import { HiBars3, HiChevronLeft, HiPlus, HiChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';

const Sidebar = ({
  isOpen,
  onToggle,
  characters,
  selectedCharacter,
  onSelectCharacter,
  sessions = [],
  currentSessionId,
  onReturn,
  onSelectSession,
  onNewSession
}) => {
  const selected = characters?.find(c => c.id === selectedCharacter);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!selected ? (
          <div className="sidebar-title">
            <span className="sidebar-title-main">Choose Your Character</span>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>
              Select a maid to chat with
            </span>
          </div>
        ) : (
          <div className="sidebar-title" style={{ alignItems: 'flex-start' }}>
            <button
              onClick={onReturn}
              aria-label="Return to character list"
              style={{
                border: 'none',
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '10px',
                padding: '8px 10px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <HiChevronLeft />
            </button>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div
                className="character-card-image"
                style={{ 
                  width: 48, 
                  height: 48, 
                  backgroundImage: `url(${selected.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <span className="sidebar-title-main">{selected.name}</span>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{selected.personality}</div>
              </div>
            </div>
          </div>
        )}
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
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <HiXMark size={20} /> : <HiBars3 size={20} />}
        </button>
      </div>

      {/* Body */}
      {!selected ? (
        <div className="character-list">
          <div className="recent-chats-label">Available Characters</div>
          {characters && characters.map((character) => (
            <div 
              key={character.id}
              className={`character-card ${selectedCharacter === character.id ? 'active' : ''}`}
              onClick={() => onSelectCharacter && onSelectCharacter(character.id)}
            >
              <div 
                className="character-card-image"
                style={{
                  backgroundImage: `url(${character.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="character-card-info">
                <h4 className="character-card-name">{character.name}</h4>
                <p className="character-card-personality">{character.personality}</p>
                <p className="character-card-description">{character.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-history">
          <button
            className="new-chat-btn"
            onClick={onNewSession}
          >
            <HiPlus /> New Chat
          </button>
          <div className="recent-chats-label">Previous Chats</div>
          {sessions.length === 0 ? (
            <div style={{ color: 'var(--text-tertiary)', fontSize: 13, padding: '12px 16px' }}>
              No chats yet. Start a new conversation.
            </div>
          ) : (
            sessions.map(s => (
              <div
                key={s.id}
                className={`chat-item ${currentSessionId === s.id ? 'active' : ''}`}
                onClick={() => onSelectSession && onSelectSession(s.id)}
              >
                <div className="chat-item-icon"><HiChatBubbleLeftRight /></div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{(s.messages?.[s.messages.length-1]?.content || '').slice(0, 40)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sidebar Footer removed - no theme toggle */}
    </div>
  );
};

export default Sidebar;