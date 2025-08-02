'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  showChatGptLink?: boolean;
  brandName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  showChatGptLink = false,
  brandName = 'Ibanez'
}) => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-grid">
          {/* Left Side - Text Content */}
          <div className="hero-text">
            <h1>
              {title} <span className="highlight">{subtitle}</span>
            </h1>
            <p>{description}</p>
            {showChatGptLink && (
              <div className="chatgpt-link">{t('hero.chatgpt')}</div>
            )}
          </div>
          
          {/* Right Side - Brand Logo */}
          <div className="hero-image-container">
            <div className="hero-image-bg">
              <div className="hero-image-content">
                <div className="hero-brand-logo">
                  <span>{brandName}</span>
                </div>
                <div className="hero-logo">
                  <span>M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 