import React, { useState } from 'react';
import { Factory, Globe, Zap, Users, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GetQuoteModal from './GetQuoteModal';

const AchievementsSection = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const achievements = [
    {
      icon: Factory,
      number: "50,000+",
      label: t('achievements.stats.dronesProduced'),
      description: t('achievements.descriptions.annualProduction')
    },
    {
      icon: Globe,
      number: "85+",
      label: t('achievements.stats.countriesServed'),
      description: t('achievements.descriptions.globalPresence')
    },
    {
      icon: Zap,
      number: "500km",
      label: t('achievements.stats.maximumRange'),
      description: t('achievements.descriptions.extendedFlight')
    },
    {
      icon: Users,
      number: "200+",
      label: t('achievements.stats.rdEngineers'),
      description: t('achievements.descriptions.innovationWorkforce')
    },
    {
      icon: Award,
      number: "25+",
      label: t('achievements.stats.industryAwards'),
      description: t('achievements.descriptions.recognitionExcellence')
    },
    {
      icon: TrendingUp,
      number: "99.8%",
      label: t('achievements.stats.reliabilityRate'),
      description: t('achievements.descriptions.missionSuccess')
    }
  ];

  const capabilities = [
    {
      title: t('achievements.capabilities.research'),
      items: [
        t('common.advancedAiMachineLearning'),
        t('common.autonomousFlightSystems'),
        t('common.sensorIntegrationTechnology'),
        t('common.batteryPowerManagement')
      ]
    },
    {
      title: t('achievements.capabilities.production'),
      items: [
        `50,000 ${t('common.unitsPerYear')}`,
        `24/7 ${t('common.manufacturingOperations')}`,
        t('common.qualityAssuranceTesting'),
        t('common.customConfigurationOptions')
      ]
    },
    {
      title: t('achievements.capabilities.global'),
      items: [
        `85+ ${t('common.countriesWorldwide')}`,
        t('common.regionalServiceCenters'),
        t('common.localPartnershipNetwork'),
        t('common.multilingualSupport')
      ]
    },
    {
      title: t('achievements.capabilities.technical'),
      items: [
        `${t('common.flightRangeUpTo')} 500km`,
        `${t('common.payloadCapacity')} 10kg+`,
        `${t('common.operatingAltitude')} 6,000m`,
        t('common.allWeatherCapability')
      ]
    }
  ];

  return (
    <section className={`py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white ${isRTL ? 'rtl' : 'ltr'}`} aria-labelledby="achievements-heading">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-center mb-16">
          <h2 id="achievements-heading" className="text-4xl md:text-5xl font-bold mb-6">
            {t('achievements.title')}
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            {t('achievements.subtitle')}
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-16 md:mb-20" role="list" aria-label="Company achievements">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center group"
              role="listitem"
            >
              <div className="bg-white/10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="h-6 w-6 md:h-8 md:w-8 text-blue-300" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                {achievement.number}
              </div>
              <div className="text-base md:text-lg font-semibold text-blue-200 mb-1">
                {achievement.label}
              </div>
              <div className="text-sm text-blue-300">
                {achievement.description}
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${isRTL ? 'text-right' : 'text-left'}`} role="list" aria-label="Company capabilities">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6"
              role="listitem"
            >
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
                {capability.title}
              </h3>
              <ul className="space-y-3">
                {capability.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={`flex items-start text-blue-200 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              {t('achievements.readyTitle')}
            </h3>
            <p className="text-blue-200 mb-6 text-base md:text-lg">
              {t('achievements.readySubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-white text-blue-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                {t('achievements.requestDemo')}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50">
                {t('achievements.downloadBrochure')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
};

export default AchievementsSection;