import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { playSound } from '../../../utils/sound';
import {
  getEnrichmentHighestUnlockedLevel,
  getEnrichmentJustUnlockedLevel,
  setEnrichmentJustUnlockedLevel,
} from '../../../utils/learningProgress';
import level1Icon from '../../../assets/enrichment_images/enrichment_page_level_1_icon.png';
import level2Icon from '../../../assets/enrichment_images/enrichment_page_level_2_icon.png';
import level3Icon from '../../../assets/enrichment_images/enrichment_page_level_3_icon.png';
import level4Icon from '../../../assets/enrichment_images/enrichment_page_level_4_icon.png';
import level5Icon from '../../../assets/enrichment_images/enrichment_page_level_5_icon.png';
import level6Icon from '../../../assets/enrichment_images/enrichment_page_level_6_icon.png';
import mapBg from '../../../assets/enrichment_images/enrichment_page_level_selection_background.png';
import './EnrichmentContent.css';
import '../guide/GuideContent.css';

interface LevelData {
  id: number;
  name: string;
  icon: string;
  top: string;
  left: string;
}

const levelsData: LevelData[] = [
  {
    id: 1,
    name: 'Jeepney Junction',
    icon: level1Icon,
    top: '35%',
    left: '26%',
  },
  {
    id: 2,
    name: 'Sari-Sari Store',
    icon: level2Icon,
    top: '34%',
    left: '50%',
  },
  {
    id: 3,
    name: 'Bahay Kubo Garden',
    icon: level3Icon,
    top: '34%',
    left: '74%',
  },
  {
    id: 4,
    name: 'Rice Field Path',
    icon: level4Icon,
    top: '73%',
    left: '36%',
  },
  {
    id: 5,
    name: 'Town Plaza & Church',
    icon: level5Icon,
    top: '62%',
    left: '60%',
  },
  {
    id: 6,
    name: 'Island Shore Finale',
    icon: level6Icon,
    top: '73%',
    left: '90%',
  },
];

interface ConfettiParticle {
  id: number;
  tx: string;
  ty: string;
  color: string;
}

export const EnrichmentContent: React.FC = () => {
  const navigate = useNavigate();

  const [highestUnlocked, setHighestUnlocked] = useState(1);
  const [animatingLevel, setAnimatingLevel] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const currentHighest = getEnrichmentHighestUnlockedLevel();
    const justUnlocked = getEnrichmentJustUnlockedLevel();

    setHighestUnlocked(currentHighest);

    // If there's a level that was just unlocked, trigger the lock-break animation
    if (justUnlocked && justUnlocked <= currentHighest) {
      setAnimatingLevel(justUnlocked);
      setIsShaking(true);
      playSound.pop();

      // Shake for 500ms
      const shakeTimeout = setTimeout(() => {
        setIsShaking(false);
      }, 500);

      // Trigger target success sound and spawn confetti particles at 400ms
      const soundTimeout = setTimeout(() => {
        playSound.success();
        // Generate confetti particles
        const particles: ConfettiParticle[] = Array.from({ length: 30 }).map((_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const distance = 40 + Math.random() * 80;
          return {
            id: i,
            tx: `${Math.cos(angle) * distance}px`,
            ty: `${Math.sin(angle) * distance}px`,
            color: ['#f1c40f', '#e67e22', '#2ecc71', '#e74c3c', '#3498db', '#9b59b6'][i % 6],
          };
        });
        setConfetti(particles);
      }, 400);

      // Mark animation finished after 2.2 seconds and save
      const finishTimeout = setTimeout(() => {
        setAnimatingLevel(null);
        setConfetti([]);
        setEnrichmentJustUnlockedLevel(null);
      }, 2200);

      return () => {
        clearTimeout(shakeTimeout);
        clearTimeout(soundTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, []);

  const handleLevelClick = (levelId: number) => {
    const isLevelAnimating = levelId === animatingLevel;
    const isLevelUnlocked = levelId <= highestUnlocked && !isLevelAnimating;

    if (!isLevelUnlocked) {
      playSound.error();
      return;
    }

    playSound.click();
    navigate(`/enrichment/quiz?level=${levelId}`);
  };

  return (
    <div className="guide-page-container">
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          width: '100%',
          maxWidth: '980px',
          margin: '0 auto',
          paddingTop: '0.5rem',
          boxSizing: 'border-box',
        }}
      >
        <button
          className="neo-btn"
          onClick={() => {
            playSound.click();
            navigate('/');
          }}
          style={{ width: 'fit-content', padding: '0.75rem 1.25rem', borderRadius: '999px' }}
        >
          Back to Home
        </button>

        <div>
          <p
            style={{
              margin: 0,
              fontSize: '0.95rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--theme-primary)',
            }}
          >
            Enrichment Card
          </p>
          <h1 style={{ color: '#15204a', fontSize: 'clamp(2rem, 5vw, 3.6rem)', margin: '0.35rem 0 0' }}>
            SubtractEd Treasure Hunt
          </h1>
          <p
            style={{
              maxWidth: '780px',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--color-text-dark)',
              margin: '0.6rem 0 0',
            }}
          >
            Test your subtraction skills with 6 challenging levels. Each correct answer earns you 1 point. Can you complete
            all 66 questions?
          </p>
        </div>
      </section>

      <section className="enrichment-container">
        <div className="map-wrapper">
          <img
            src={mapBg}
            alt="Treasure Hunt Map"
            className="map-background-img"
          />

          {levelsData.map((level) => {
            const isCurrentlyAnimating = level.id === animatingLevel;
            const isUnlocked = level.id <= highestUnlocked || isCurrentlyAnimating;

            return (
              <div
                key={level.id}
                onClick={() => handleLevelClick(level.id)}
                className={`level-node-container level-${level.id} ${
                  isUnlocked ? 'unlocked' : 'locked'
                } ${isCurrentlyAnimating ? 'animating-unlock' : ''} ${
                  isCurrentlyAnimating && isShaking ? 'shaking' : ''
                }`}
                style={{
                  top: level.top,
                  left: level.left,
                }}
              >
                {/* Spawning confetti particles around the unlocked level icon */}
                {isCurrentlyAnimating &&
                  confetti.map((particle) => (
                    <div
                      key={particle.id}
                      className="unlock-confetti"
                      style={
                        {
                          background: particle.color,
                          '--tx': particle.tx,
                          '--ty': particle.ty,
                        } as React.CSSProperties
                      }
                    />
                  ))}

                <div className="level-icon-wrapper">
                  <img
                    src={level.icon}
                    alt={level.name}
                    className="level-icon-img"
                  />
                  {!isUnlocked && (
                    <div className="level-lock-overlay">
                      <Lock className="level-lock-icon" />
                    </div>
                  )}
                  {isCurrentlyAnimating && (
                    <div className="level-lock-overlay">
                      <Lock className="level-lock-icon" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
