import React from "react";
import { HeroSection } from "../components/sections/home/HeroSection";
import { CategoriesSection } from "../components/sections/home/CategoriesSection";
import { NewArrivalsSection } from "../components/sections/home/NewArrivalsSection";
import { FlashSaleSection } from "../components/sections/home/FlashSaleSection";
import { AboutSection } from "../components/sections/home/AboutSection";
import { TestimonialsSection } from "../components/sections/home/TestimonialsSection";
import { CTASection } from "../components/sections/home/CTASection";
import { PromoSection } from "../components/sections/home/PromoSection";
import { BrandsSection } from "../components/sections/home/BrandsSection";
import { RecommendedProductsSection } from "../components/sections/home/RecommendedProductsSection";

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FlashSaleSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <PromoSection />
      <BrandsSection />
      <RecommendedProductsSection />
      {/* <AboutSection /> */}
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
