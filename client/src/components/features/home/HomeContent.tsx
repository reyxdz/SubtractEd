import React from 'react';
import { BookOpen, Edit3, ClipboardCheck, Star } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import './HomeContent.css';

const MOCK_CARDS = [
  { id: 1, title: 'Guide Card', icon: BookOpen, colorClass: 'icon-blue' },
  { id: 2, title: 'Activity Card', icon: Edit3, colorClass: 'icon-red' },
  { id: 3, title: 'Assessment Card', icon: ClipboardCheck, colorClass: 'icon-blue' },
  { id: 4, title: 'Enrichment Card', icon: Star, colorClass: 'icon-yellow' },
];

export const HomeContent: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-title-wrapper glass">
        <h1 className="home-title">SubtractEd</h1>
      </div>

      <p className="home-description">
        <strong>Meet SubtractEd:</strong> A fun and interactive platform to master 
        the rules of integers, designed to help Grade 7 Filipino students. Choose a module 
        below to get started!
      </p>

      <div className="cards-grid">
        {MOCK_CARDS.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card key={card.id} className="module-card">
              <div className={`card-icon-wrapper ${card.colorClass}`}>
                <IconComponent size={32} />
              </div>
              <h4>{card.title}</h4>
            </Card>
          );
        })}
      </div>

      <div className="home-action">
        <Button className="start-btn">
          Start Learning
        </Button>
      </div>
    </div>
  );
};
