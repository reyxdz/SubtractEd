import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Switch } from '../../common/Switch';
import { musicManager } from '../../../utils/music';
import './SettingsPopover.css';

interface SettingsPopoverProps {
  onClose: () => void;
}

type ThemeColor = 'blue' | 'green' | 'red';

export const SettingsPopover: React.FC<SettingsPopoverProps> = ({ onClose }) => {
  const [musicEnabled, setMusicEnabled] = useState(!musicManager.getIsMuted());
  const [activeTheme, setActiveTheme] = useState<ThemeColor>('blue');

  // Initialize theme from document data attribute
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') as ThemeColor;
    if (currentTheme) {
      setActiveTheme(currentTheme);
    }
  }, []);

  const handleThemeChange = (color: ThemeColor) => {
    setActiveTheme(color);
    if (color === 'blue') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', color);
    }
  };

  return (
    <div className="settings-popover glass">
      <div className="settings-header">
        <h3>Settings</h3>
        <button className="close-btn" onClick={onClose} aria-label="Close Settings">
          <X size={16} />
        </button>
      </div>

      <div className="settings-section">
        <span className="settings-label">Music</span>
        <Switch 
          checked={musicEnabled} 
          onChange={(enabled) => {
            setMusicEnabled(enabled);
            musicManager.toggleMute(!enabled);
          }} 
        />
      </div>

      <div className="settings-section theme-section">
        <span className="settings-label">Theme Color</span>
        <div className="theme-options">
          <button 
            className={`theme-btn theme-red ${activeTheme === 'red' ? 'active' : ''}`}
            onClick={() => handleThemeChange('red')}
            aria-label="Red Theme"
          >
            {activeTheme === 'red' && <Check size={14} color="white" />}
          </button>
          <button 
            className={`theme-btn theme-green ${activeTheme === 'green' ? 'active' : ''}`}
            onClick={() => handleThemeChange('green')}
            aria-label="Green Theme"
          >
            {activeTheme === 'green' && <Check size={14} color="white" />}
          </button>
          <button 
            className={`theme-btn theme-blue ${activeTheme === 'blue' ? 'active' : ''}`}
            onClick={() => handleThemeChange('blue')}
            aria-label="Blue Theme"
          >
            {activeTheme === 'blue' && <Check size={14} color="white" />}
          </button>
        </div>
      </div>
    </div>
  );
};
