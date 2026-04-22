import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, FileEdit, Search } from 'lucide-react';
import { Card } from '../../common/Card';
import { TopBar } from '../../layout/TopBar';
import teacherClip from '../../../assets/teacher_clip_images/teacher_has_an_idea.png';
import './ActivityContent.css';
import '../guide/GuideContent.css'; // Reuse header styles

export const ActivityContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-page-container">
      <header className="guide-header">
        <button className="neo-btn back-chip" onClick={() => navigate('/')}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill">Activity Card</h1>
        <TopBar />
      </header>

      <div className="activity-layout">
        <div className="activity-main-content">
          <div className="activity-options-grid">
            <Card className="activity-option-card" onClick={() => navigate('/activity/1')}>
              <div className="activity-icon-container">
                <ShoppingCart size={40} strokeWidth={2} />
              </div>
              <h3>Activity 1</h3>
              <p>Integer Chip</p>
            </Card>
            
            <Card className="activity-option-card" onClick={() => {}}>
              <div className="activity-icon-container">
                <FileEdit size={40} strokeWidth={2} />
              </div>
              <h3>Activity 2</h3>
              <p>Number line</p>
            </Card>

            <Card className="activity-option-card" onClick={() => {}}>
              <div className="activity-icon-container">
                <Search size={40} strokeWidth={2} />
              </div>
              <h3>Activity 3</h3>
              <p>Integer Rules</p>
            </Card>
          </div>
        </div>
        
        <div className="activity-side-character">
          <img src={teacherClip} alt="Teacher" className="teacher-image" />
        </div>
      </div>
    </div>
  );
};
