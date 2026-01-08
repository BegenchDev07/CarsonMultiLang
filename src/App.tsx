import React, { Suspense, lazy, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {UserPlus, Mail} from 'lucide-react'
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive'; // For mobile responsiveness
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const RadioJam = lazy(() => import('./pages/RadioJam'));
const RadioJamDetail = lazy(() => import('./pages/RadioJamDetail'))
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'))
const AccessorieDetailPage = lazy(() => import('./pages/AccessoriesDetailPage'))
const BlogPage = lazy(()=> import('./pages/BlogPage'))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServicesDetailPage = lazy(() => import('./pages/ServicesDetailPage'));
const UseCasePage = lazy(() => import('./pages/UseCasePage'));
const UseCaseDetailPage = lazy(() => import('./pages/UseCaseDetailPage'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ToS = lazy(() => import('./pages/ToS'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


// Error Boundary
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-6">Please try refreshing the page. Your current route is preserved.</p>
          <button
            onClick={() => location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
      <ErrorBoundary>        
        <Router>
          <Helmet>
            <html lang={i18n.language} />
            <title>SkyElectronica - Advanced Drone Technology</title>
            <meta
              name="description"
              content="Leading provider of advanced drone technology and electronics solutions for commercial, industrial, and professional applications worldwide."
            />
          </Helmet>

          <div className="min-h-screen bg-white">
            <Navbar />
            <main>
              <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/drones?category=:id" element={<ProductsPage />} />
                  <Route path="/drones?feature=:id" element={<ProductsPage />} />
                  <Route path="/drones/:id" element={<ProductDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="/signal-suite" element={<ProductsPage />} />
                  <Route path="/signal-suite/:id" element={<RadioJamDetail />} />
                  <Route path="/accessories" element={<ProductsPage />} />
                  <Route path="/accessories/:id" element={<AccessorieDetailPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:id" element={<ServicesDetailPage />} />
                  <Route path="/use-cases" element={<UseCasePage />} />
                  <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
                  <Route path="/solutions" element={<SolutionsPage />} />
                  <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
                  <Route path="/solutions/:id" element={<SolutionsPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<ToS />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            {/* {
              !isMobile &&
              <div className='z-50 fixed bottom-8 right-4'>
                <a target='_blank' href='https://wa.link/dunvqk' className='flex items-center justify-center text-xl font-semibold gap- rounded-xl text-white'>          
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
                    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fillRule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            } */}
            <Footer/>
          </div>
        </Router>
      </ErrorBoundary>
      <div className="fab" dir="ltr">  
      <div aria-label='Contact Us' tabIndex={0} role="button" className="btn btn-lg btn-circle bg-blue-600"><UserPlus/></div>        
        <a aria-label="WhatsApp Link" href='https://wa.link/dunvqk' className="btn btn-lg btn-circle bg-green-600 flex items-center justify-center">
          <svg className='w-auto h-auto' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#FFFFFF"/>
          </svg>
        </a>
        <a aria-label="e-mail to service@skyeletronica.com" href='mailto:service@skyelectronica.com' className="btn btn-lg btn-circle bg-red-600"><Mail /></a>
        {/* <a className="btn btn-lg btn-circle btn-primary">C</a> */}
      </div>


    </div>
  );
}

export default App;
