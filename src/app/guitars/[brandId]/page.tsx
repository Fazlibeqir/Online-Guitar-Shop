'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_MODELS } from '@/lib/queries';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function GuitarModelsPage() {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const brandId = params.brandId as string;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
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
  const filteredGuitars = data?.findBrandModels?.filter((guitar: any) => {
    const matchesFilter = activeFilter === 'all' || guitar.type?.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = guitar.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guitar.model?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredGuitars.length / guitarsPerPage);
  const startIndex = (currentPage - 1) * guitarsPerPage;
  const endIndex = startIndex + guitarsPerPage;
  const currentGuitars = filteredGuitars.slice(startIndex, endIndex);

  const handleGuitarClick = (guitarId: string) => {
    router.push(`/guitars/${brandId}/${guitarId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

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

      {/* Guitar Models Section */}
      <section className="models-section">
        <div className="models-content">
          <div className="section-title">
            <h2>
              {t('models.title')} <span className="highlight">{t('models.subtitle')}</span>
            </h2>
          </div>

          {/* Filter and Search Bar */}
          <div className="filter-search">
            <div className="filter-group">
              <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
              </svg>
              <select 
                className="filter-select"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">{t('models.filter.all')}</option>
                <option value="electric">{t('models.filter.electric')}</option>
                <option value="acoustic">{t('models.filter.acoustic')}</option>
                <option value="bass">{t('models.filter.bass')}</option>
              </select>
            </div>
            <div className="filter-group">
              <svg className="filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder={t('models.search.placeholder')}
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Guitar Models Grid */}
          <div className="models-grid">
            {currentGuitars.length > 0 ? (
              currentGuitars.map((guitar: any, index: number) => (
                <div 
                  key={guitar.id} 
                  className="model-card"
                  onClick={() => handleGuitarClick(guitar.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`model-image guitar-gradient-${['red', 'blue', 'dark-red', 'black', 'light-gray', 'gray'][index % 6]}`}>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <p className="pagination-info">
                {t('models.pagination.showing')} {startIndex + 1}-{Math.min(endIndex, filteredGuitars.length)} {t('models.pagination.of')} {filteredGuitars.length}
              </p>
              <div className="pagination-controls">
                <button 
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-muted">...</span>
                    <button 
                      className="pagination-button"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button 
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
} 