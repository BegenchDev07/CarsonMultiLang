import { useState, useEffect, Fragment } from 'react';
import { Search, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { productsApi, Category, Feature, getImageUrl } from '../services/api';
import { useMediaQuery } from 'react-responsive';
import GetQuoteModal from '../components/GetQuoteModal';
import { useSearchParams } from 'react-router-dom';

type ProductType = 'all' | 'drones' | 'signal-suites' | 'accessories-gimbals';

interface UnifiedProduct {
  id: string;
  product_name: string;
  product_description: string;
  display_image?: any;
  category?: any;
  feature?: any;
  slug: string;
  type: ProductType;
  linkPath: string;
}

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const [unifiedProducts, setUnifiedProducts] = useState<UnifiedProduct[]>([]);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const category:any = searchParams.get("category") || null;
  const feature:any = searchParams.get("feature") || null;

  // Product types - hardcoded
  const productTypes = [
    { id: 'all' as ProductType, name: t('products.productTypes.all') },
    { id: 'drones' as ProductType, name: t('products.productTypes.drones') },
    { id: 'signal-suites' as ProductType, name: t('products.productTypes.signalSuites') },
    { id: 'accessories-gimbals' as ProductType, name: t('products.productTypes.accessoriesGimbals') },
  ];

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isMobile ? 10 : 9;

  const capitalizeWords = (str:any) =>{
    return str.split(' ').map((word:any) => {
      if (word.length === 0) {
        return '';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  // Fetch all product data
  useEffect(() => {
    if(category !== null){
      setSelectedCategory(category);      
    } else if(feature !== null){           
      setSelectedFeatures([capitalizeWords(feature)]);
    }    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          dronesData, 
          radioJammersData, 
          accessoriesData,
          categoriesData, 
          featuresData,
          jammerCategoriesData,
          jammerFeaturesData,
          accessoryCategoriesData,
          accessoryFeaturesData
        ] = await Promise.all([
          productsApi.getProducts(),
          productsApi.getRadioJammers(),
          productsApi.getAccessories(),
          productsApi.getCategories(),
          productsApi.getFeatures(),
          productsApi.getJammerCategories(),
          productsApi.getJammerFeatures(),
          productsApi.getAccessoryCategories(),
          productsApi.getAccessoryFeatures(),
        ]);

        // Combine all products into unified format
        const unified: UnifiedProduct[] = [
          ...dronesData.map(p => ({
            id: p.documentId,
            product_name: p.product_name,
            product_description: p.product_description,
            display_image: p.display_image,
            category: p.category,
            feature: p.feature,
            slug: p.slug,
            type: 'drones' as ProductType,
            linkPath: `/drones/${p.slug}`
          })),
          ...radioJammersData.map(p => ({
            id: p.documentId,
            product_name: p.product_name,
            product_description: p.product_description,
            display_image: p.display_image, // Keep full structure {data: ApiImage | null}
            category: p.jammer_category,
            feature: p.jammer_feature,
            slug: p.slug,
            type: 'signal-suites' as ProductType,
            linkPath: `/signal-suite/${p.slug}`
          })),
          ...accessoriesData.map(p => ({
            id: p.documentId,
            product_name: p.product_name,
            product_description: p.product_description,
            display_image: p.display_image, // Keep full structure {data: ApiImage | null}
            category: p.accessory_category,
            feature: p.accessory_feature,
            slug: p.slug,
            type: 'accessories-gimbals' as ProductType,
            linkPath: `/accessories/${p.slug}`
          }))
        ];

        setUnifiedProducts(unified);

        // Combine all categories and features
        const allCategories = [
          ...categoriesData,
          ...(jammerCategoriesData || []),
          ...(accessoryCategoriesData || [])
        ];
        
        const allFeatures = [
          ...featuresData,
          ...(jammerFeaturesData || []),
          ...(accessoryFeaturesData || [])
        ];

        // Remove duplicates
        const uniqueCategories = Array.from(
          new Map(allCategories.map(cat => {
            const name = (cat as any).cateogry_name || (cat as any).category_name;
            return [name, cat];
          })).values()
        );
        const uniqueFeatures = Array.from(
          new Map(allFeatures.map(feat => [feat.feature_name, feat])).values()
        );

        setCategories(uniqueCategories as Category[]);
        setFeatures(uniqueFeatures);
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
    setCurrentPage(1);
  };

  const filteredProducts = unifiedProducts.filter(product => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProductType =
      selectedProductType === 'all' ||
      product.type === selectedProductType;

    const matchesCategory =
      selectedCategory === 'all' ||
      (product.category && (
        (product.category.cateogry_name && product.category.cateogry_name.toLowerCase() === selectedCategory.toLowerCase()) ||
        ((product.category as any).category_name && (product.category as any).category_name.toLowerCase() === selectedCategory.toLowerCase())
      ));

    const matchesFeatures =
      selectedFeatures.length === 0 ||
      (product.feature && selectedFeatures.includes(product.feature.feature_name));

    return matchesSearch && matchesProductType && matchesCategory && matchesFeatures;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  // Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);    
  }, [searchTerm, selectedCategory, selectedFeatures, selectedProductType, isMobile]);

  // Category counts
  const categoryCounts = [
    { id: 'all', name: t('products.allCategories'), count: unifiedProducts.length },
    ...categories.map(category => {
      const categoryName = category.cateogry_name || (category as any).category_name;
      return {
        id: categoryName.toLowerCase(),
        name: categoryName,
        count: unifiedProducts.filter(product => {
          const prodCategory = product.category;
          return prodCategory && (
            (prodCategory.cateogry_name && prodCategory.cateogry_name.toLowerCase() === categoryName.toLowerCase()) ||
            ((prodCategory as any).category_name && (prodCategory as any).category_name.toLowerCase() === categoryName.toLowerCase())
          );
        }).length,
      };
    }),
  ];

  // Product type counts
  const productTypeCounts = productTypes.map(type => ({
    ...type,
    count: unifiedProducts.filter(p => type.id === 'all' || p.type === type.id).length
  }));

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
    
    // Handle if data is null but structure exists
    if (image.data === null) {
      return '';
    }
    
    // Handle if it's already a full URL
    if (typeof image === 'string') {
      return image;
    }
    
    return '';
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Banner Section - Hero-like without buttons */}
      <section className="relative h-[30rem] md:h-[40rem] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={t('products.banner.image')}
          alt={t('products.banner.alt')}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t('products.banner.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200">
              {t('products.banner.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Product Types Filter Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('products.productTypes.title')}</h2>
          <div className="flex flex-wrap gap-4">
            {productTypeCounts.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedProductType(type.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                  selectedProductType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {type.name} ({type.count})
              </button>
            ))}
          </div>
        </div>

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
            {/* Search */}
            <div className="w-full bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full relative flex-1 max-w-md">
                  <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${isRTL ? 'right-3' : 'left-3'}`} />
                  <input
                    type="text"
                    placeholder={t('products.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  />
                </div>                
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-6">
              {t('products.showing')} {Math.min(startIdx + currentProducts.length, filteredProducts.length)} {t('products.of')} {filteredProducts.length} {t('products.products')}
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
                    setSelectedProductType('all');
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {t('products.clearFilters')}
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                isMobile ? 'grid-cols-2' : 'grid-cols-3'
              }`}>
                {currentProducts.map((product,index) => {
                  const imageUrl = getImageUrlForProduct(product.display_image);
                  return (
                    <Fragment key={index}>
                      <div className='flex flex-col items-between justify-start gap-5 p-1 bg-white rounded-lg shadow-md'>
                        <div>
                          {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={product.product_name}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-lg">
                                <span className="text-blue-600 font-semibold text-lg">{product.product_name}</span>
                              </div>
                            )}
                        </div>
                        <div className='size-full flex flex-col items-center justify-between p-4'>
                          <div className="py-2 flex flex-col gap-3 w-full">
                            <h3 className="text-xl font-bold text-black line-clamp-2">{product.product_name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {product.product_description.replace(/[#*]/g, '').substring(0, 150)}...
                            </p>
                          </div>
                          <div className='w-full flex flex-col items-start justify-between py-4 gap-3'>
                            <Link
                              to={product.linkPath}
                              className='w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors'>
                              {t('products.learnMore')}
                            </Link>
                            <button
                              onClick={(e)=>{
                                e.preventDefault()                    
                                setIsQuoteModalOpen(true)}}
                              className='w-full px-3 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition-colors'>
                              {t('products.inquiry')}
                            </button>
                          </div>
                        </div>
                      </div>                    
                    </Fragment>
                  );
                })}
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
      <GetQuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
};

export default ProductsPage;
