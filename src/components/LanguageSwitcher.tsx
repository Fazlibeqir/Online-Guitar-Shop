'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className={`language-switcher ${className}`}>
      <div className="language-buttons">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`language-button ${language === 'en' ? 'active' : ''}`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('mk')}
          className={`language-button ${language === 'mk' ? 'active' : ''}`}
        >
          MK
        </button>
        <button
          onClick={() => handleLanguageChange('sq')}
          className={`language-button ${language === 'sq' ? 'active' : ''}`}
        >
          SQ
        </button>
      </div>
    </div>
  );
}; 