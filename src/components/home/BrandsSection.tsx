'use client';

import Link from 'next/link';
import { Brand } from '@/types';

interface BrandsSectionProps {
  brands: Brand[];
  title: string;
  subtitle: string;
  description: string;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ 
  brands, 
  title, 
  subtitle, 
  description 
}) => {
  return (
    <section className="brands-section">
      <div className="brands-content">
        <div className="section-title">
          <h2>
            {title} <span className="highlight">{subtitle}</span>
          </h2>
          <p>{description}</p>
        </div>

        <div className="brands-grid">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              href={`/brands/${brand.id}`}
              className="brand-card-link"
            >
              <div className="brand-card">
                <div className="brand-logo">
                  {brand.image ? (
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="brand-image"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('fallback-hidden');
                      }}
                    />
                  ) : null}
                  <span className={`brand-emoji ${brand.image ? 'fallback-hidden' : ''}`}>🎸</span>
                </div>
                <h3 className="brand-name">{brand.name}</h3>
                <p className="brand-origin">{brand.origin}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}; 