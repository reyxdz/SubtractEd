import React, { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';
import './InstallAppButton.css';

/**
 * "Install App" button for the home page.
 * - Android/Desktop: triggers native install prompt
 * - iOS: shows a tooltip with manual instructions
 * - Already installed or unsupported: hidden
 */
export const InstallAppButton: React.FC = () => {
  const { canInstall, isIOS, isInstalled, install } = useInstallPrompt();
  const [showIOSTip, setShowIOSTip] = useState(false);

  // Already installed as PWA — don't show anything
  if (isInstalled) return null;

  // Not installable and not iOS — browser doesn't support it
  if (!canInstall && !isIOS) return null;

  const handleClick = async () => {
    if (isIOS) {
      setShowIOSTip((prev) => !prev);
    } else {
      await install();
    }
  };

  return (
    <div className="install-app-wrapper">
      <button className="install-app-btn" onClick={handleClick}>
        <Download size={18} strokeWidth={2.5} />
        Install App for Offline Use
      </button>

      {showIOSTip && (
        <div className="ios-tooltip">
          <button
            className="ios-tooltip__close"
            onClick={() => setShowIOSTip(false)}
            aria-label="Close"
          >
            <X size={14} />
          </button>
          <p className="ios-tooltip__text">
            <strong>To install on iPhone/iPad:</strong>
          </p>
          <ol className="ios-tooltip__steps">
            <li>
              Tap the <Share size={14} className="ios-tooltip__icon" /> <strong>Share</strong> button
            </li>
            <li>
              Scroll down and tap <strong>"Add to Home Screen"</strong>
            </li>
            <li>
              Tap <strong>"Add"</strong> to confirm
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};
