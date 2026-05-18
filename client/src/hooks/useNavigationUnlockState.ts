import { useEffect, useState } from 'react';
import { getNavigationUnlockState, type NavigationUnlockState } from '../utils/learningProgress';
import { subscribeToProgressUpdates } from '../utils/progressEvents';

export function useNavigationUnlockState() {
  const [unlockState, setUnlockState] = useState<NavigationUnlockState>(() => getNavigationUnlockState());

  useEffect(() => {
    return subscribeToProgressUpdates(() => {
      setUnlockState(getNavigationUnlockState());
    });
  }, []);

  return unlockState;
}
