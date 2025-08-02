'use client';

import { Musician } from '@/types';

interface MusicianCardProps {
  musician: Musician;
}

export const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
  return (
    <div className="musician-card">
      <div className="musician-image">
        {musician.musicianImage ? (
          <img 
            src={musician.musicianImage} 
            alt={musician.name}
            className="musician-detail-image"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const emojiElement = target.parentElement?.querySelector('.musician-emoji');
              if (emojiElement) {
                emojiElement.classList.remove('fallback-hidden');
              }
            }}
          />
        ) : null}
        <span className={`musician-emoji ${musician.musicianImage ? 'fallback-hidden' : ''}`}>👤</span>
      </div>
      <div className="musician-info">
        <h4 className="musician-name">{musician.name}</h4>
        <p className="musician-bands">{musician.bands?.join(', ')}</p>
      </div>
    </div>
  );
}; 