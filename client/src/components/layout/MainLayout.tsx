import React from 'react';
import { LandingHeader } from './LandingHeader';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="main-content">
        <div className="main-layout-header">
          <LandingHeader />
        </div>
        <main className="main-layout-body">{children}</main>
      </div>
    </div>
  );
};
