import React from 'react';
import { ExternalLink } from 'lucide-react';
import './ReferencesContent.css';

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

export const ReferencesContent: React.FC = () => {
  return (
    <div className="references-page">
      <section className="references-hero">
        <div className="references-hero-copy">
          <h1>References</h1>
          <p>
            Explore the research and resources that informed the development of SubtractEd.
          </p>
        </div>
      </section>

      <section className="references-panel">
        <div className="references-grid">
          {REFERENCES.map((reference, index) => (
            <a 
              key={index} 
              href={reference.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="reference-card"
            >
              <div className="reference-content">
                <h2>{reference.label}</h2>
                <div className="reference-link-text">
                  <span>Visit Link</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
