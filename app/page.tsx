import { HeroSection } from '@/components/hero-section';
import { FeaturedProducts } from '@/components/featured-products';
import { ProductCategories } from '@/components/product-categories';
import { PromotionSection } from '@/components/promotion-section';
import { WhyChooseUs } from '@/components/why-choose-us';
import { CTASection } from '@/components/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductCategories />
      <FeaturedProducts />
      <PromotionSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}