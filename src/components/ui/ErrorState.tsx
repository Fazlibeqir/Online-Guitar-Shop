'use client';

import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface ErrorStateProps {
  error: Error;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
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
}; 