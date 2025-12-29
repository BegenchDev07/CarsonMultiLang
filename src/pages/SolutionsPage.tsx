import React, { useState, useEffect } from 'react';
import { Loader, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { productsApi, Solution, getImageUrl } from '../services/api';
import { useMediaQuery } from 'react-responsive';

const SolutionsPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    company: '',
    industry: '',
    region: '',
    country: '',
    state: '',
    remark: ''
  });

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const solutionsData = await productsApi.getSolutions();
        setSolutions(solutionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch solutions');
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // TODO: Add API call to submit form
  };

  const getImageUrlForSolution = (image: any): string => {
    if (!image) return '';
    
    // Handle nested data structure - {data: {url: ...}}
    if (image.data?.url) {
      return `https://api.skyelectronica.com/${image.data.url}`;
    }
    
    // Handle direct Image type (if data is already extracted)
    if (image.url && !image.data) {
      return getImageUrl(image, true);
    }
    
    // Handle if data is null but structure exists
    if (image.data === null) {
      return '';
    }
    
    return '';
  };

  const firstThreeSolutions = solutions.slice(0, 3);
  // Get next 4 solutions sorted by creation time (newest first)
  // Exclude the first 3 solutions, then sort by date and take exactly 4 items
  const latestUpdatesSolutions = solutions
    .slice(3)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4); // Ensure exactly 4 items

  const accordionItems = [
    {
      title: t('solutions.whyChooseUs.missionReady.title'),
      content: t('solutions.whyChooseUs.missionReady.content')
    },
    {
      title: t('solutions.whyChooseUs.integratedSolutions.title'),
      content: t('solutions.whyChooseUs.integratedSolutions.content')
    },
    {
      title: t('solutions.whyChooseUs.provenInField.title'),
      content: t('solutions.whyChooseUs.provenInField.content')
    },
    {
      title: t('solutions.whyChooseUs.enterpriseSupport.title'),
      content: t('solutions.whyChooseUs.enterpriseSupport.content')
    }
  ];

  if (loading) {
    return (
      <div className={`pt-20 min-h-screen bg-gray-50 flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('products.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`pt-20 min-h-screen bg-gray-50 flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('common.error')}: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Banner Section - Hero-like */}
      <section className="relative h-[30rem] md:h-[40rem] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={t('solutions.banner.image')}
          alt={t('solutions.banner.alt')}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t('solutions.banner.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200">
              {t('solutions.banner.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section - First 3 cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            {t('solutions.industries.title')}
          </h2>
          
          <div className="w-full flex lg:flex-row flex-col items-stretch justify-center gap-4">
            {firstThreeSolutions.map((solution) => {
              const imageUrl = getImageUrlForSolution(solution.display_image);
              return (
                <div key={solution.documentId} className="card bg-base-100 w-full lg:w-[30rem] shadow-sm h-full flex flex-col">
                  <figure className="flex-shrink-0">
                    {imageUrl ? (
                      <img
                        width={'100%'}
                        height={'100%'}
                        src={imageUrl}
                        alt={solution.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">{solution.title}</span>
                      </div>
                    )}
                  </figure>
                  <div className="card-body text-center flex-grow flex flex-col">
                    <h2 className="w-full text-center text-2xl font-semibold mb-4">
                      {solution.title}
                    </h2>
                    <p className="line-clamp-3 flex-grow mb-4">{solution.description}</p>
                    <Link
                      to={`/solutions/${solution.slug || solution.documentId}`}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors mt-auto"
                    >
                      {t('solutions.learnMore')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section - Next 4 solutions */}
      {latestUpdatesSolutions.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
              {t('solutions.latestUpdates.title')}
            </h2>
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {latestUpdatesSolutions.map((solution) => {
                const imageUrl = getImageUrlForSolution(solution.display_image);
                return (
                  <div key={solution.documentId} className="card bg-base-100 shadow-sm h-full flex flex-col">
                    <figure className="flex-shrink-0">
                      {imageUrl ? (
                        <img
                          width={'100%'}
                          height={'100%'}
                          src={imageUrl}
                          alt={solution.title}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-lg">{solution.title}</span>
                        </div>
                      )}
                    </figure>
                    <div className="card-body text-center flex-grow flex flex-col">
                      <h2 className="w-full text-center text-2xl font-semibold mb-4">
                        {solution.title}
                      </h2>
                      <p className="line-clamp-3 flex-grow mb-4">{solution.description}</p>
                      <Link
                        to={`/solutions/${solution.slug || solution.documentId}`}
                        className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors mt-auto"
                      >
                        {t('solutions.learnMore')}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Accordion Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            {t('solutions.whyChooseUs.title')}
          </h2>
          
          <div className="space-y-4">
            {accordionItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">{item.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-600 transition-transform ${
                      openAccordion === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-gray-600 leading-relaxed">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Form Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              {t('solutions.contactForm.title')}
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              {t('solutions.contactForm.subtitle')}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('solutions.contactForm.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('solutions.contactForm.name')}
                  />
                </div>
                
                <div>
                  <label htmlFor="tel" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('solutions.contactForm.tel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    required
                    value={formData.tel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('solutions.contactForm.tel')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('solutions.contactForm.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('solutions.contactForm.email')}
                />
              </div>

              <div>
                <label htmlFor="company" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('solutions.contactForm.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('solutions.contactForm.company')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="industry" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('solutions.contactForm.industry')}
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('solutions.contactForm.selectIndustry')}</option>
                    <option value="aerospace">{t('solutions.contactForm.industries.aerospace')}</option>
                    <option value="energy">{t('solutions.contactForm.industries.energy')}</option>
                    <option value="infrastructure">{t('solutions.contactForm.industries.infrastructure')}</option>
                    <option value="security">{t('solutions.contactForm.industries.security')}</option>
                    <option value="agriculture">{t('solutions.contactForm.industries.agriculture')}</option>
                    <option value="other">{t('solutions.contactForm.industries.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="region" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('solutions.contactForm.region')}
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('solutions.contactForm.selectRegion')}</option>
                    <option value="asia">{t('solutions.contactForm.regions.asia')}</option>
                    <option value="europe">{t('solutions.contactForm.regions.europe')}</option>
                    <option value="americas">{t('solutions.contactForm.regions.americas')}</option>
                    <option value="africa">{t('solutions.contactForm.regions.africa')}</option>
                    <option value="oceania">{t('solutions.contactForm.regions.oceania')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('solutions.contactForm.country')}
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('solutions.contactForm.selectCountry')}</option>
                    <option value="usa">{t('solutions.contactForm.countries.usa')}</option>
                    <option value="uk">{t('solutions.contactForm.countries.uk')}</option>
                    <option value="uae">{t('solutions.contactForm.countries.uae')}</option>
                    <option value="china">{t('solutions.contactForm.countries.china')}</option>
                    <option value="other">{t('solutions.contactForm.countries.other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="state" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t('solutions.contactForm.state')}
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('solutions.contactForm.selectState')}</option>
                    <option value="california">{t('solutions.contactForm.states.california')}</option>
                    <option value="texas">{t('solutions.contactForm.states.texas')}</option>
                    <option value="newyork">{t('solutions.contactForm.states.newyork')}</option>
                    <option value="other">{t('solutions.contactForm.states.other')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="remark" className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('solutions.contactForm.remark')}
                </label>
                <textarea
                  id="remark"
                  name="remark"
                  rows={6}
                  value={formData.remark}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('solutions.contactForm.remarkPlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300"
              >
                {t('solutions.contactForm.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;

