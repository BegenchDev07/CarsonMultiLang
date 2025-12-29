import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkYoutube from 'remark-youtube';
import { productsApi, BlogType } from '../services/api';
import { useMediaQuery } from 'react-responsive'; // For mobile responsiveness

const BlogDetailPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { id } = useParams<{ id: string }>();  
  const [product, setProduct] = useState<BlogType | null>(null);
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
        const productData:any = await productsApi.getBlog(id);                            
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
            to="/blog"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('productDetail.backToBlogs')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>

    <div className={`pt-20 min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
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

export default BlogDetailPage;