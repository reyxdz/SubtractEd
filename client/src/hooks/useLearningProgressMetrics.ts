import { useEffect, useState } from 'react';
import { getLearningProgressMetrics, type LearningProgressMetrics } from '../utils/learningProgress';
import { subscribeToProgressUpdates } from '../utils/progressEvents';

export function useLearningProgressMetrics() {
  const [metrics, setMetrics] = useState<LearningProgressMetrics>(() => getLearningProgressMetrics());

  useEffect(() => {
    return subscribeToProgressUpdates(() => {
      setMetrics(getLearningProgressMetrics());
    });
  }, []);

  return metrics;
}
