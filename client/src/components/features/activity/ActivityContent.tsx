import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, FileEdit, Search } from 'lucide-react';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { TopBar } from '../../layout/TopBar';
import teacherClip from '../../../assets/teacher_clip_images/teacher_has_an_idea.png';
import './ActivityContent.css';
import '../guide/GuideContent.css'; // Reuse header styles

export const ActivityContent: React.FC = () => {
  const navigate = useNavigate();
  const [isVideoWatched, setIsVideoWatched] = useState(false);

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
          {!isVideoWatched ? (
            <Card className="activity-video-card">
              <h2 className="video-title">Watch the video before starting the activities.</h2>
              <div className="video-wrapper">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Pj13iF8nNn8" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <Button className="proceed-btn" onClick={() => setIsVideoWatched(true)}>
                Proceed to Activities
              </Button>
            </Card>
          ) : (
            <div className="activity-options-grid">
              <Card className="activity-option-card" onClick={() => {}}>
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
          )}
        </div>
        
        <div className="activity-side-character">
          <img src={teacherClip} alt="Teacher" className="teacher-image" />
        </div>
      </div>
    </div>
  );
};
