import React from 'react';
import { NavLink } from 'react-router-dom';
import subtractedLogo from '../../assets/subtracted_logo.png';
import textLogo from '../../assets/images/text_logo.png';
import { TopBar } from './TopBar';
import { MAIN_NAV_ITEMS } from './navigation';
import './LandingHeader.css';

export const LandingHeader: React.FC = () => {
  return (
    <header className="landing-header">
      <div className="landing-brand">
        <img src={subtractedLogo} alt="SubtractEd logo" className="landing-brand-mark" />
        <img src={textLogo} alt="SubtractEd" className="landing-brand-text" />
      </div>

      <nav className="landing-nav" aria-label="Primary">
        {MAIN_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `landing-nav-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="landing-header-settings">
        <TopBar />
      </div>
    </header>
  );
};
