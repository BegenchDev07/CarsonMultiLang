import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const projects : any = [
    {
      title: t('servicesContent.technicalServices.title'),
      location: t('projectsDetails.smartCitySurveillance.location'),
      description: t('servicesContent.technicalServices.content.exp'),
      tags: (() => {
        const tags = t('projectsDetails.smartCitySurveillance.tags', { returnObjects: true });
        return Array.isArray(tags) ? tags : [];
      })(),
      date: "2024",
      image: t('servicesContent.technicalServices.content.image'),
    },
    {
      title: t('servicesContent.afterSalesMaintenance.title'),
      location: t('projectsDetails.agriculturalPrecisionFarming.location'),
      description: t('servicesContent.afterSalesMaintenance.content.exp'),
      tags: (() => {
        const tags = t('projectsDetails.agriculturalPrecisionFarming.tags', { returnObjects: true });
        return Array.isArray(tags) ? tags : [];
      })(),
      date: "2024",
      image:t('servicesContent.afterSalesMaintenance.content.image'),
    },
    {
      title: t('servicesContent.projectOperationalSupport.title'),
      location: t('projectsDetails.disasterResponseInitiative.location'),
      description: t('servicesContent.projectOperationalSupport.content.exp'),
      tags: (() => {
        const tags = t('projectsDetails.smartCitySurveillance.tags', { returnObjects: true });
        return Array.isArray(tags) ? tags : [];
      })(),
      date: "2023",
      image: t('servicesContent.projectOperationalSupport.content.image'),
    },    
  ];

  const backgroundImageUrl = 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.outerWidth;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {      
      const scrollAmount = window.outerWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!isDesktop) {
      checkScrollButtons();
      const container = scrollContainerRef.current;
      if (container) {
        container.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        return () => {
          container.removeEventListener('scroll', checkScrollButtons);
          window.removeEventListener('resize', checkScrollButtons);
        };
      }
    }
  }, [projects, isDesktop]);

  return (
    <section className="py-24 relative" aria-labelledby="projects-heading">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      />
      <div className="absolute inset-0 bg-white/60" />
      <div className="relative z-10 max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('projectsDetails.main.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projectsDetails.main.description')}
          </p>
        </div>

        {/* Desktop: Row Layout | Mobile/Tablet: Scrollable Carousel */}
        {isDesktop ? (
          /* Desktop Row Layout */
          <div className="w-full flex lg:flex-row flex-col items-stretch justify-center gap-4 pb-4">
            {projects.map((project: any, index: number) => (
              <div
                key={index}
                className="card bg-base-100 w-full lg:w-[30rem] shadow-sm h-full flex flex-col"
              >
                <figure className="flex-shrink-0">
                  <img
                    width={'100%'}
                    height={'100%'}
                    src={project.image}
                    alt={project.title}
                  />
                </figure>
                <div className="card-body text-center flex-grow flex flex-col">
                  <h2 className="w-full text-center text-2xl font-semibold">
                    {project.title}          
                  </h2>
                  <p className='line-clamp-3 flex-grow'>{project.description}</p>        
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Mobile/Tablet Scrollable Carousel */
          <div className="relative">
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>
            )}

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            )}

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-6 pb-4">
                {projects.map((project: any, index: number) => (
                  <div
                    key={index}
                    className="card bg-base-100 w-[90vw] sm:w-[90vw] md:w-[90vw] shadow-sm h-full flex flex-col flex-shrink-0"
                  >
                    <figure className="flex-shrink-0">
                      <img
                        width={'100%'}
                        height={'100%'}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                      />
                    </figure>
                    <div className="card-body text-center flex-grow flex flex-col">
                      <h2 className="w-full text-center text-2xl font-semibold">
                        {project.title}          
                      </h2>
                      <p className='line-clamp-3 flex-grow'>{project.description}</p>        
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}        

        <div className="text-center mt-12">
          <a href='/services' className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            {t('projectsDetails.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;