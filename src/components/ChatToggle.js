import React from 'react';
import { HiChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';

const ChatToggle = ({ isOpen, onToggle }) => {
  return (
    <button 
      className={`chat-toggle ${isOpen ? 'open' : ''}`}
      onClick={onToggle}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {isOpen ? <HiXMark /> : <HiChatBubbleLeftRight />}
    </button>
  );
};

export default ChatToggle;