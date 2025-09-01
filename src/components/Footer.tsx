import React, { useState, useEffect } from 'react';
import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi, Category, Feature } from '../services/api';

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const [categoriesData, featuresData] = await Promise.all([
          productsApi.getCategories(),
          productsApi.getFeatures(),
        ]);
        
        setCategories(categoriesData);
        setFeatures(featuresData);
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
        // Keep empty arrays as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className={`flex items-center mb-6 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <span className="text-2xl font-bold">SkyElectronica</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.useCases')}</h3>
            {loading ? (
              <div className="space-y-3">
              </div>
            ) : (
              <ul className="space-y-3">
                {[...categories.slice(0, 3), ...features.slice(0, 2)].filter(item => item != null).map((item, index) => (
                  <li key={`${item.id}-${index}`}>
                    <a 
                      href={`/products?${item.hasOwnProperty('cateogry_name') ? 'category' : 'feature'}=${item.hasOwnProperty('cateogry_name') ? (item as Category).cateogry_name.toLowerCase() : (item as Feature).feature_name.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 capitalize"
                    >
                      {item.hasOwnProperty('cateogry_name') ? (item as Category).cateogry_name : (item as Feature).feature_name}
                    </a>
                  </li>
                ))}
                {[...categories.slice(0, 3), ...features.slice(0, 2)].filter(item => item != null).map((item, index) => (
                  <li key={`${item.id}-${index}`}>
                    <a 
                      href={`/products?${item.hasOwnProperty('cateogry_name') ? 'category' : 'feature'}=${item.hasOwnProperty('cateogry_name') ? (item as Category).cateogry_name.toLowerCase() : (item as Feature).feature_name.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 capitalize"
                    >
                      {item.hasOwnProperty('cateogry_name') ? (item as Category).cateogry_name : (item as Feature).feature_name}
                    </a>
                  </li>
                ))}
                {categories.length === 0 && features.length === 0 && !loading && (
                  <li className="text-gray-500 text-sm">{t('footer.noUseCases')}</li>
                )}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>
            {/* <div className="space-y-4">
              <div className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <MapPin className={`h-5 w-5 text-blue-400 mt-1 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div className="text-gray-400">
                  {t('footer.address').split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Phone className={`h-5 w-5 text-blue-400 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-400">{t('footer.phone')}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Mail className={`h-5 w-5 text-blue-400 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-400">{t('footer.email')}</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.termsOfService')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;