'use client';

import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '@/lib/graphql/queries';
import { Brand } from '@/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { MobileAppSection } from '@/components/home/MobileAppSection';
import { LoadingState } from '@/components/ui/LoadingState';
import { ErrorState } from '@/components/ui/ErrorState';
import { features } from '@/data/features';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GuitarBrandsPage() {
  const { t } = useLanguage();
  const { loading, error, data } = useQuery(GET_BRANDS);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <LoadingState />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <ErrorState error={error} />
        <Footer />
      </div>
    );
  }

  const brands: Brand[] = data?.findAllBrands || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        showChatGptLink={true}
        brandName="Ibanez"
      />

      <BrandsSection
        brands={brands}
        title={t('brands.title')}
        subtitle={t('brands.subtitle')}
        description={t('brands.description')}
      />

      <FeaturesSection
        title={t('features.title')}
        subtitle={t('features.subtitle')}
        features={features}
      />

      <MobileAppSection
        title={t('mobile.title')}
        subtitle={t('mobile.subtitle')}
        productName={t('mobile.product.name')}
        productPrice={t('mobile.product.price')}
      />

      <Footer />
    </div>
  );
}
