import { useState, useEffect, Fragment } from 'react';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsApi, getImageUrl, ServiceType } from '../services/api';
import { useMediaQuery } from 'react-responsive';

const ServicesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');    
  const [services, setServices] = useState<ServiceType[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Pagination states


  useEffect(() => {    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData]:any = await Promise.all([
          productsApi.getServices(),          
        ]);
        
        setServices(servicesData);        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

    

  // Reset to first page when filters/search change
  useEffect(() => {    
  }, [isMobile]);

  // Category counts    

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

          {/* Main */}
          <div className="flex-1">
            {/* Search + View Mode */}                                    

            {/* Products Grid */}
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
                <button
                  onClick={() => {
                    // setSearchTerm('');
                    // setSelectedCategory('all');
                    // setSelectedFeatures([]);
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
                {services.map((product:any,index) => (
                  <Fragment key={index}>
                  <div className='flex flex-col items-between justify-start gap-5 p-1'>
                    <div>
                      {product.display_image ? (
                          <img
                            src={getImageUrl(product.display_image, true)}
                            alt={product.product_name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">{product.name}</span>
                          </div>
                        )}
                    </div>
                    <div className='size-full flex flex-col items-center justify-between'>
                      <div className="py-6 flex flex-col gap-3">
                        <h3 className="text-xl font-bold text-black line-clamp-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {product.description.replace(/[#*]/g, '').substring(0, 150)}...
                        </p>
                      </div>
                      <div className='w-full flex flex-col items-start justify-between py-6 gap-5'>
                        <Link
                        to={`/services/${product.documentId}`}
                          className='w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-center'>
                            Learn more
                          </Link>                        
                      </div>
                    </div>
                  </div>                    
                </Fragment>
                ))}
              </div>
            )}
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
