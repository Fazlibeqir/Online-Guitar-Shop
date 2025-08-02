'use client';

import { useState } from 'react';
import { GuitarModel, Musician } from '@/types';
import { MusicianCard } from './MusicianCard';

interface GuitarDetailsProps {
  guitar: GuitarModel;
}

export const GuitarDetails: React.FC<GuitarDetailsProps> = ({ guitar }) => {
  const [activeTab, setActiveTab] = useState('specification');
  const [musiciansPage, setMusiciansPage] = useState(1);
  const musiciansPerPage = 2;

  // Musicians pagination
  const totalMusiciansPages = Math.ceil((guitar.musicians?.length || 0) / musiciansPerPage);
  const startMusicianIndex = (musiciansPage - 1) * musiciansPerPage;
  const endMusicianIndex = startMusicianIndex + musiciansPerPage;
  const currentMusicians = guitar.musicians?.slice(startMusicianIndex, endMusicianIndex) || [];

  const handleMusiciansPageChange = (page: number) => {
    setMusiciansPage(page);
  };

  // Helper function to format specification keys
  const formatSpecKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/([A-Z])/g, ' $1')
      .trim();
  };

  return (
    <div className="guitar-details-section">
      <div className="guitar-details-content">
        {/* Guitar Overview */}
        <div className="guitar-overview">
          {/* Left Side - Guitar Information */}
          <div className="guitar-info-container">
            <div className="guitar-info">
              <h1 className="guitar-main-title">{guitar.name}</h1>
              <h2 className="guitar-subtitle">{guitar.type}</h2>
              <div className="guitar-divider">
                <div className="orange-line"></div>
                <div className="grey-line"></div>
              </div>
              
              {/* Tab Buttons */}
              <div className="guitar-tabs">
                <button 
                  className={`guitar-tab-button ${activeTab === 'specification' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specification')}
                >
                  Specification
                </button>
                <button 
                  className={`guitar-tab-button ${activeTab === 'musicians' ? 'active' : ''}`}
                  onClick={() => setActiveTab('musicians')}
                >
                  Who plays it?
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Guitar Image with Orange Circle */}
          <div className="guitar-image-container">
            <div className="orange-circle-bg">
              {guitar.image ? (
                <img 
                  src={guitar.image} 
                  alt={guitar.name}
                  className="guitar-main-image"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const emojiElement = target.parentElement?.querySelector('.guitar-fallback-emoji');
                    if (emojiElement) {
                      emojiElement.classList.remove('fallback-hidden');
                    }
                  }}
                />
              ) : null}
              <span className={`guitar-fallback-emoji ${guitar.image ? 'fallback-hidden' : ''}`}>🎸</span>
              <div className="orange-circle-icon">
                <span>M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="guitar-tab-content">
          {activeTab === 'specification' && (
            <div className="specification-content">
              <p className="guitar-description">
                The {guitar.name} guitar features a {guitar.specs?.bodyWood || 'premium'} body with {guitar.specs?.neckWood || 'excellent'} neck construction. 
                Designed for {guitar.type?.toLowerCase() || 'guitar'} players who demand both performance and style.
              </p>
              
              {guitar.specs && Object.keys(guitar.specs).length > 0 ? (
                <div className="specifications-list">
                  {Object.entries(guitar.specs).map(([key, value], index) => (
                    <div key={`${key}-${index}`} className="specification-item">
                      <span className="spec-label">{formatSpecKey(key)}:</span>
                      <span className="spec-value">{value as string}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No specifications available for this guitar.</p>
              )}
            </div>
          )}

          {activeTab === 'musicians' && (
            <div className="musicians-content">
              <p className="guitar-description">
                Discover famous musicians who have used the {guitar.name} in their performances and recordings.
              </p>
              
              {currentMusicians.length > 0 ? (
                <>
                  <div className="musicians-grid">
                    {currentMusicians.map((musician: Musician, index: number) => (
                      <MusicianCard key={`${musician.name}-${index}`} musician={musician} />
                    ))}
                  </div>
                  
                  {/* Musicians Pagination */}
                  {totalMusiciansPages > 1 && (
                    <div className="musicians-pagination">
                      <div className="pagination-dots">
                        {Array.from({ length: totalMusiciansPages }, (_, i) => (
                          <button
                            key={i + 1}
                            className={`pagination-dot ${musiciansPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handleMusiciansPageChange(i + 1)}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted">No musician information available for this guitar.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 