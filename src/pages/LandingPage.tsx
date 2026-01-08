import React from 'react';
import HeroSection from '../components/HeroSection';
import BestSalesSection from '../components/BestSalesSection';
import UseCasesSection from '../components/UseCasesSection';
import ProjectsSection from '../components/ProjectsSection';
import SolutionsSection from '../components/SolutionsSection';
// import AchievementsSection from '../components/AchievementsSection';

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <ProjectsSection />
      <SolutionsSection />
      <UseCasesSection />
      <BestSalesSection mode='null'/>
      {/* <AchievementsSection /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;