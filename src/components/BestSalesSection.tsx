import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi, Product, getImageUrl } from '../services/api';

const BestSalesSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const bestSellers = await productsApi.getBestSellerProducts();                        
        setProducts(bestSellers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch best sellers');
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('bestSales.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('bestSales.subtitle')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Loader className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('bestSales.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('bestSales.subtitle')}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">
              {error || 'No best selling products available at the moment.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="best-sales-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="best-sales-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('bestSales.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('bestSales.subtitle')}
          </p>
        </div>

        {/* Gallery Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-4">
            {products.map((product, index) => (
              <div
                key={product.documentId}
                className="w-80 flex-shrink-0"
              >
                <Link
                  to={`/drones/${product.documentId}`}
                  className="block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-72 overflow-hidden">
                    {/* Action Button */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Product Image */}
                    {product.display_image ? (
                      <img
                        src={getImageUrl(product.display_image, true)}
                        alt={product.product_name}
                        loading="lazy"
                        decoding="async"
                        width="320"
                        height="288"
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">
                          {product.product_name}
                        </span>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.product_name}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                        {product.product_description?.replace(/[#*]/g, '').substring(0, 100)}...
                      </p>
                      <div className="flex items-center text-green-400 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        {t('bestSales.availableNow')}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('bestSales.viewAll')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSalesSection;