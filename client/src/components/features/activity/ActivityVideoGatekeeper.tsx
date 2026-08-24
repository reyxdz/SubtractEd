import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import teacherIdea from '../../../assets/teacher_clip_images/teacher_has_an_idea.png';
import teacherNotes from '../../../assets/teacher_clip_images/teacher_laughing_taking_notes.png';
import teacherClap from '../../../assets/teacher_clip_images/teacher_smiling_clapping.png';
import gatekeeperVideo from '../../../assets/videos/gatekeeper_full_video_for_activities.mp4';
import { isActivityUnlocked } from '../../../utils/activityProgress';
import { playSound } from '../../../utils/sound';
import { musicManager } from '../../../utils/music';
import '../guide/GuideContent.css';
import './ActivityVideoGatekeeper.css';

const teacherImages: Record<string, string> = {
  '1': teacherIdea,
  '2': teacherNotes,
  '3': teacherClap,
};

const videoTimestamps: Record<string, { start: number; end: number }> = {
  '1': { start: 0, end: 513 },
  '2': { start: 513, end: 742 },
  '3': { start: 742, end: 1111 },
};

export const ActivityVideoGatekeeper: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const timestamps = id && videoTimestamps[id] ? videoTimestamps[id] : videoTimestamps['1'];
  const teacherImg = id && teacherImages[id] ? teacherImages[id] : teacherIdea;

  useEffect(() => {
    const activityId = Number(id) as 1 | 2 | 3;
    if (![1, 2, 3].includes(activityId) || !isActivityUnlocked(activityId)) {
      navigate('/activity');
    }
  }, [id, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = timestamps.start;

    const handleTimeUpdate = () => {
      if (video.currentTime >= timestamps.end) {
        video.pause();
        video.currentTime = timestamps.end;
      }
    };

    const handlePlay = () => musicManager.pause();
    const handlePause = () => musicManager.play();

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      musicManager.play();
    };
  }, [timestamps]);

  const handleProceed = () => {
    playSound.click();
    navigate(`/activity/${id}`);
  };

  const handleBack = () => {
    playSound.click();
    navigate('/activity');
  };

  return (
    <div className="guide-page-container theme-violet">
      <section className="gk-header-row">
        <div className="gk-side-character">
          <img src={teacherImg} alt="Teacher" className="gk-teacher-image" draggable="false" />
        </div>
        <div className="gk-header-text-block">
          <button className="gk-back-link" onClick={handleBack}>
            ← Back
          </button>
          <div className="gk-page-copy">
            <p className="gk-page-kicker">Activity {id} Intro</p>
            <h1>Watch Before You Start</h1>
            <p>Review the lesson video for this activity first, then proceed once you are ready to solve the tasks.</p>
          </div>
        </div>
      </section>

      <div className="gk-video-section">
        <Card className="gk-video-card">
          <h2 className="gk-video-title">Watch this video before starting Activity {id}!</h2>
          <div className="gk-video-wrapper">
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              controls
              preload="metadata"
              style={{ borderRadius: '12px' }}
            >
              <source src={gatekeeperVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <Button className="gk-proceed-btn" onClick={handleProceed}>
            Proceed to Activity {id}
          </Button>
        </Card>
      </div>
    </div>
  );
};
