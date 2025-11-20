import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive'; // For mobile responsiveness
import GetQuoteModal from './GetQuoteModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const locationHook = useLocation();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isActive = (path: string) => locationHook.pathname === path;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    location.reload()
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-white/70 backdrop-blur-md z-50 rounded-2xl border border-gray-200/30 shadow-lg">
      <div className="px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">SkyElectronica</span>
          </Link>

          <div className={`${isMobile ? 'hidden' : 'flex'} items-center gap-8`}>
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/radio-jam"
              className={`text-sm font-medium transition-colors ${
                isActive('/radio-jam') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.radio-jam')}
            </Link>
            <Link
              to="/drones"
              className={`text-sm font-medium transition-colors ${
                isActive('/products') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.products')}
            </Link>
            <Link
              to="/accessories"
              className={`text-sm font-medium transition-colors ${
                isActive('/accessories') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.accessories-gimbals')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contacts"
              className={`text-sm font-medium transition-colors ${
                isActive('/contacts') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive('/contacts') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors ${
                isActive('/contacts') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('nav.services')}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[100px]">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      i18n.language === 'en' ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      i18n.language === 'ar' ? 'text-blue-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>
            
            {/* <button 
              onClick={() => setIsQuoteModalOpen(true)}
              aria-label="Get a quote for drone services"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {t('nav.getQuote')}
            </button> */}
          </div>

          <button
            aria-label="Toggle mobile menu"
            className={`${!isMobile  && 'hidden'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent border-t border-gray-100 rounded-b-2xl">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
              to="/radio-jam"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            >
              {t('nav.radio-jam')}
            </Link>
            <Link
              to="/drones"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.products')}
            </Link>
            <Link
            to="/accessories"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
            >
              {t('nav.accessories-gimbals')}
            </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/contacts"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.blog')}
              </Link>
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      changeLanguage('en');
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1 rounded text-sm ${
                      i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage('ar');
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1 rounded text-sm ${
                      i18n.language === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    AR
                  </button>
                </div>
              </div>
              
              {/* <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-700 transition-colors"
              >
                {t('nav.getQuote')}
              </button> */}
            </div>
          </div>
        )}
      </div>
      </nav>
      
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;