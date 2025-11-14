import React from 'react';
import { HiHeart, HiSparkles } from 'react-icons/hi2';

const CharacterSelect = ({ characters = [], onSelect }) => {
  return (
    <div className="character-select-page">
      {/* Reuse chat-style background for visual continuity */}
      <div className="character-select-bg">
        <div
          className="character-background"
          style={{ backgroundImage: `url(/bg6.jpg)` }}
        />
        <div className="character-overlay" />
      </div>

      <div className="character-select-hero">
        <div className="hero-content">
          <div className="hero-pill"> Welcome</div>
          <h1 className="hero-title">Choose Your Maid</h1>
          <p className="hero-subtitle">Pick a companion to start chatting — previous conversations are saved per character.</p>
        </div>
      </div>

      <div className="character-grid-circles" role="list">
        {characters.map((c) => (
          <button
            key={c.id}
            role="listitem"
            className="character-circle"
            onClick={() => onSelect && onSelect(c.id)}
            aria-label={`Choose ${c.name}`}
          >
            <span className="character-circle-media" style={{ backgroundImage: `url(${c.image})` }} />
            <span className="character-circle-ring" aria-hidden="true" />
            <span className="character-circle-shadow" aria-hidden="true" />
            <span className="character-circle-cta" aria-hidden="true">Tap to chat</span>
            <div className="character-circle-meta">
              <div className="character-circle-name">{c.name}</div>
              <div className="character-circle-sub">{c.personality}</div>
              <div className="character-circle-chip"><HiHeart /> Charming</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelect;
