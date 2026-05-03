import React from 'react';
import { BookOpen, Edit3, ClipboardCheck, Star } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Accordion } from '../../common/Accordion';
import './HomeContent.css';
import subtractedLogo from '../../../assets/subtracted_logo.png';
import textLogo from '../../../assets/text_logo.png';
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
        <strong>Meet SubtractEd:</strong> A fun and interactive platform to master 
        the rules of integers, designed to help Grade 7 Filipino students. Choose a module 
        below to get started!
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
        <Button className="start-btn">
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
                <img src="https://ui-avatars.com/api/?name=Isabel+Reyes&background=bfdbfe&color=1e3a8a&size=150&font-size=0.33" alt="Isabel Reyes" className="researcher-avatar" />
                <div className="researcher-info">
                  <h4>Isabel Reyes</h4>
                  <p>Lead Researcher<br/>University of the Philippines</p>
                </div>
              </div>
              <p className="researcher-desc">
                <strong>Isabel</strong> is a dedicated mathematics educator focused on creating engaging and effective learning tools for Filipino students.
              </p>
            </div>
            <div className="researcher-card">
              <div className="researcher-header">
                <img src="https://ui-avatars.com/api/?name=Joseph+Santos&background=bfdbfe&color=1e3a8a&size=150&font-size=0.33" alt="Joseph Santos" className="researcher-avatar" />
                <div className="researcher-info">
                  <h4>Joseph Santos</h4>
                  <p>Co-Researcher & Developer<br/>University of the Philippines</p>
                </div>
              </div>
              <p className="researcher-desc">
                <strong>Joseph</strong> is a software developer and educator passionate about making math education accessible and fun for Filipino learners.
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
