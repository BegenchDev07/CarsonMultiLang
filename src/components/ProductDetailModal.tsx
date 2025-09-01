import { useState, useEffect } from 'react';

const ProductDetailModal = ({ product, setIsModalOpen }:any) => {
  const [isLandscape, setIsLandscape] = useState(true);

  // Check if the device is in landscape mode
  const checkOrientation = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setIsLandscape(false);
    } else {
      setIsLandscape(true);
    }
  };

  useEffect(() => {
    // Initial check for orientation
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);

    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  if (!isLandscape) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-5xl h-auto rounded-lg shadow-lg overflow-hidden text-center p-4 flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          <p className="text-xl text-gray-900">Please switch to landscape mode to view this content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl h-auto rounded-lg shadow-lg overflow-hidden">
        
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-full text-2xl w-10 h-10 flex items-center justify-center"
          >
            X
          </button>
        </div>

        {/* Iframe container with landscape aspect ratio */}
        <div className="relative w-full pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <iframe
            src={`https://api.skyelectronica.com${product?.presentation.url}`}
            sandbox="allow-same-origin allow-scripts allow-popups"
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
