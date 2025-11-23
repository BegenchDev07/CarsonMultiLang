import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// import remarkYoutube from 'remark-youtube';
import { productsApi } from '../services/api';
import { useMediaQuery } from 'react-responsive'; // For mobile responsiveness

const UseCaseDetailPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { id } = useParams<{ id: string }>();  
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);    

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
        const productData:any = await productsApi.getUseCase(id);                                    
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
            to="/use-cases"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('productDetail.useCases')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    {
        !isMobile &&
      <div className='z-50 fixed bottom-8 right-4'>
        <a href='https://wa.link/dunvqk' className='flex items-center justify-center text-xl font-semibold gap- rounded-xl text-white'>          
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
            <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
          </svg>
        </a>
      </div>
    }
    <div className={`pt-20 min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            
            <div className='w-full h-1/3 flex flex-col items-center justify-center py-4'>                
                <img 
                className='object-cover w-full h-96 rounded-xl'
                src={"https://api.skyelectronica.com"+product.display_image?.url} 
                alt="" />
                <h1 className='w-full text-center my-4 text-4xl font-bold'>{product.title}</h1>
            </div>
            <div className="prose prose-gray max-w-none mb-10 leading-relaxed text-gray-700 dark:prose-invert">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                    h1: ({ children }) => (
                        <h1
                        className={
                            isRTL
                            ? "w-full text-start text-3xl font-bold text-gray-900 mb-5 border-b pb-2"
                            : "text-3xl font-bold text-gray-900 mb-5 border-b pb-2"
                        }
                        >
                        {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2
                        className={
                            isRTL
                            ? "w-full text-start text-2xl font-semibold text-gray-900 mt-8 mb-4"
                            : "text-2xl font-semibold text-gray-900 mt-8 mb-4"
                        }
                        >
                        {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3
                        className={
                            isRTL
                            ? "w-full text-start text-xl font-semibold text-gray-800 mt-6 mb-3"
                            : "text-xl font-semibold text-gray-800 mt-6 mb-3"
                        }
                        >
                        {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p
                        className={
                            isRTL
                            ? "w-full text-start text-gray-700 leading-relaxed mb-5"
                            : "text-gray-700 leading-relaxed mb-5"
                        }
                        >
                        {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul
                        className={`list-disc mb-5 pl-6 space-y-1 ${
                            isRTL ? "list-inside w-full text-start" : ""
                        }`}
                        >
                        {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol
                        className={`list-decimal mb-5 pl-6 space-y-1 ${
                            isRTL ? "list-inside w-full text-start" : ""
                        }`}
                        >
                        {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li
                        className={
                            isRTL
                            ? "text-gray-700 w-full text-start leading-relaxed"
                            : "text-gray-700 leading-relaxed"
                        }
                        >
                        {children}
                        </li>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-gray-700">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote
                        className={`border-l-4 border-blue-500 bg-blue-50 text-gray-700 italic rounded-lg p-4 my-5 ${
                            isRTL ? "border-r-4 border-l-0 pr-4 w-full text-start" : "pl-4"
                        }`}
                        >
                        {children}
                        </blockquote>
                    ),
                    // 🧩 FIXED IMAGE RENDERER — no nested <div>
                    img: ({ src, alt }) => (
                        <img
                        src={src}
                        alt={alt}
                        className="my-6 rounded-lg shadow-md max-h-[480px] object-contain mx-auto block"
                        />
                    ),      
                    a: ({ href, children }) => (
                        <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                        >
                        {children}
                        </a>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-gray-200 text-left">
                            {children}
                        </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border-b border-gray-200 bg-gray-50 px-4 py-2 font-semibold text-gray-900">
                        {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border-b border-gray-100 px-4 py-2 text-gray-700">
                        {children}
                        </td>
                    ),
                    }}
                >
                    {product.content}
                </ReactMarkdown>
            </div>
        </div>
    </div>

    </>
  );
};

export default UseCaseDetailPage;