import React from 'react';
import { BookOpen, Edit3, ClipboardCheck, Star } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Accordion } from '../../common/Accordion';
import { InstallAppButton } from '../../common/InstallAppButton';
import harryAvatar from '../../../assets/researchers/harryArnold.png';
import imaeAvatar from '../../../assets/researchers/imaeCuesta.png';
import './HomeContent.css';
import subtractedLogo from '../../../assets/subtracted_logo.png';
import textLogo from '../../../assets/images/text_logo.png';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../layout/TopBar';

const MOCK_CARDS = [
  { id: 1, title: 'Guide Card', icon: BookOpen, gradient: 'blue-gradient', path: '/guide' },
  { id: 2, title: 'Activity Card', icon: Edit3, gradient: 'red-gradient', path: '/activity' },
  { id: 3, title: 'Assessment Card', icon: ClipboardCheck, gradient: 'blue-gradient', path: '/assessment' },
  { id: 4, title: 'Enrichment Card', icon: Star, gradient: 'yellow-gradient', path: '/enrichment' },
];

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <TopBar />
      </div>

      <img src={subtractedLogo} alt="SubtractEd Logo" className="home-logo" />
      <img src={textLogo} alt="SubtractEd Text Logo" className="home-text-logo" />

      <p className="home-description">
        <strong>Meet SubtractEd:</strong> A Strategic Intervention Material to help students master subtraction of integers.
      </p>

      <div className="cards-grid">
        {MOCK_CARDS.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.id} className="module-card" onClick={() => navigate(card.path)}>
              <div className="card-icon-wrapper">
                <IconComponent size={24} strokeWidth={2.5} className={card.gradient} />
              </div>
              <h4 className="card-title">{card.title}</h4>
            </Card>
          );
        })}
      </div>

      <div className="home-action">
        <Button className="start-btn" onClick={() => navigate('/guide')}>
          Start Learning
        </Button>
        <InstallAppButton />
      </div>

      <div className="home-accordions-container">
        <Accordion
          title="About the Researchers"
          subtitle="Meet the team behind SubtractEd."
        >
          <div className="researchers-grid">
            <div className="researcher-card">
              <div className="researcher-header">
                <img src={harryAvatar} alt="Harry Arnold C. Salele" className="researcher-avatar" />
                <div className="researcher-info">
                  <h4>Harry Arnold C. Salele</h4>
                  <p>Researcher<br />Biliran Province State University</p>
                </div>
              </div>
              <p className="researcher-desc">
                <strong>Harry</strong> is currently a preservice teacher with a strong interest in making mathematics more accessible and engaging for students. He is a recipient of the DOST Scholarship and has also passed the Civil Service Examination, reflecting his dedication to his professional development.
              </p>
            </div>
            <div className="researcher-card">
              <div className="researcher-header">
                <img src={imaeAvatar} alt="Imae Cuesta" className="researcher-avatar" />
                <div className="researcher-info">
                  <h4>Imae Cuesta</h4>
                  <p>Researcher<br />Biliran Province State University</p>
                </div>
              </div>
              <p className="researcher-desc">
                <strong>Imae</strong> is a third-year pre-service teacher with a deep passion for Mathematics. She is known for her persistence and ability to successfully complete tasks, regardless of the difficulty. And now she's currently focus on completing her thesis requirement in the University.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion
          title="References"
          subtitle="View the sources that helped shape SubtractEd."
        >
          <div className="references-list">
            <div className="reference-item">
              <span className="reference-number">1.</span>
              Math Isip. (2025, January 12). <em>SUBTRACTION OF INTEGERS (3rd) THIRD QUARTER GRADE 7 MATATAG TAGALOG MATH TUTORIAL [Video]</em>. YouTube. <a href="https://www.youtube.com/watch?v=Er79fRnUK24" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=Er79fRnUK24</a>
            </div>
            <div className="reference-item">
              <span className="reference-number">2.</span>
              Math with Mr. J. (2020, June 16). <em>Parts of a Subtraction Problem: Minuend, Subtrahend, & Difference | Math with Mr. J [Video]</em>. YouTube. <a href="https://www.youtube.com/watch?v=EDCrtkT_JeA" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=EDCrtkT_JeA</a>
            </div>
            <div className="reference-item">
              <span className="reference-number">3.</span>
              Tambayan, D. (2026, January 26). <em>Grade 6 Mathematics Module: Subtracting Integers • DepEd Tambayan</em>. DepEd Tambayan. <a href="https://depedtambayan.net/grade-6-mathematics-module-subtracting-integers/" target="_blank" rel="noopener noreferrer">https://depedtambayan.net/grade-6-mathematics-module-subtracting-integers/</a>
            </div>
          </div>
        </Accordion>
      </div>

    </div>
  );
};
