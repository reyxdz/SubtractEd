import React from 'react';
import './MainLayout.css';
import { TopBar } from './TopBar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="banig-bg"></div>
      
      <div className="app-window">
        <TopBar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
