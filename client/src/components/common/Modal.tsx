import React, { useEffect, useState } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  type?: 'success' | 'error' | 'info';
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, type = 'info', children, actions }) => {
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setRender(false);
    }
  };

  if (!render) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'open' : 'closed'}`} 
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div 
        className={`modal-content modal-${type}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-icon-container">
            {type === 'success' && <span className="modal-icon">✅</span>}
            {type === 'error' && <span className="modal-icon">❌</span>}
            {type === 'info' && <span className="modal-icon">ℹ️</span>}
          </div>
          <h2>{title}</h2>
        </div>
        
        <div className="modal-body">
          {children}
        </div>

        {actions && (
          <div className="modal-footer">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
