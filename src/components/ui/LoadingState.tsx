'use client';

import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export const LoadingState: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container py-5">
        <div className="text-center">
          <div className="loading-spinner"></div>
          <p className="mt-4 text-muted">{t('loading')}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}; 