import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('notFound.title') || 'Page Not Found'}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            {t('notFound.message') || "Oops! The page you're looking for seems to have flown away."}
          </p>
          <p className="text-base text-gray-500">
            {t('notFound.submessage') || "Don't worry, let's get you back on track."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            {t('notFound.goHome') || 'Go to Homepage'}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('notFound.goBack') || 'Go Back'}
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            {t('notFound.quickLinks') || 'Quick Links:'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              {t('nav.products') || 'Products'}
            </Link>
            <Link
              to="/services"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              {t('nav.services') || 'Services'}
            </Link>
            <Link
              to="/about"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              {t('nav.about') || 'About'}
            </Link>
            <Link
              to="/contacts"
              className="text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              {t('nav.contact') || 'Contact'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

