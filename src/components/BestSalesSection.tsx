import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi, getImageUrl } from '../services/api';
import GetQuoteModal from './GetQuoteModal';

interface BestSalesMode{
  mode: string;
}

const BestSalesSection: React.FC<BestSalesMode> = ({mode}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const fetchBestSeller = async() => {
    const bestSellers = await productsApi.getBestSellerProducts();                        
    setProducts(bestSellers);
  }

  const fetchRadioJammers = async() => {
    const bestSellers = await productsApi.getRadioJammers();                         
    setProducts(bestSellers);
  }

  const fetchAccessories = async() => {
    const bestSellers = await productsApi.getAccessories();                  
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

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth || window.innerWidth;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth || window.innerWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };  

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

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [products]);

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

        {/* Gallery Container with Scroll Buttons */}
        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
          >
            <div className="flex gap-6 pb-4">
              {products.map((product) => (
              <div
                key={product.documentId}
                className="flex flex-col items-center justify-center gap-5 bg-white w-full min-w-[400px] rounded-lg"
              >                
                {/* Product Image */}
                <div>
                  {(() => {
                    // Helper function to check if image is valid
                    const isValidImage = (img: any): boolean => {
                      if (!img) return false;
                      // Check for direct Image type (from drones) - has url property directly
                      if (img.url && !img.data) return true;
                      // Check for nested data structure - {data: {url: ...}}
                      if (img.data?.url) return true;
                      return false;
                    };

                    // Get image URL helper
                    const getImageUrlForProduct = (image: any): string => {
                      if (!image) return '';
                      // Handle direct Image type (from drones) - has url property directly
                      if (image.url && !image.data) {
                        return getImageUrl(image, true);
                      }
                      // Handle nested data structure (from radio jammers and accessories) - {data: {url: ...}}
                      if (image.data?.url) {
                        return `https://api.skyelectronica.com/${image.data.url}`;
                      }
                      return '';
                    };

                    // Prioritize best_seller_image, fallback to display_image
                    // debugger;
                    const imageToUse = (product.best_seller_image && isValidImage(product.best_seller_image)) 
                      ? product.best_seller_image 
                      : product.display_image;

                    if (imageToUse && isValidImage(imageToUse)) {
                      return (
                        <img
                          src={getImageUrlForProduct(imageToUse)}
                          alt={product.product_name}
                          loading="lazy"
                          decoding="async"
                          width="320"
                          height="288"
                          className="w-full h-full object-cover transition-transform duration-500 p-1 max-h-[300px] max-w-[320px]"
                        />
                      );
                    } else {
                      return (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xl">
                            {product.product_name}
                          </span>
                        </div>
                      );
                    }
                  })()}
                </div>   
                <div className='w-full h-full p-4 flex flex-col items-center justify-between gap-3'>
                  <div className='flex flex-col gap-8'>
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
                    <a
                    href="mailto:service@skyelectronica.com"
                    className="w-full h-12 py-2 px-4 border border-blue-700 bg-blue-600 text-white rounded-full text-center flex items-center justify-center hover:bg-blue-700 hover:text-white cursor-pointer"  
                    >
                      Request Quote
                    </a>
                  </div>
                </div>             
              </div>
              ))}
            </div>
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