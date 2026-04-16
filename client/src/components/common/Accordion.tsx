import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

interface AccordionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, subtitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="accordion-header-text">
          <h3 className="accordion-title">{title}</h3>
          {subtitle && (
            <div className="accordion-subtitle-wrapper">
              <p className="accordion-subtitle">{subtitle}</p>
            </div>
          )}
        </div>
        <button className="accordion-toggle-btn" aria-label="Toggle accordion">
          <ChevronDown size={24} className="chevron-icon" />
        </button>
      </div>
      <div className="accordion-content-wrapper">
        <div className="accordion-content">
          <div className="accordion-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
