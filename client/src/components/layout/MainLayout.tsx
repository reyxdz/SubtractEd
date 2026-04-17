import React from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="banig-bg"></div>
      
      <div className="app-window">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
