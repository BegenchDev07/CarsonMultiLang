import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { productsApi, Solution } from '../services/api';

const SolutionsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true);
        const solutionsData = await productsApi.getSolutions();
        // Limit to first 3 solutions
        setSolutions(solutionsData.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch solutions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.outerWidth;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.outerWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!isDesktop) {
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
    }
  }, [solutions, isDesktop]);

  const getImageUrlForSolution = (image: any): string => {
    if (!image) return '';
    
    // Handle nested data structure - {data: {url: ...}}
    if (image.data?.url) {
      return `https://api.skyelectronica.com/${image.data.url}`;
    }
    
    // Handle direct Image type (if data is already extracted)
    if (image.url && !image.data) {
      return `https://api.skyelectronica.com/${image.url}`;
    }
    
    // Handle if data is null but structure exists
    if (image.data === null) {
      return '';
    }
    
    return '';
  };

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Loader className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (solutions.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="solutions-heading">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="solutions-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('solutions.banner.title') || 'Solutions'}
          </h2>
        </div>

        {/* Desktop: Row Layout | Mobile/Tablet: Scrollable Carousel */}
        {isDesktop ? (
          /* Desktop Row Layout: Title, Image, Description */
          <div className="w-full flex lg:flex-row flex-col items-stretch justify-center gap-4 pb-4">
            {solutions.map((solution: Solution) => (
              <Link
                key={solution.documentId}
                to={`/solutions/${solution.slug || solution.documentId}`}
                className="card bg-base-100 w-full lg:w-[30rem] shadow-sm h-full flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="card-body flex-grow flex flex-col">
                  <h2 className="w-full text-center text-2xl font-semibold mb-4">
                    {solution.title}
                  </h2>
                  {solution.display_image && (
                    <figure className="flex-shrink-0 mb-4">
                      <img
                        src={getImageUrlForSolution(solution.display_image)}
                        alt={solution.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </figure>
                  )}
                  <p className="line-clamp-2 flex-grow text-gray-600">
                    {solution.short_description || solution.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Mobile/Tablet Scrollable Carousel: Image, Title, Description */
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
                {solutions.map((solution: Solution) => (
                  <Link
                    key={solution.documentId}
                    to={`/solutions/${solution.slug || solution.documentId}`}
                    className="card bg-base-100 w-[90vw] sm:w-[90vw] md:w-[90vw] shadow-sm h-full flex flex-col flex-shrink-0 hover:shadow-lg transition-shadow"
                  >
                    {solution.display_image && (
                      <figure className="flex-shrink-0">
                        <img
                          src={getImageUrlForSolution(solution.display_image)}
                          alt={solution.title}
                          className="w-full h-64 object-cover"
                        />
                      </figure>
                    )}
                    <div className="card-body flex-grow flex flex-col">
                      <h2 className="w-full text-center text-2xl font-semibold mb-4">
                        {solution.title}
                      </h2>
                      <p className="line-clamp-2 flex-grow text-gray-600">
                        {solution.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsSection;

