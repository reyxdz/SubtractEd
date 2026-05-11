import React from 'react';
import { Sparkles } from 'lucide-react';
import harryAvatar from '../../../assets/researchers/harryArnold.png';
import imaeAvatar from '../../../assets/researchers/imaeCuesta.png';
import studentIdea from '../../../assets/student_clip_images/student_has_an_idea.png';
import './AboutContent.css';

const RESEARCHERS = [
  {
    name: 'Harry Arnold C. Salele',
    role: 'Researcher',
    school: 'Biliran Province State University',
    image: harryAvatar,
    description:
      'Harry is currently a preservice teacher with a strong interest in making mathematics more accessible and engaging for students. He is a recipient of the DOST Scholarship and has also passed the Civil Service Examination, reflecting his dedication to his professional development.',
  },
  {
    name: 'Imae Cuesta',
    role: 'Researcher',
    school: 'Biliran Province State University',
    image: imaeAvatar,
    description:
      "Imae is a third-year pre-service teacher with a deep passion for Mathematics. She is known for her persistence and ability to successfully complete tasks, regardless of the difficulty. She is currently focused on completing her thesis requirement in the university.",
  },
];

export const AboutContent: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-copy">
          <h1>About the Researchers</h1>
          <p>
            Meet the team behind SubtractEd, educators and researchers passionate
            about helping students succeed in mathematics.
          </p>
        </div>

        <div className="about-hero-visual" aria-hidden="true">
          <Sparkles className="about-spark about-spark-left" size={36} />
          <Sparkles className="about-spark about-spark-right" size={28} />
          <img src={studentIdea} alt="" className="about-student-visual" />
          <div className="about-lightbulb">Idea</div>
        </div>
      </section>

      <section className="about-researchers-panel">
        <div className="about-researchers-grid">
          {RESEARCHERS.map((researcher) => (
            <article key={researcher.name} className="about-researcher-card">
              <div className="about-researcher-header">
                <img
                  src={researcher.image}
                  alt={researcher.name}
                  className="about-researcher-avatar"
                />
                <div>
                  <h2>{researcher.name}</h2>
                  <p className="about-researcher-role">{researcher.role}</p>
                  <p className="about-researcher-school">{researcher.school}</p>
                </div>
              </div>

              <p className="about-researcher-description">{researcher.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
