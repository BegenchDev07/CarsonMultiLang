import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Share2, CheckCircle, Loader, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkYoutube from 'remark-youtube';
import GetQuoteModal from '../components/GetQuoteModal';
import ScaledModal from '../components/ScaledModal';
import { productsApi, Product, getImageUrl } from '../services/api';
import { useMediaQuery } from 'react-responsive'; // For mobile responsiveness
import BestSalesSection from '../components/BestSalesSection';

const AccessoriesDetailPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal state

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productData:any = await productsApi.getAccessory(id);                            
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Get all images for the product (display_image + secondary_images)
  const getAllImages = () => {
    if (!product) return [];
    const images = [];    
    if (product.display_image) {
      images.push(product.display_image);
    }
    if (product.secondary_images) {    
      images.push(...product.secondary_images);
    }
    return images;
  };

  const allImages = getAllImages();

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowCopyNotification(true);
      setTimeout(() => setShowCopyNotification(false), 2000);
    }
  };

  const copySpecs = () => {
    const text = markdownToText(product?.specification);
    Promise.resolve(navigator.clipboard.writeText(text))
    .then(_ => {
      setShowCopyNotification(!showCopyNotification)
      setTimeout(() => setShowCopyNotification(false), 2000);
    })
    .catch((err) => {
      console.error(err)
    })
    

  }

  function markdownToText(markdown:any) {
    return markdown
      .replace(/```[\s\S]*?```/g, '')              // remove code blocks
      .replace(/`([^`]*)`/g, '$1')                 // inline code
      .replace(/!\[.*?\]\(.*?\)/g, '')             // images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')     // links
      .replace(/^\s*>+\s?/gm, '')                  // blockquotes
      .replace(/^#{1,6}\s*/gm, '')                 // headings
      .replace(/[*_~]/g, '')                       // emphasis/bold/strike
      .replace(/^(-\s?){3,}$/gm, '')               // horizontal rules
      .replace(/[\/|]+/g, ' ')                     // remove /, |, ||
      .replace(/\n{2,}/g, '\n')                    // collapse extra newlines
      .trim();
  }

  const tabs = [
    { id: 'overview', name: t('productDetail.overview') },
    { id: 'specifications', name: t('productDetail.specifications') }
  ];

  if (loading) {
    return (
      <div className={`pt-20 min-h-screen bg-gray-50 flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('productDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`pt-20 min-h-screen bg-gray-50 flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('common.error')}: {error || t('productDetail.notFound')}</p>
          <Link 
            to="/accessories"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('productDetail.backToJammers')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>    
      <div className={`pt-20 min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        {
          isModalOpen
          &&
          <div 
          className='fixed w-full h-full z-50 px-3 bg-black/50 backdrop-blur-sm flex items-center justify-center' 
          onTouchStart={_=>{
            setIsModalOpen(!isModalOpen)
          }}
          >
            <ScaledModal link={getImageUrl(allImages[selectedImage])}/>
          </div>
        }
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Breadcrumb */}
          <div className={`flex items-center text-sm text-gray-500 mb-4 ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            <Link to="/" className="hover:text-blue-600 transition-colors duration-300">{t('common.home')}</Link>
            <span>/</span>
            <Link to="/accessories" className="hover:text-blue-600 transition-colors duration-300">{t('nav.accessories-gimbals')}</Link>
            <span>/</span>
            <span className="text-gray-900">{product.product_name}</span>
          </div>

          {/* Back Button */}
          <Link
            to="/accessories"
            className={`inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('productDetail.backToAccessories')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                {allImages.length > 0 ? (
                  <img
                    src={getImageUrl(allImages[selectedImage])}
                    alt={product.product_name}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                    onTouchStart={_ => {
                      setIsModalOpen(!isModalOpen);
                    }}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-2xl">
                      {product.product_name}
                    </span>
                  </div>
                )}
              </div>
              {allImages.length > 1 && (
                <div className={isMobile ? 'grid grid-cols-2 gap-2' :'grid grid-cols-4 gap-4'}>
                  {allImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-white rounded-xl p-2 shadow-lg transition-all duration-300 ${
                        selectedImage === index ? 'ring-2 ring-blue-600' : 'hover:shadow-xl'
                      }`}
                    >
                      <img
                        src={getImageUrl(image, true)}
                        alt={`${product.product_name} ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        width="80"
                        height="80"
                        className="w-auto h-auto object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            {
            !isMobile ?
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {product.category?.cateogry_name || t('common.product')}
                    </span>
                    <div className="flex items-center">
                      <button 
                        onClick={handleShare}
                        aria-label={t('common.share', 'Share product link')}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-300 relative"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.product_name}
                  </h1>

                  <div className="text-gray-600 mb-6 leading-relaxed ">
                    <ReactMarkdown                    
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({children}) => <h2 className={ isRTL ? `w-full text-start text-xl font-bold text-gray-900 mb-3` : `text-xl font-bold text-gray-900 mb-3`}>{children}</h2>,
                        h2: ({children}) => <h3 className={ isRTL ? `w-full text-start text-lg font-semibold text-gray-900 mb-2` : `text-lg font-semibold text-gray-900 mb-2`}>{children}</h3>,
                        h3: ({children}) => <h4 className={ isRTL ? `w-full text-start text-base font-semibold text-gray-900 mb-2` : `text-base font-semibold text-gray-900 mb-2`}>{children}</h4>,
                        p: ({children}) => <p className={ isRTL ? `w-full text-start text-gray-600 leading-relaxed mb-3` : 'text-gray-600 leading-relaxed mb-3'}>{children}</p>,
                        ul: ({children}) => <ul className={`list-disc mb-3 space-y-1 text-gray-600 ${isRTL ? 'list-inside w-full text-start' : 'list-inside'}`}>{children}</ul>,
                        li: ({children}) => <li className={isRTL ? `text-gray-600 w-full text-start` : `text-gray-600`}>{children}</li>,
                        strong: ({children}) => <strong className={isRTL ? `w-full text-start font-semibold text-gray-900` : 'font-semibold text-gray-900'}>{children}</strong>,
                        em: ({children}) => <em className={ isRTL ? `italic text-gray-700 w-full text-start` : 'italic text-gray-700'}>{children}</em>,
                        blockquote: ({children}) => <blockquote className={`border-blue-500 italic text-gray-700 bg-blue-50 p-3 rounded-lg my-3 ${isRTL ? 'border-r-4 pr-3 w-full text-start' : 'border-l-4 pl-3'}`}>{children}</blockquote>
                      }}
                    >
                      {product.product_description}
                    </ReactMarkdown>
                  </div>

                  <div className="mb-6">
                    <button 
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      {t('productDetail.requestQuote')}
                    </button>
                  </div>

                  {/* What's Included */}
                  {product.included && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('productDetail.whatsIncluded')}</h3>
                      <p className="text-gray-600">{product.included}</p>
                    </div>
                  )}
                </div>            
            </div>
            :
            <div className="fixed bottom-0 left-0 flex items-center justify-center gap-3 bg-white w-full p-4 z-50">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center"
              >
                {t('productDetail.requestQuote')}
              </button>
              <a 
              href='https://wa.link/dunvqk'
              className="w-full h-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 gap-3 rounded-lg font-semibold text-xl transition-colors duration-300 flex items-center justify-center">          
                {t('nav.contact')}
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                  <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
            }
          </div>
          {
            product.link &&
            <div className="w-full h-auto flex items-center justify-center bg-white rounded-xl mb-16 drop-shadow-xl"> 
              <div className="p-4 h-[50vh] w-full">
                <div className="w-full h-full flex items-center justify-center">                            
                  <iframe className='h-full w-full rounded-xl' 
                  src={product.link} 
                  title="YouTube video player" frameBorder={0} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen={true}
                  />
                </div>
              </div>
            </div>
          }
          {/* Product Details Tabs */}
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="border-b border-gray-200">
              <nav className={`flex px-8 ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className='p-8'>          
              {selectedTab === 'overview' && (
                <div className="space-y-8 flex items-center justify-center">
                  <button
                    onClick={() => window.open(`https://api.skyelectronica.com/`+product?.presentation?.url, '_blank')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {t('productDetail.openBrochure')}
                  </button>
                </div>            
              )}
              {selectedTab === 'specifications' && (
                <>
                    <button
                    className='w-full flex items-center justify-end p-4'
                    onClick={copySpecs}
                    >
                    <Copy />
                    </button>   
                    <div className="prose prose-lg w-full text-gray-600 leading-relaxed overflow-x-auto">
                    <ReactMarkdown
                    remarkPlugins={[remarkGfm,remarkYoutube]} // Enables GFM, including table support
                    components={{
                    h1: ({ children }) => (
                        <h2 className={ isRTL ? `w-full text-start text-xl font-bold text-gray-900 mb-3` : `text-xl font-bold text-gray-900 mb-3`}>{children}</h2>
                    ),
                    h2: ({ children }) => (
                        <h3 className={ isRTL ? `w-full text-start text-lg font-bold text-gray-900 mb-3` : `text-xl font-bold text-gray-900 mb-3`}>{children}</h3>
                    ),
                    h3: ({ children }) => (
                        <h3 className={ isRTL ? `w-full text-start text-base font-bold text-gray-900 mb-3` : `text-xl font-bold text-gray-900 mb-3`}>{children}</h3>
                    ),                
                    p: ({ children }) => (
                        <p className="text-gray-600 leading-relaxed mb-3">{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul
                        className={`list-disc mb-3 space-y-1 text-gray-600 ${
                            isRTL ? "list-inside w-full text-start" : "list-inside"
                        }`}
                        >
                        {children}
                        </ul>
                    ),
                    li: ({ children }) => <li className="text-gray-600">{children}</li>,
                    strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                    blockquote: ({ children }) => (
                        <blockquote
                        className={`border-blue-500 italic text-gray-700 bg-blue-50 p-3 rounded-lg my-3 ${
                            isRTL ? "border-r-4 pr-3" : "border-l-4 pl-3"
                        }`}
                        >
                        {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <table className="table-fixed min-w-max sm:w-full text-gray-600 border-collapse text-center">
                        {children}
                        </table>
                    ),
                    th: ({ children }) => <th className="px-4 py-2 border-b">{children}</th>,
                    td: ({ children }) => <td className="px-4 py-2 border-b">{children}</td>,
                    
                    }}
                >
                    {product.specification}
                    </ReactMarkdown>

                    </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Copy Notification */}
        {showCopyNotification && (
          <div className={`fixed top-24 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center animate-fade-in ${isRTL ? 'left-4' : 'right-4'}`}>
            <CheckCircle className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span className="font-medium">{t('productDetail.linkCopied')}</span>
          </div>
        )}

        <GetQuoteModal 
          isOpen={isQuoteModalOpen} 
          onClose={() => setIsQuoteModalOpen(false)} 
        />
        <BestSalesSection mode='accessories'/>
      </div>
    </>
  );
};

export default AccessoriesDetailPage;