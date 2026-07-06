import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UserGuideModal } from '../components/features/guide/UserGuideModal';
import { hasDismissedGuide, setGuideDismissed } from '../utils/userGuide';

interface UserGuideContextValue {
  /** Open the "How to Use SubtractEd" guide. */
  openGuide: () => void;
}

const UserGuideContext = createContext<UserGuideContextValue | null>(null);

export const UserGuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-show the guide for first-time users (unless previously dismissed).
  useEffect(() => {
    if (!hasDismissedGuide()) {
      setIsOpen(true);
    }
  }, []);

  const openGuide = useCallback(() => setIsOpen(true), []);

  const handleClose = useCallback((doNotRemind: boolean) => {
    if (doNotRemind) {
      setGuideDismissed(true);
    }
    setIsOpen(false);
  }, []);

  return (
    <UserGuideContext.Provider value={{ openGuide }}>
      {children}
      <UserGuideModal isOpen={isOpen} onClose={handleClose} />
    </UserGuideContext.Provider>
  );
};

export function useUserGuide(): UserGuideContextValue {
  const context = useContext(UserGuideContext);
  if (!context) {
    throw new Error('useUserGuide must be used within a UserGuideProvider');
  }
  return context;
}
