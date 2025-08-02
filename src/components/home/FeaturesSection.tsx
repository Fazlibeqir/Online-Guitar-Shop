'use client';

import { Feature } from '@/data/features';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title,
  subtitle,
  features
}) => {
  const { t } = useLanguage();

  // Create translated features
  const translatedFeatures = [
    {
      icon: features[0].icon,
      title: t('features.smooth.title'),
      description: t('features.smooth.description')
    },
    {
      icon: features[1].icon,
      title: t('features.delivery.title'),
      description: t('features.delivery.description')
    },
    {
      icon: features[2].icon,
      title: t('features.payments.title'),
      description: t('features.payments.description')
    }
  ];

  return (
    <section className="features-section">
      <div className="features-content">
        <div className="section-title">
          <h2>
            {title} <span className="highlight">{subtitle}</span>?
          </h2>
        </div>
        
        <div className="features-grid">
          {translatedFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 