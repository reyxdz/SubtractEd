import React from 'react';
import './Switch.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <button 
      role="switch" 
      aria-checked={checked} 
      className={`switch ${checked ? 'switch-on' : 'switch-off'}`}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-thumb" />
    </button>
  );
};
