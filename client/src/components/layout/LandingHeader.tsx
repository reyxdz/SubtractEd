import React from 'react';
import { NavLink } from 'react-router-dom';
import subtractedLogo from '../../assets/subtracted_logo.png';
import textLogo from '../../assets/images/text_logo.png';
import { TopBar } from './TopBar';
import { MAIN_NAV_ITEMS } from './navigation';
import { useNavigationUnlockState } from '../../hooks/useNavigationUnlockState';
import './LandingHeader.css';

export const LandingHeader: React.FC = () => {
  const unlockState = useNavigationUnlockState();

  return (
    <header className="landing-header">
      <div className="landing-brand">
        <img src={subtractedLogo} alt="SubtractEd logo" className="landing-brand-mark" />
        <img src={textLogo} alt="SubtractEd" className="landing-brand-text" />
      </div>

      <nav className="landing-nav" aria-label="Primary">
        {MAIN_NAV_ITEMS.map((item) => {
          const unlocked = unlockState[item.unlockKey];

          if (!unlocked) {
            return (
              <span
                key={item.path}
                className="landing-nav-link is-locked"
                aria-disabled="true"
              >
                {item.label}
              </span>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `landing-nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="landing-header-settings">
        <TopBar />
      </div>
    </header>
  );
};
