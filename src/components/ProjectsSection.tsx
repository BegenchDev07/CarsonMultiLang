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
        {/* <div className="text-center mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('projectsDetails.main.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('projectsDetails.main.description')}
          </p>
        </div> */}

        {/* Bento Grid Layout */}        
          <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-4 pb-4">
    <article className="h-[28rem] lg:w-[32rem] w-[24rem] relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 bg-gray-900" aria-labelledby="project-0">
      <div className="absolute inset-0 bg-white">              
        <img src={projects[1].image} className='size-full object-cover rounded-xl inset-0 bg-gradient-to-t from-black/90 via-black/30'/>        
      </div>



      <div className="absolute h-full flex flex-col items-center justify-center left-0 right-0 p-8 text-white">
        <h3 id="project-0" className="text-5xl font-bold text-text mb-4 leading-tight">
          {t('projectsDetails.main.title')}
        </h3>      
        
      </div>

      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />
    </article>
    
    <article className="h-[28rem] lg:w-[32rem] w-[24rem] relative overflow-hidden border-2 border-black rounded-3xl group transition-all duration-500" aria-labelledby="project-1">
      <div className="absolute inset-0 bg-white">            
      </div>
      

      <div className="absolute h-full py-6 flex flex-col items-center justify-evenly bottom-0 left-0 right-0 p-6 text-black">
        <h3 id="project-1" className="w-full text-4xl text-start font-bold text-black mb-3 leading-tight">
          {projects[0].title}
        </h3>
        <img src={projects[0].image} className='w-full h-1/2 object-cover rounded-xl'/>
        <p className="text-black mb-4 leading-relaxed text-xl line-clamp-2">
          {projects[0].description}
        </p>        
      </div>

      <div className="absolute inset-0 bg-blue-600/0 transition-all duration-300" />
    </article>

    
    <article className="h-[28rem] lg:w-[32rem] w-[24rem] relative overflow-hidden border-2 border-black rounded-3xl group transition-all duration-500" aria-labelledby="project-1">
      <div className="absolute inset-0 bg-white">                              
      </div>
      

      <div className="absolute h-full py-6 flex flex-col items-center justify-evenly bottom-0 left-0 right-0 p-6 text-black">
        <h3 id="project-1" className="w-full text-4xl text-start font-bold text-black mb-3 leading-tight">
          {projects[1].title}
        </h3>
        <img src={projects[1].image} className='w-full h-1/2 object-cover rounded-xl'/>
        <p className="text-black mb-4 leading-relaxed text-xl line-clamp-2">
          {projects[1].description}
        </p>        
      </div>

      <div className="absolute inset-0 bg-blue-600/0 transition-all duration-300" />
    </article>

    
    {/* <article className="h-[28rem] w-[32rem] relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 bg-gray-900" aria-labelledby="project-2">
      <div className="absolute inset-0 bg-white">      
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>


      <div className="absolute flex flex-col items-center justify-evenly h-full bottom-0 left-0 right-0 p-4 text-white">
        <h3 id="project-2" className="text-2xl font-bold text-black mb-2 leading-tight">
          {projects[2].title}
        </h3>

        <p className="text-gray-300 mb-4 leading-relaxed text-xl font-medium">
          {projects[2].description}
        </p>
      </div>

      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />
    </article> */}
          </div>        

        <div className="text-center mt-12">
          <a href='/services' className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            {t('projectsDetails.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;