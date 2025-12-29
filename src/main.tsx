import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './i18n';

// Ensure DaisyUI light theme persists
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'light');
  // Also set on body as fallback
  if (document.body) {
    document.body.setAttribute('data-theme', 'light');
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
