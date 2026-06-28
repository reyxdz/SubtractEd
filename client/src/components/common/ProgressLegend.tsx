import React, { useState, useRef, useEffect } from 'react';
import './ProgressLegend.css';

export const ProgressLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="progress-legend-container" ref={containerRef}>
      <button 
        className={`progress-legend-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Progress Legend"
      >
        ?
      </button>
      
      {isOpen && (
        <div className="progress-legend-dropdown">
          <div className="legend-item">
            <span className="legend-icon correct-first">&#10003;</span>
            <span className="legend-label">Correct in first try</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon correct-second">&#10003;</span>
            <span className="legend-label">Correct in second try</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon wrong">&#10007;</span>
            <span className="legend-label">Incorrect</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon unanswered"></span>
            <span className="legend-label">Unanswered</span>
          </div>
        </div>
      )}
    </div>
  );
};
