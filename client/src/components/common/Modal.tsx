import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  type?: 'success' | 'error' | 'info';
  children: React.ReactNode;
  actions?: React.ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  bodyClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  type = 'info',
  children,
  actions,
  overlayClassName = '',
  contentClassName = '',
  bodyClassName = '',
}) => {
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
      className={`modal-overlay ${isOpen ? 'open' : 'closed'} ${overlayClassName}`.trim()} 
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div 
        className={`modal-content modal-${type} ${contentClassName}`.trim()} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-icon-container">
            {type === 'success' && <CheckCircle className="modal-icon" color="#2e7d32" size={36} />}
            {type === 'error' && <XCircle className="modal-icon" color="#c62828" size={36} />}
            {type === 'info' && <Info className="modal-icon" color="#1976d2" size={36} />}
          </div>
          <h2>{title}</h2>
        </div>
        
        <div className={`modal-body ${bodyClassName}`.trim()}>
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
