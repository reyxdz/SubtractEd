import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  return (
    <button className={`btn btn-${variant} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};
