import React, { useState, useEffect, Fragment } from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsApi, Feature, getImageUrl, JammerCategory, AccessoriesType } from '../services/api';
import { useMediaQuery } from 'react-responsive';

const Accessories = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [jammers, setJammers] = useState<AccessoriesType[]>([]);
  const [categories, setCategories] = useState<JammerCategory[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jammersData, categoriesData, featuresData]:any = await Promise.all([
          productsApi.getAccessories(),
          productsApi.getAccessoryCategories(),
          productsApi.getAccessoryFeatures(),
        ]);
        setJammers(jammersData);
        setCategories(categoriesData);
        setFeatures(featuresData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFeatureToggle = (featureName: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureName)
        ? prev.filter(f => f !== featureName)
        : [...prev, featureName]
    );
    setCurrentPage(1); // reset page when filtering
  };

  const filteredProducts = jammers.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchTerm.toLowerCase());    
    const matchesCategory =
      selectedCategory === 'all' ||
      (product.accessory_category && product.accessory_category.category_name.toLowerCase() === selectedCategory.toLowerCase());    
    const matchesFeatures =
      selectedFeatures.length === 0 ||
      (product.accessory_feature && selectedFeatures.includes(product.accessory_feature.feature_name));

    return matchesSearch && matchesCategory && matchesFeatures;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedFeatures, isMobile]);

  // Category counts  
  const categoryCounts = [
    { id: 'all', name: t('nav.all'), count: jammers.length },    
    ...categories.map(category => ({
      id: category.category_name.toLowerCase(),
      name: category.category_name,
      count: jammers.filter(product =>
        product.accessory_category && product.accessory_category.category_name.toLowerCase() === category.category_name.toLowerCase()
      ).length,
    })),
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
    <div className={`pt-20 min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.categories')}</h3>
                <ul className="space-y-2">
                  {categoryCounts.map((category, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 flex justify-between items-center ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-400">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.features')}</h3>
                <div className="space-y-3">
                  {features.map((feature,index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedFeatures.includes(feature.feature_name)}
                        onChange={() => handleFeatureToggle(feature.feature_name)}
                      />
                      <span className="ml-2 text-gray-600 capitalize">{feature.feature_name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="flex-1">
            {/* Search + View Mode */}            

            {/* Results Count */}
            <p className="text-gray-600 mb-6">
              {t('products.showing')} { totalPages !== currentPage ? currentProducts.length * currentPage : jammers.length} {t('products.of')} {filteredProducts.length} {t('products.products')}
              {searchTerm && ` ${t('products.for')} "${searchTerm}"`}
            </p>

            {/* Products Grid */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedFeatures([]);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t('products.clearFilters')}
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? isMobile ? 'grid-cols-2' : 'grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {currentProducts.map((product:any,index) => (
                  <Fragment key={index}>
                    <Link
                      key={product.documentId}
                      to={`/accessories/${product.documentId}`}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                    >
                      <div className="relative overflow-hidden">
                        {product.display_image ? (
                          <img
                            src={getImageUrl(product.display_image, true)}
                            alt={product.product_name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">{product.product_name}</span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end justify-between">
                          <h3 className="text-xl font-bold text-white">{product.product_name}</h3>
                          <div className="bg-white/20 p-2 rounded-full text-white group-hover:bg-white/30 transition">
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      {viewMode === 'list' && (
                        <div className="p-6">
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {product.product_description.replace(/[#*]/g, '').substring(0, 150)}...
                          </p>
                        </div>
                      )}
                    </Link>
                  </Fragment>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
  <div className="flex justify-center mt-12">
    <div className="flex items-center space-x-2">
      {/* Previous */}
      <button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        {t('products.previous')}
      </button>

      {/* Page numbers (desktop only) */}
      <div className="hidden sm:flex space-x-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-3 py-2 rounded-lg ${
              currentPage === idx + 1
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        {t('products.next')}
      </button>
    </div>
  </div>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
