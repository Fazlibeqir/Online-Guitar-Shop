'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_MODELS } from '@/lib/graphql/queries';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { GuitarModel } from '@/types';

export default function GuitarModelsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedGuitars, setDisplayedGuitars] = useState<GuitarModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const guitarsPerPage = 6;

  // Fetch guitars from API
  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { 
      brandId: brandId,
      sortBy: { field: 'name', order: 'ASC' }
    },
    skip: !brandId
  });

  // Filter and search guitars
  const filteredGuitars = useMemo(() => {
    return data?.findBrandModels?.filter((guitar: GuitarModel) => {
      const matchesFilter = activeFilter === 'all' || guitar.type?.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch = guitar.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    }) || [];
  }, [data?.findBrandModels, activeFilter, searchQuery]);

  // Infinite scroll functionality
  const loadMoreGuitars = useCallback(() => {
    const startIndex = (currentPage - 1) * guitarsPerPage;
    const endIndex = startIndex + guitarsPerPage;
    const newGuitars = filteredGuitars.slice(startIndex, endIndex);
    
    if (newGuitars.length > 0) {
      setDisplayedGuitars(prev => [...prev, ...newGuitars]);
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, filteredGuitars, guitarsPerPage]);

  // Reset displayed guitars when filters change
  useEffect(() => {
    setDisplayedGuitars([]);
    setCurrentPage(1);
    const initialGuitars = filteredGuitars.slice(0, guitarsPerPage);
    setDisplayedGuitars(initialGuitars);
  }, [activeFilter, searchQuery, filteredGuitars]);

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        const hasMoreGuitars = displayedGuitars.length < filteredGuitars.length;
        if (hasMoreGuitars) {
          loadMoreGuitars();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreGuitars, displayedGuitars.length, filteredGuitars.length]);

  const handleGuitarClick = (guitarId: string) => {
    router.push(`/brands/${brandId}/${guitarId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header showBackButton={true} />
        <div className="container py-5">
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p className="mt-4 text-muted">{t('loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header showBackButton={true} />
        <div className="container py-5">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">{t('error')}</h2>
            <p className="error-message">{error.message}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header showBackButton={true} />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-grid">
            {/* Left Side - Text Content */}
            <div className="hero-text">
              <h1>
                {t('models.hero.title')} <span className="highlight">{t('models.hero.subtitle')}</span>
              </h1>
              <p>
                {t('models.hero.description')}
              </p>
            </div>
            
            {/* Right Side - Brand Logo */}
            <div className="hero-image-container">
              <div className="hero-image-bg">
                <div className="hero-image-content">
                  <div className="hero-brand-logo">
                    <span>{data?.findBrandModels?.[0]?.brand?.name || 'Guitars'}</span>
                  </div>
                  <div className="hero-logo">
                    <span>🎸</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="search-filter-section">
        <div className="search-filter-content">
          <div className="search-filter-container">
            {/* Filter Dropdown - Left Side */}
            <div className="filter-section">
              <div className="filter-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
              </div>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">Filter by type</option>
                <option value="Electric">Electric</option>
                <option value="Acoustic">Acoustic</option>
                <option value="Bass">Bass</option>
              </select>
              <div className="filter-chevron">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="search-filter-divider"></div>

            {/* Search Bar - Right Side */}
            <div className="search-section">
              <div className="search-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guitar Models Grid */}
      <section className="models-section">
        <div className="models-content">
          <div className="models-grid">
            {displayedGuitars.length > 0 ? (
              displayedGuitars.map((guitar: GuitarModel, index: number) => (
                <div 
                  key={`${guitar.id}-${index}`}
                  className="model-card"
                  onClick={() => handleGuitarClick(guitar.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`model-image guitar-gradient-${['red', 'blue', 'dark-red', 'black', 'light-gray', 'gray'][(index + displayedGuitars.length) % 6]}`}>
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
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted">{t('models.noResults')}</p>
              </div>
            )}
          </div>

          {/* Infinite Scroll Loading Indicator */}
          {displayedGuitars.length < filteredGuitars.length && (
            <div className="infinite-scroll-loading">
              <div className="loading-spinner"></div>
              <p className="mt-2 text-muted">{t('models.loadingMore')}</p>
            </div>
          )}

          {/* Results Counter */}
          <div className="results-counter">
            <p className="text-muted">
              {t('models.showing')} {displayedGuitars.length} {t('models.of')} {filteredGuitars.length} {t('models.results')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 