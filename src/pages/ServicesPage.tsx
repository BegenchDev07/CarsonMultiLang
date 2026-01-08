import {useEffect, useState, Fragment} from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import GetQuoteModal from '../components/GetQuoteModal';
import { Link } from 'react-router-dom';

const ServicesPage = () => {  
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Pagination states

  const technical :any = t('servicesContent.technicalServices.content.bulletList',{returnObjects: true})
  const afterSale :any = t('servicesContent.afterSalesMaintenance.content.bulletList',{returnObjects: true})
  const projectOperation :any = t('servicesContent.projectOperationalSupport.content.bulletList',{returnObjects: true})
  const businessPartner :any = t('servicesContent.businessPartnershipSupport.content.bulletList',{returnObjects: true})  
  const valueAdded :any = t('servicesContent.valueAddedContinuousServices.content.bulletList',{returnObjects: true})  
  
  

    

  // Reset to first page when filters/search change
  useEffect(() => {    
  }, [isMobile]);

  // Category counts    



  return (
    <div className={`pt-20 min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="py-24 max-w-7xl gap-5 mx-auto flex lg:flex-row flex-col items-center justify-center">
        <div className={`max-w-7xl lg:w-1/2 w-full mx-auto sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="lg:text-start text-center w-full flex flex-col lg:items-start items-center justify-center gap-10">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              {t('servicesContent.intro.title')}
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed text-black">
              {t('servicesContent.intro.content')}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              {t('servicesContent.hook.title')}
            </h1>
            <p className="text-xl lg:text-start text-center max-w-3xl leading-relaxed text-black">
              {t('servicesContent.hook.content')}
            </p>
          </div>
        </div>
        <div className='lg:w-1/2 lg:p-0 px-4 w-full flex items-center justify-center'>
            <img
              src={t('servicesContent.intro.image')}
              alt="UAV Value-Added & Continuous Services | Software Upgrades, Consulting & Compliance"
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
              className="rounded-3xl shadow-2xl"
            />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
              {t('servicesContent.technicalServices.title')}
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
              {t('servicesContent.technicalServices.content.exp')}
            </p>
            <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
              {technical.map((bullet:any, index:any) => (
                <Fragment key={index}>
                  <h1>
                    {bullet.title}
                  </h1>
                  <p>
                    {bullet.content}
                  </p>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="w-full">
            <img
              src={t('servicesContent.technicalServices.content.image')}
              alt="Skyelectronica UAV Solutions | End-to-End Drone Support & Mission-Ready Tech"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>


      <section className="py-24 bg-gray-50">
        {
        isMobile
        ?
        <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
              {t('servicesContent.afterSalesMaintenance.title')}
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
              {t('servicesContent.afterSalesMaintenance.content.exp')}
            </p>
            <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
            {afterSale.map((bullet:any, index:any) => (
                <Fragment key={index}>
                  <h1>
                    {bullet.title}
                  </h1>
                  <p>
                    {bullet.content}
                  </p>
                </Fragment>
            ))}
            </div>
          </div>
          <div className="w-full">
            <img
              src={t('servicesContent.afterSalesMaintenance.content.image')}
              alt="Technical UAV Services | Custom Drone Integration, AI Analytics & Training"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
        :
        <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="w-full">
            <img
              src={t('servicesContent.afterSalesMaintenance.content.image')}
              alt="Technical UAV Services | Custom Drone Integration, AI Analytics & Training"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
          <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
              {t('servicesContent.afterSalesMaintenance.title')}
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
              {t('servicesContent.afterSalesMaintenance.content.exp')}
            </p>
            <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
            {afterSale.map((bullet:any, index:any) => (
                <Fragment key={index}>
                  <h1>
                    {bullet.title}
                  </h1>
                  <p>
                    {bullet.content}
                  </p>
                </Fragment>
            ))}
            </div>
          </div>
        </div>
        }
      </section>

      <section className="py-24 bg-gray-50">
        <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
              {t('servicesContent.projectOperationalSupport.title')}
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
              {t('servicesContent.projectOperationalSupport.content.exp')}
            </p>
            <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
            {projectOperation.map((bullet:any, index:any) => (
                <Fragment key={index}>
                  <h1>
                    {bullet.title}
                  </h1>
                  <p>
                    {bullet.content}
                  </p>
                </Fragment>
            ))}
            </div>
          </div>
          <div className="w-full">
            <img
              src={t('servicesContent.projectOperationalSupport.content.image')}
              alt="UAV After-Sales & Maintenance | Global Support, Repairs & Upgrades"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        {
          isMobile
          ?
          <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>            
            <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
                {t('servicesContent.businessPartnershipSupport.title')}
              </h1>
              <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
                {t('servicesContent.businessPartnershipSupport.content.exp')}
              </p>
              <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
                {businessPartner.map((bullet:any, index:any) => (
                    <Fragment key={index}>
                      <h1>
                        {bullet.title}
                      </h1>
                      <p>
                        {bullet.content}
                      </p>
                    </Fragment>
                ))}
              </div>
            </div>
            <div className="w-full">
              <img
                src={t('servicesContent.businessPartnershipSupport.content.image')}
                alt="Project & Operational UAV Support | Mission Planning, On-Site Testing"
                loading="lazy"
                decoding="async"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
          :
          <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="w-full">
              <img
                src={t('servicesContent.businessPartnershipSupport.content.image')}
                alt="Project & Operational UAV Support | Mission Planning, On-Site Testing"
                loading="lazy"
                decoding="async"
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
        {t('servicesContent.businessPartnershipSupport.title')}
      </h1>
      <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
        {t('servicesContent.businessPartnershipSupport.content.exp')}
      </p>
      <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
        {businessPartner.map((bullet:any, index:any) => (
            <Fragment key={index}>
              <h1>
                {bullet.title}
              </h1>
              <p>
                {bullet.content}
              </p>
            </Fragment>
        ))}
      </div>
            </div>
          </div>

        }
      </section>

      <section className="py-24 bg-gray-50">
        <div className={`max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="w-full flex flex-col items-center lg:items-start justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">
              {t('servicesContent.valueAddedContinuousServices.title')}
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed lg:text-start text-center text-black">
              {t('servicesContent.valueAddedContinuousServices.content.exp')}
            </p>
            <div className='w-full flex flex-col lg:text-start text-center leading-relaxed text-black'>
                {valueAdded.map((bullet:any, index:any) => (
                    <Fragment key={index}>
                      <h1>
                        {bullet.title}
                      </h1>
                      <p>
                        {bullet.content}
                      </p>
                    </Fragment>
                ))}
              </div>
          </div>
          <div className="w-full">
            <img
              src={t('servicesContent.valueAddedContinuousServices.content.image')}
              alt="UAV Business & Partnership Support | OEM, Distribution & Global Compliance"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>
      


      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className={`max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-10 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className='w-gull text-center text-8xl font-bold text-black'>{t('servicesContent.cta.title')}</h1>
          <a 
          href="mailto:service@skyelectronica.com"
          className='px-6 py-4 bg-blue-700 rounded-lg text-white text-3xl font-semibold'
          >{t('nav.getQuote')}</a>
        </div>
      </section>


      {/* Values */}
      {/* <section className="py-24 bg-gray-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.values')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">            
          </div>
        </div>
      </section>       */}
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
 
    </div>
  );
};

export default ServicesPage;
