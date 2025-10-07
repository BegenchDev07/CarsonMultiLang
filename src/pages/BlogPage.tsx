import React, { useState, useEffect, Fragment } from 'react';
import { Search, Grid, List, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsApi, getImageUrl, BlogType } from '../services/api';
import { useMediaQuery } from 'react-responsive';

const BlogPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [products, setProducts] = useState<BlogType[]>([]);  
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
        const blogData = await Promise.resolve(productsApi.getBlogs())        
        setProducts(blogData);        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  const filteredProducts = products.filter(product => {    
    
      return selectedCategory === 'all' ||
      (product.blog_title && product.blog_title.toLowerCase() === selectedCategory.toLowerCase());        
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedFeatures, isMobile]);

  // Category counts
  const categoryCounts = [
    { id: 'all', name: t('products.allProducts'), count: products.length },    
  ];

  const dateStringConvert = (date:string) => {
    return new Date(date).toDateString()
  }

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
          

          {/* Main */}
          <div className="flex-1">
            {/* Search + View Mode */}            

            {/* Results Count */}            

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
                      to={`/blog/${product.documentId}`}
                      className="rounded-2xl overflow-hidden flex flex-col"
                    >
                      <div className="overflow-hidden">
                        {product.display_image ? (
                          <img
                            src={getImageUrl(product?.display_image, true)}
                            alt={product.blog_title}
                            className="w-[100vw] h-auto object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">{product.blog_title}</span>                            
                          </div>
                        )}
                        <div className="py-4 flex items-end justify-between">
                            <div className='w-full flex flex-col items-start justify-center gap-2'>
                                <h3 className="text-3xl font-bold text-black">{product.blog_title}</h3>
                                <p className="text-md font-light text-slate-600 line-clamp-2 mb-3">
                                    {product.content?.replace(/[#*]/g, '').substring(0, 100)}...
                                </p>
                                <p className="text-sm font-medium text-black">{dateStringConvert(product.createdAt)}</p>
                            </div>                            
                        </div>
                      </div>                      
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

export default BlogPage;
