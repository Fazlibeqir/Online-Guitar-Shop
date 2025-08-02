'use client';

import { GuitarModel } from '@/types';

interface GuitarCardProps {
  guitar: GuitarModel;
  index: number;
  onClick: (guitarId: string) => void;
}

export const GuitarCard: React.FC<GuitarCardProps> = ({ guitar, index, onClick }) => {
  const gradientClasses = ['red', 'blue', 'dark-red', 'black', 'light-gray', 'gray'];
  const gradientClass = `guitar-gradient-${gradientClasses[(index + guitar.id.length) % 6]}`;

  return (
    <div 
      className="model-card"
      onClick={() => onClick(guitar.id)}
      style={{ cursor: 'pointer' }}
    >
      <div className={`model-image ${gradientClass}`}>
        {guitar.image ? (
          <img 
            src={guitar.image} 
            alt={guitar.name}
            className="guitar-image"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('fallback-hidden');
            }}
          />
        ) : null}
        <span className={`guitar-emoji ${guitar.image ? 'fallback-hidden' : ''}`}>🎸</span>
      </div>
      <div className="model-info">
        <h3 className="model-name">{guitar.name}</h3>
        <p className="model-type">{guitar.type}</p>
        <p className="model-price">${guitar.price || '999.00'}</p>
      </div>
    </div>
  );
}; 