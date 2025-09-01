import React from 'react';
import { Users, Target, Factory, Globe, Forklift, Shield, Lightbulb, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const values = [
    {
      icon: Lightbulb,
      title: t('about.innovation'),
      description: t('about.innovationDesc')
    },
    {
      icon: Shield,
      title: t('about.reliability'),
      description: t('about.reliabilityDesc')
    },
    {
      icon: Heart,
      title: t('about.sustainability'),
      description: t('about.sustainabilityDesc')
    },
    {
      icon: Globe,
      title: t('about.globalImpact'),
      description: t('about.globalImpactDesc')
    }
  ];


  return (
    <div className={`pt-20 min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse gap-3' : ''}`}>
                <Factory className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">{t('about.capability')}</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('about.capabilityText')}
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse gap-3' : ''}`}>
                <Forklift className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">{t('about.logistics')}</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('about.logisticsText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.story')}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>{t('about.storyText')}</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="SkyElectronica facility and drone technology development"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-blue-600/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.values')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.valuesSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>      

      {/* Stats */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-200">{t('achievements.stats.dronesProduced')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">85+</div>
              <div className="text-blue-200">{t('achievements.stats.countriesServed')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">1,200+</div>
              <div className="text-blue-200">{t('achievements.stats.rdEngineers')}</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">99.8%</div>
              <div className="text-blue-200">{t('achievements.stats.reliabilityRate')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;