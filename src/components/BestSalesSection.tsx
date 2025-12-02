import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi, Product, getImageUrl } from '../services/api';
import GetQuoteModal from './GetQuoteModal';

interface BestSalesMode{
  mode: string;
}

const BestSalesSection: React.FC<BestSalesMode> = ({mode}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const fetchBestSeller = async() => {
    const bestSellers = await productsApi.getBestSellerProducts();                        
    setProducts(bestSellers);
  }

  const fetchRadioJammers = async() => {
    const bestSellers = (await productsApi.getRadioJammers()).slice(0,4);                         
    setProducts(bestSellers);
  }

  const fetchAccessories = async() => {
    const bestSellers = (await productsApi.getAccessories()).slice(0,4);                  
    setProducts(bestSellers);
  }

  const linkGen = () => {
    if(mode === "best seller"){
      return "drones"
    } else if(mode === "radio jammer"){
      return "radio-jam"
    } else if(mode === "accessories"){
      return "accessories"
    } else {
      return "drones"
    }
  }  

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        if(mode === 'best seller'){
          fetchBestSeller();
        } else if(mode === "radio jammer"){
          fetchRadioJammers();
        } else if(mode === "accessories"){
          fetchAccessories();
        } else {
          fetchBestSeller();
        }
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
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {products.map((product) => (
              <div
                key={product.documentId}
                className="flex flex-col items-center justify-center gap-5 bg-white w-full min-w-[400px] rounded-lg"
              >                
                {/* Product Image */}
                <div>
                  {product.display_image ? (
                    <img
                    src={getImageUrl(product.display_image, true)}
                    alt={product.product_name}
                    loading="lazy"
                    decoding="async"
                    width="320"
                    height="288"
                    className="w-full h-full object-cover transition-transform duration-500 p-1 max-h-[300px] max-w-[320px]" // Set max width here
                  />
                  
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {product.product_name}
                      </span>
                    </div>
                  )}
                </div>   
                <div className='w-full h-full p-4 flex flex-col items-center justify-between gap-3'>
                  <div className='flex flex-col gap-2'>
                    <h2 className="text-lg lg:text-2xl font-medium line-clamp-2 text-black text-center">{product.product_name}</h2>
                    <p className='line-clamp-2 text-black text-center'>{product.product_description?.replace(/[#*]/g, '').substring(0, 100)}</p>
                  </div>
                  <div className='w-full flex flex-col items-center justify-between gap-3'>
                    <Link
                    className="w-full h-12 py-2 px-4 border border-blue-700 bg-blue-600 text-white rounded-full text-center flex items-center justify-center hover:bg-blue-700 hover:text-white"  
                    data-discover="true"
                    aria-label={`Learn more about ${product.product_name}`}
                    to={`/${linkGen()}/${product.slug}`}
                    >
                    <p>Learn More</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-2 h-4 w-4"><path d="m9 18 6-6-6-6"></path>
                    </svg>
                    </Link>
                    <button 
                    className="w-full h-12 py-2 px-4 border border-blue-700 bg-blue-600 text-white rounded-full text-center flex items-center justify-center hover:bg-blue-700 hover:text-white"  
                    onClick={_=>{setIsQuoteModalOpen(!isQuoteModalOpen)}}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>             
              </div>
            ))}
          </div>
        </div>

        {/* View All Products Button */}        
      </div>
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
};

export default BestSalesSection;