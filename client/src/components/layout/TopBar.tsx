import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../common/Button';
import { SettingsPopover } from '../features/settings/SettingsPopover';
import './TopBar.css';

export const TopBar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="top-bar">
      <div className="logo-placeholder">
        {/* Logo goes here */}
      </div>
      
      <div className="top-bar-actions">
        <Button 
          variant="icon" 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          aria-label="Settings"
        >
          <Settings size={20} />
        </Button>
        {isSettingsOpen && (
          <SettingsPopover onClose={() => setIsSettingsOpen(false)} />
        )}
      </div>
    </header>
  );
};
