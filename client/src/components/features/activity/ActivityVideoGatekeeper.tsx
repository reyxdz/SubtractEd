import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TopBar } from '../../layout/TopBar';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import teacherIdea from '../../../assets/teacher_clip_images/teacher_has_an_idea.png';
import teacherNotes from '../../../assets/teacher_clip_images/teacher_laughing_taking_notes.png';
import teacherClap from '../../../assets/teacher_clip_images/teacher_smiling_clapping.png';
import { playSound } from '../../../utils/sound';
import '../guide/GuideContent.css'; // For the generic container layout
import './ActivityVideoGatekeeper.css';

// Teacher images for each activity
const teacherImages: Record<string, string> = {
  '1': teacherIdea,
  '2': teacherNotes,
  '3': teacherClap,
};

// YouTube link: https://www.youtube.com/watch?v=Er79fRnUK24
// Act 1: 0:00 - 8:33 (0s to 513s)
// Act 2: 8:33 - 12:22 (513s to 742s)
// Act 3: 12:22 - 18:31 (742s to 1111s)
const videoUrls: Record<string, string> = {
  '1': 'https://www.youtube.com/embed/Er79fRnUK24?start=0&end=513', 
  '2': 'https://www.youtube.com/embed/Er79fRnUK24?start=513&end=742',
  '3': 'https://www.youtube.com/embed/Er79fRnUK24?start=742&end=1111', 
};

export const ActivityVideoGatekeeper: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Default to a video if invalid ID is somehow passed
  const videoUrl = id && videoUrls[id] ? videoUrls[id] : videoUrls['1'];
  
  const teacherImg = id && teacherImages[id] ? teacherImages[id] : teacherIdea;

  const handleProceed = () => {
    playSound.click();
    navigate(`/activity/${id}`);
  };

  const handleBack = () => {
    playSound.click();
    navigate('/activity');
  };

  return (
    <div className="guide-container theme-violet">
      <header className="guide-header">
        <button className="neo-btn back-chip" onClick={handleBack}>
          ← <span>Back</span>
        </button>
        <h1 className="guide-title-pill">Activity {id} Intro</h1>
        <TopBar />
      </header>

      <div className="gk-layout">
        <div className="gk-main-content">
          <Card className="gk-video-card">
            <h2 className="gk-video-title">Watch this video before starting Activity {id}!</h2>
            <div className="gk-video-wrapper">
              <iframe 
                width="100%" 
                height="100%" 
                src={videoUrl} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <Button className="gk-proceed-btn" onClick={handleProceed}>
              Proceed to Activity {id}
            </Button>
          </Card>
        </div>
        
        <div className="gk-side-character">
          <img src={teacherImg} alt="Teacher" className="gk-teacher-image" draggable="false" />
        </div>
      </div>
    </div>
  );
};
