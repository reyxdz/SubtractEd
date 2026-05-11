import React from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ClipboardCheck,
  Pencil,
  Rocket,
  Sparkles,
  Star,
  UsersRound,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button';
import subtractedLogo from '../../../assets/subtracted_logo.png';
import textLogo from '../../../assets/images/text_logo.png';
import harryAvatar from '../../../assets/researchers/harryArnold.png';
import imaeAvatar from '../../../assets/researchers/imaeCuesta.png';
import './HomeContent.css';

const LEARNING_CARDS = [
  { id: 1, title: 'Guide Card', icon: BookOpen, accent: 'blue', path: '/guide' },
  { id: 2, title: 'Activity Card', icon: Pencil, accent: 'green', path: '/activity' },
  { id: 3, title: 'Assessment Card', icon: ClipboardCheck, accent: 'purple', path: '/assessment' },
  { id: 4, title: 'Enrichment Card', icon: Star, accent: 'yellow', path: '/enrichment' },
] as const;

const REFERENCES = [
  {
    label: 'Math Isip. Subtraction of Integers.',
    href: 'https://www.youtube.com/watch?v=Er79fRnUK24',
  },
  {
    label: 'Math with Mr. J. Parts of a Subtraction Problem.',
    href: 'https://www.youtube.com/watch?v=EDCrtkT_JeA',
  },
  {
    label: 'DepEd Tambayan. Grade 6 Mathematics Module.',
    href: 'https://depedtambayan.net/grade-6-mathematics-module-subtracting-integers/',
  },
];

const RESEARCHERS = [
  {
    name: 'Harry Arnold C. Salele',
    image: harryAvatar,
    description:
      'Harry is currently a preservice teacher with a strong interest in making mathematics more accessible and engaging for students.',
  },
  {
    name: 'Imae Cuesta',
    image: imaeAvatar,
    description:
      'Imae is a third-year pre-service teacher with a deep passion for Mathematics and a strong focus on completing her university thesis work.',
  },
] as const;

export const HomeContent: React.FC = () => {
  const navigate = useNavigate();
  const [openPanel, setOpenPanel] = React.useState<'researchers' | 'references' | null>(null);

  const togglePanel = (panel: 'researchers' | 'references') => {
    setOpenPanel((current) => (current === panel ? null : panel));
  };

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="home-kicker">
            <Sparkles size={16} />
            <span>Strategic. Engaging. Effective.</span>
          </div>

          <h1 className="home-title">
            Master Integer
            <br />
            Subtraction
            <br />
            <span>the Smart Way</span>
          </h1>

          <p className="home-description">
            SubtractEd is a strategic intervention material designed to help students
            build confidence and mastery in subtraction of integers through guided
            lessons, engaging activities, and meaningful practice.
          </p>

          <Button className="home-hero-cta" onClick={() => navigate('/guide')}>
            <Rocket size={18} />
            <span>Start Learning</span>
          </Button>
        </div>

        <div className="home-hero-stage">
          <div className="home-logo-showcase">
            <img src={subtractedLogo} alt="SubtractEd logo" className="home-logo-mark" />
            <img src={textLogo} alt="SubtractEd" className="home-logo-wordmark-image" />
          </div>
        </div>

        <aside className="home-progress-card">
          <div className="home-progress-header">
            <BarChart3 size={18} />
            <span>Your Progress</span>
          </div>

          <div className="home-progress-ring">
            <div className="home-progress-ring-inner">
              <strong>72%</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="home-progress-copy">
            <h2>Keep it up!</h2>
            <p>You're doing great.</p>
          </div>

          <button type="button" className="home-inline-link" onClick={() => navigate('/assessment')}>
            <span>View Progress</span>
            <ArrowRight size={16} />
          </button>
        </aside>
      </section>

      <section className="cards-grid">
        {LEARNING_CARDS.map((card) => {
          const IconComponent = card.icon;

          return (
            <button
              key={card.id}
              type="button"
              className="module-card"
              onClick={() => navigate(card.path)}
            >
              <div className={`card-icon-wrapper card-icon-${card.accent}`}>
                <IconComponent size={34} strokeWidth={2.3} />
              </div>

              <div className="card-copy">
                <h2 className="card-title">{card.title}</h2>
              </div>

              <span className={`card-arrow card-arrow-${card.accent}`}>
                <ArrowRight size={16} />
              </span>
            </button>
          );
        })}
      </section>

      <section className="home-info-grid">
        <article className={`home-info-card info-card-blue${openPanel === 'researchers' ? ' is-open' : ''}`}>
          <div className="home-info-summary">
            <div className="home-info-topline">
              <div className="home-info-icon">
                <UsersRound size={30} />
              </div>
              <div className="home-info-heading-group">
                <h3>About the Researchers</h3>
                <p>
                  Meet the team behind SubtractEd, educators and researchers
                  passionate about helping students succeed in mathematics.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="home-corner-toggle"
              aria-expanded={openPanel === 'researchers'}
              aria-label="Toggle About the Researchers"
              onClick={() => togglePanel('researchers')}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="home-info-actions">
            <button type="button" className="home-inline-link" onClick={() => navigate('/about')}>
              <span>Learn More</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="home-info-content">
            <div className="home-info-expanded">
              <p>
                Harry Arnold C. Salele and Imae Cuesta are the researchers behind
                SubtractEd, bringing classroom-centered mathematics support into a
                more approachable and engaging format for students.
              </p>

              <div className="home-researcher-list">
                {RESEARCHERS.map((researcher) => (
                  <article key={researcher.name} className="home-researcher-item">
                    <img
                      src={researcher.image}
                      alt={researcher.name}
                      className="home-researcher-item-avatar"
                    />
                    <div className="home-researcher-item-copy">
                      <h4>{researcher.name}</h4>
                      <p>{researcher.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <button type="button" className="home-inline-link" onClick={() => navigate('/about')}>
                <span>Open About Page</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </article>

        <article className={`home-info-card info-card-lilac${openPanel === 'references' ? ' is-open' : ''}`}>
          <div className="home-info-summary">
            <div className="home-info-topline">
              <div className="home-info-icon home-info-docs">
                <ClipboardCheck size={28} />
              </div>
              <div className="home-info-heading-group">
                <h3>References</h3>
                <p>
                  Explore the research and resources that informed the development
                  of SubtractEd.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="home-corner-toggle"
              aria-expanded={openPanel === 'references'}
              aria-label="Toggle References"
              onClick={() => togglePanel('references')}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="home-info-actions">
            <button
              type="button"
              className="home-inline-link"
              onClick={() => window.open(REFERENCES[2].href, '_blank', 'noopener,noreferrer')}
            >
              <span>View References</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="home-info-content">
            <div className="home-info-expanded">
              <div className="home-reference-preview">
                {REFERENCES.map((reference) => (
                  <a key={reference.href} href={reference.href} target="_blank" rel="noopener noreferrer">
                    {reference.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
