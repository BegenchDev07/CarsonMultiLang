import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { productsApi } from '../services/api';

const UseCasesSection = () => {
  const [useCasesDyno, setUseCases] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar'
  const useCases = [
    {      
      title: t('useCases.camera.title'),
      description:t('useCases.camera.description') ,
      features: ["4K/8K Video Recording", "Gimbal Stabilization", "RAW Photo Capture"],
      size: "large", // Takes 2 columns
      image: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {      
      title: t('useCases.shield.title'),
      description:t('useCases.shield.description') ,
      features: ["Night Vision", "Real-time Streaming", "AI Object Detection"],
      size: "medium",
      image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {      
      title: t('useCases.truck.title'),
      description:t('useCases.truck.description'),
      features: ["Payload up to 10kg", "GPS Navigation", "Weather Resistant"],
      size: "medium",
      image: "https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {      
      title: t('useCases.zap.title'),
      description:t('useCases.zap.description') ,
      features: ["Thermal Imaging", "LiDAR Mapping", "Defect Detection"],
      size: "large",
      image: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
    },
    {      
      title: t('useCases.mapPin.title'),
      description:t('useCases.mapPin.description') ,
      features: ["Centimeter Accuracy", "3D Modeling", "GIS Integration"],
      size: "medium",
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    },
    {    
      title: t('useCases.wrench.title'),
      description:t('useCases.wrench.description') ,
      features: ["Emergency Beacon", "Extended Flight Time", "All-Weather Operation"],
      size: "medium",
      image: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1"
    }
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [useCase]:any = await Promise.all([
          productsApi.getUseCases(),          
        ]);                
        const some = useCase.slice(0,6)                
        // some.map((item:any) => item.size = sizing[Math.floor(Math.random() * sizing.length)])                  
        some.map((item:any,index:number) => item.size = useCases[index].size)
        setUseCases(some);        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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
    <section className="py-24 bg-gray-50" aria-labelledby="use-cases-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="use-cases-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('useCases.main.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('useCases.main.description')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {useCasesDyno.map((useCase:any, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl group cursor-pointer transition-all duration-500 ${
                useCase.size === 'large' 
                  ? 'lg:col-span-2 lg:row-span-2' 
                  : useCase.size === 'medium' 
                  ? 'lg:col-span-1 lg:row-span-1' 
                  : 'lg:col-span-1 lg:row-span-1'
              } ${useCase.size === 'large' ? 'min-h-[400px]' : 'min-h-[300px]'}`}
              role="article"
              aria-labelledby={`use-case-${index}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  // src={"https://api.skyelectronica.com"+useCase.display_image.url}
                  src={"https://api.skyelectronica.com"+useCasesDyno[index].display_image.url}
                  alt={useCase.title}
                  loading="lazy"
                  decoding="async"
                  width={useCases[index].size === 'large' ? "600" : "400"}
                  height={useCases[index].size === 'large' ? "400" : "300"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-end text-white">                
                
                <h3 id={`use-case-${index}`} className={`font-bold text-white mb-3 text-xl`}>
                  {useCase.title}
                </h3>
                
                <p className="text-gray-200 text-sm mb-3 opacity-1000 transition-opacity duration-300">
                  {/* {useCase.description?.replace(/[#*]/g, '').substring(0, 100)} */}
                </p>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
        <div className='w-full flex items-center justify-center mt-10'>
          <a href='/use-cases' className='px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl'>View All Use Cases</a>
        </div>        
      </div>
    </section>
  );
};

export default UseCasesSection;