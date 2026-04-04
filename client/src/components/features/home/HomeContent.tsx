import React from 'react';
import { BookOpen, Edit3, ClipboardCheck, Star } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import './HomeContent.css';

const MOCK_CARDS = [
  { id: 1, title: 'Guide Card', icon: BookOpen, gradient: 'blue-gradient' },
  { id: 2, title: 'Activity Card', icon: Edit3, gradient: 'red-gradient' },
  { id: 3, title: 'Assessment Card', icon: ClipboardCheck, gradient: 'blue-gradient' },
  { id: 4, title: 'Enrichment Card', icon: Star, gradient: 'yellow-gradient' },
];

export const HomeContent: React.FC = () => {
  return (
    <div className="home-container">
      
      <div className="glass-pill-title">
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

    </div>
  );
};
