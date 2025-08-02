'use client';

import { GuitarModel } from '@/types';
import { GuitarCard } from './GuitarCard';

interface GuitarGridProps {
  guitars: GuitarModel[];
  onGuitarClick: (guitarId: string) => void;
  loading?: boolean;
}

export const GuitarGrid: React.FC<GuitarGridProps> = ({ guitars, onGuitarClick, loading = false }) => {
  if (loading) {
    return (
      <div className="models-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="model-card loading">
            <div className="model-image guitar-gradient-gray">
              <div className="loading-placeholder"></div>
            </div>
            <div className="model-info">
              <div className="loading-placeholder-text"></div>
              <div className="loading-placeholder-text short"></div>
              <div className="loading-placeholder-text price"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (guitars.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted">No guitars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="models-grid">
      {guitars.map((guitar, index) => (
        <GuitarCard
          key={`${guitar.id}-${index}`}
          guitar={guitar}
          index={index}
          onClick={onGuitarClick}
        />
      ))}
    </div>
  );
}; 