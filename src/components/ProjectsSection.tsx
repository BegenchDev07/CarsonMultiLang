import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi } from '../services/api';

const ProjectsSection = () => {
  const { t } = useTranslation();
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

  return (
    <section className="py-24 bg-white" aria-labelledby="projects-heading">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('projectsDetails.main.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projectsDetails.main.description')}
          </p>
        </div>

        {/* Bento Grid Layout */}        
          <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-4 pb-4">    
        
    <div className="card bg-base-100 w-full lg:w-[30rem] shadow-sm">
      <figure>
        <img
          width={'100%'}
          height={'100%'}
          src={projects[0].image}
          alt={projects[0].title} />
      </figure>
      <div className="card-body text-center">
        <h2 className="w-full text-center text-2xl font-semibold">
        {projects[0].title}          
        </h2>
        <p className='line-clamp-3'>{projects[0].description}</p>        
      </div>
    </div>
    <div className="card bg-base-100 w-full lg:w-[30rem] shadow-sm">
      <figure>
        <img
          width={'100%'}
          height={'100%'}
          src={projects[1].image}
          alt={projects[1].title} />
      </figure>
      <div className="card-body text-center">
        <h2 className="w-full text-center text-2xl font-semibold">
        {projects[1].title}          
        </h2>
        <p className='line-clamp-3'>{projects[1].description}</p>        
      </div>
    </div>
    <div className="card bg-base-100 w-full lg:w-[30rem] shadow-sm">
      <figure>
        <img
          width={'100%'}
          height={'100%'}
          src={projects[2].image}
          alt={projects[2].title}/>
      </figure>
      <div className="card-body text-center">
        <h2 className="w-full text-center text-2xl font-semibold">
        {projects[2].title}          
        </h2>
        <p className='line-clamp-3'>{projects[2].description}</p>        
      </div>
    </div>

          </div>        

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