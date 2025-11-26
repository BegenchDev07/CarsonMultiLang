import { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi, Category, Feature } from '../services/api';
import GetQuoteModal from './GetQuoteModal';
import PinterestSVG from '../assets/pinterest.svg'
import MediumSVG from '../assets/medium.svg';
import TikTokSVG from '../assets/tiktok.svg';
import RedditSVG from '../assets/reddit.svg'


const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
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
          </div>
          <div className="lg:col-span-1">
            <div className={`flex items-center mb-6 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <span className="text-2xl font-bold">Follow Us</span>
            </div>
            <div className={`flex gap-5 items-center justify-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <div className="grid grid-cols-4 gap-4">
                <a href="https://www.facebook.com/profile.php?id=61583478701731" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://x.com/sky_electr72702" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/skyelectronicdrones/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://www.youtube.com/channel/UCAA8AmA_nQuSO7waJd0EA3w" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Youtube</span>
                  <Youtube className="h-6 w-6" />
                </a>
                <a href="https://www.pinterest.com/skyelectronica/_pins/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Pinterest</span>
                  <img src={PinterestSVG} alt="" />                  
                </a>
                <a href="https://www.tiktok.com/@electronicsky63" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Tiktok</span>
                  <img src={TikTokSVG} alt="" />                  
                </a>
                <a href="https://medium.com/@skyelectronic719" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Medium</span>
                  <img src={MediumSVG} alt="" />                  
                </a>
                <a href="https://www.reddit.com/r/DronesToBeSilent/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <span className="sr-only">Reddit</span>
                  <img src={RedditSVG} alt="" />                  
                </a>
              </div>
            </div>
          </div>
          {/* Use Cases */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">{t('products.categories')}</h3>
            {loading ? (
              <div className="space-y-3">
              </div>
            ) : (
              <ul className="space-y-3">
                {[...categories.slice(0, 3), ...features.slice(0, 2)].filter(item => item != null).map((item, index) => (
                  <li key={`${item.id}-${index}`}>
                    <a 
                      href={`/drones?${item.hasOwnProperty('cateogry_name') ? 'category' : 'feature'}=${item.hasOwnProperty('cateogry_name') ? (item as Category).cateogry_name.toLowerCase() : (item as Feature).feature_name.toLowerCase()}`} 
                      className="text-gray-400 hover:text-white transition-colors duration-300 capitalize"
                    >
                      {item.hasOwnProperty('cateogry_name') ? (item as Category).cateogry_name : (item as Feature).feature_name}
                    </a>
                  </li>
                ))}                
              </ul>
            )}
          </div>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6">{t('footer.contact')}</h3>                        
            <p className='py-3'>RM O6 BLK A 23/F HOOVER INDRLDG 26-38 KWAI CHFONG RDKWAICHUNG HONG KONG.</p>
            <button             
            onClick={_=>{setIsQuoteModalOpen(!isQuoteModalOpen)}}
            className='w-auto px-3 py-2 text-xl font-semibold bg-blue-600 rounded-lg'
            >              
              {t('footerContact.button')}
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.privacyPolicy')}
              </a>
              <a href="terms-of-service" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.termsOfService')}
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.cookiePolicy')}
              </a> */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                {t('footer.paymentMethod')}
              </a>
            </div>
          </div>
        </div>
      </div>
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;