import { useState, useEffect, Fragment } from 'react';
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi, UseCase } from '../services/api';
import { useMediaQuery } from 'react-responsive';
import GetQuoteModal from '../components/GetQuoteModal';
import { Link } from 'react-router-dom';

const UseCasePage = () => {    
  const [useCases, setUseCases] = useState<UseCase[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // Pagination states

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [useCase]:any = await Promise.all([
          productsApi.getUseCases(),          
        ]);                
        setUseCases(useCase);        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Pagination logic  

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
    <div className={` text-black min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className='w-full h-full relative'>
            <img 
            className='w-screen h-screen object-cover'
            src="https://www.autelrobotics.com/wp-content/uploads/2024/10/EVO-Lite-PC-banner.webp" 
            alt="banner_picture" />
            <div className="absolute inset-0 bg-transparent">      
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />
            </div>
            <div className='absolute w-full flex flex-col gap-3 items-center justify-center top-[50%]'>
                <h1 className='text-6xl font-bold text-white'>Enhance Your Operations</h1>
                <p className='text-xl text-white font-semibold'>Custom drone services for site surveys, aerial observation and industrial applications</p>
                <button className='px-6 py-3 bg-blue-600 text-xl text-white font-semibold rounded-xl'>{t('nav.getQuote')}</button>
            </div>            
        </div>  
        <div className={`max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className='w-full flex flex-col items-center justify-center py-20'>                
                <h1 className='text-4xl font-bold py-4'>Drone Solutions for Real-World Applications</h1>
                <p className='text-xl font-medium'>Discover how our drones support a variety of operations, including site surveys, crop monitoring, and aerial data collection.</p>
            </div>
            <div 
            className={`max-w-7xl grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} grid-flow-row justify-center content-center gap-5 py-20 mx-auto`}>
                {
                (useCases.length != 0)
                &&
                useCases.map((item:any)=>(
                    <div
                    key={item.documentId}
                    className="flex flex-col items-center justify-center gap-5 bg-white w-full min-w-[400px] rounded-lg"
                  >                
                    {/* Product Image */}
                    <div>
                      {item.display_image ? (
                        <img
                        src={"https://api.skyelectronica.com"+item.display_image.url}
                        alt={item.product_name}
                        loading="lazy"
                        decoding="async"
                        width="320"
                        height="288"
                        className="w-full h-full object-cover transition-transform duration-500 p-1" // Set max width here
                      />
                      
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xl">
                            {item.title}
                          </span>
                        </div>
                      )}
                    </div>   
                    <div className='w-full h-full p-4 flex flex-col items-center justify-between gap-3'>
                      <div className='flex flex-col gap-2'>
                        <h2 className="text-lg lg:text-2xl font-medium line-clamp-2">{item.title}</h2>
                        <p className='line-clamp-2 lg:line-clamp-6'>{item.description?.replace(/[#*]/g, '').substring(0, 100)}</p>
                      </div>
                      <div className='w-full flex flex-col items-center justify-between gap-3'>
                        <Link
                        className="w-full h-12 py-2 px-4 border border-blue-600 text-blue-600 rounded-full text-center flex items-center justify-center"  
                        data-discover="true"
                        to={`/use-cases/${item.slug}`}
                        >
                        <p>Learn More</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right ml-2 h-4 w-4"><path d="m9 18 6-6-6-6"></path>
                        </svg>
                        </Link>
                        <button 
                        className="w-full h-12 py-2 px-4 border border-blue-600 text-blue-600 rounded-full text-center flex items-center justify-center hover:bg-blue-600 hover:text-white"  
                        onClick={_=>{setIsQuoteModalOpen(!isQuoteModalOpen)}}
                        >
                          {t('nav.getQuote')}
                        </button>
                      </div>
                    </div>             
                  </div>
                ))
                }
            </div>
            <div className='flex flex-col items-center justify-center py-20'>                
                <h1 className='text-4xl font-bold py-4'>Take Your Operations to New Heights</h1>
                <p className='max-w-7xl text-center text-xl font-medium'>From industrial projects to agriculture, logistics, media, research, and operational support, our drones provide flexible aerial solutions to make your workflows smarter, safer, and more efficient. Whatever your industry, we deliver practical solutions tailored to your needs.</p>
            </div>
            <div className='flex lg:flex-row flex-col items-center justify-center py-20'>                
                <div className='lg:w-1/2 w-full flex flex-col items-start justify-start'>
                    <p className='text-lg font-light underline decoration-pink-700'>Why Partner with us ?</p>                    
                    <h1 className='text-3xl font-bold'>Unmatched Experience & Performance</h1>                    
                    <div className='w-full flex flex-col items-start justify-center gap-3 py-4'>
                        <h1 className='text-2xl font-semibold'>1. Experienced Across Industries</h1>
                        <p className='font-medium'>
                        We support diverse sectors—industrial sites, agriculture, environmental management, and research—offering aerial solutions that work in everyday operations. 
                        </p>
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-3 py-4'>
                        <h1 className='text-2xl font-semibold'>2. Reliable & Modern Drone Technology</h1>
                        <p className='font-medium'>
                        Our fleet uses advanced, safe, and consistent tools to help you get the job done efficiently and effectively.
                        </p>
                    </div>
                    <div className='w-full flex flex-col items-start justify-center gap-3 py-4'>
                        <h1 className='text-2xl font-semibold'>3. Customized Solutions for Every Business</h1>
                        <p className='font-medium'>
                        Every project is designed around your unique requirements, helping you improve efficiency, save time, and achieve measurable results.
                        </p>
                    </div>
                    
                </div>
                <div className='lg:w-1/2 w-full flex items-start justify-center'>
                    <img 
                    className='size-2/3 object-fit p-4 rounded-md'
                    src="https://api.skyelectronica.com/uploads/Wechat_IMG_1408_7837fd2e19.jpg" 
                    alt="" />
                </div>
            </div>
        </div>
        <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
        />
    </div>
  );
};

export default UseCasePage;
