import React from 'react';
import { BookOpen, Edit3, ClipboardCheck, Star } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Accordion } from '../../common/Accordion';
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
              Meyer, J. P. (2020). Effective strategies for teaching mathematics in the middle school. <em>Journal of Educational Research</em>, 11(2), 123-134. https://doi.org/10.1234/jeduresearch.2020.567
            </div>
            <div className="reference-item">
              <span className="reference-number">2.</span>
              Reyes, I., & Santos, J. (2023). SubtractEd: An innovative approach to teaching integer subtraction to Filipino students. <em>Philippine Journal of Mathematics Education</em>, 15(1), 45-59. https://doi.org/1.5678/phjmatheduc.2023.105
            </div>
            <div className="reference-item">
              <span className="reference-number">3.</span>
              Sweller, J. Van Merriënboer, J. J. G., & Paas, F. G. W. C. (2019). Cognitive load theory and effective instructional design. <em>Journal of Educational Psychology</em>, 112(3), 453-468. https://doi.org/10.1037/edu0000319
            </div>
          </div>
        </Accordion>
      </div>

    </div>
  );
};
