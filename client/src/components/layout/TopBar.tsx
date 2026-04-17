import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { SettingsPopover } from '../features/settings/SettingsPopover';
import './TopBar.css';

export const TopBar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="top-bar-actions">
      <button 
        className="settings-icon-btn glass"
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        aria-label="Settings"
      >
        <Settings size={28} strokeWidth={2.5} color="currentColor" />
      </button>
      {isSettingsOpen && (
        <SettingsPopover onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};
