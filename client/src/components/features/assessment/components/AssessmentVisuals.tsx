import React from 'react';
import './AssessmentVisuals.css';

interface ChipProps {
  type: 'positive' | 'negative';
  isCancelled?: boolean;
}

const Chip: React.FC<ChipProps> = ({ type, isCancelled }) => (
  <div className={`ass-visual-chip ${type} ${isCancelled ? 'cancelled' : ''}`}>
    {type === 'positive' ? '+' : '−'}
    {isCancelled && <span className="cancel-x">×</span>}
  </div>
);

interface AssessmentChipVisualProps {
  initialNeg: number;
  initialPos: number;
  zeroPairs?: number;
  takeAwayType?: 'positive' | 'negative';
  takeAwayCount?: number;
}

export const AssessmentChipVisual: React.FC<AssessmentChipVisualProps> = ({
  initialNeg,
  initialPos,
  zeroPairs = 0,
  takeAwayType,
  takeAwayCount = 0
}) => {
  const totalNeg = initialNeg + zeroPairs;
  const totalPos = initialPos + zeroPairs;

  return (
    <div className="ass-chip-visual-container">
      <div className="ass-chip-box">
        {/* Negative Section */}
        <div className="ass-chip-section negative">
          {Array.from({ length: totalNeg }).map((_, i) => (
            <Chip 
              key={`neg-${i}`} 
              type="negative" 
              isCancelled={takeAwayType === 'negative' && i >= totalNeg - takeAwayCount} 
            />
          ))}
        </div>
        {/* Positive Section */}
        <div className="ass-chip-section positive">
          {Array.from({ length: totalPos }).map((_, i) => (
            <Chip 
              key={`pos-${i}`} 
              type="positive" 
              isCancelled={takeAwayType === 'positive' && i >= totalPos - takeAwayCount} 
            />
          ))}
        </div>
        {takeAwayCount > 0 && (
          <div className="ass-takeaway-indicator">
            <span className="arrow">↗</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface AssessmentNumberLineVisualProps {
  start: number;
  move: number;
  end: number;
  min?: number;
  max?: number;
}

export const AssessmentNumberLineVisual: React.FC<AssessmentNumberLineVisualProps> = ({
  start,
  move,
  end,
  min = -10,
  max = 10
}) => {
  const range = max - min;
  const getPercent = (val: number) => ((val - min) / range) * 100;

  const startPct = getPercent(start);
  const endPct = getPercent(end);
  const left = Math.min(startPct, endPct);
  const width = Math.abs(startPct - endPct);

  return (
    <div className="ass-numberline-visual">
      <div className="ass-nl-track">
        {/* Main Line */}
        <div className="ass-nl-main-line" />
        
        {/* Arrow / Path */}
        {move !== 0 && (
          <div className="ass-nl-arrow-container" style={{ left: `${left}%`, width: `${width}%` }}>
            <div className={`ass-nl-arrow ${move > 0 ? 'right' : 'left'}`}>
              <div className="ass-nl-arrow-body" />
              <div className="ass-nl-arrow-head" />
            </div>
            <div className="ass-nl-arrow-label">
              {move > 0 ? `+${move}` : move}
            </div>
          </div>
        )}

        {/* Ticks and Labels */}
        <div className="ass-nl-ticks">
          {Array.from({ length: range + 1 }).map((_, i) => {
            const val = min + i;
            if (val % 2 !== 0 && val !== 0) return null; // Show even numbers to save space
            return (
              <div key={val} className="ass-nl-tick" style={{ left: `${getPercent(val)}%` }}>
                <div className="ass-nl-tick-line" />
                <span className="ass-nl-tick-label">{val}</span>
              </div>
            );
          })}
        </div>

        {/* Start Point Dot */}
        <div className="ass-nl-start-dot" style={{ left: `${startPct}%` }} />
        {/* End Point Dot */}
        <div className="ass-nl-end-dot" style={{ left: `${endPct}%` }} />
      </div>
    </div>
  );
};
