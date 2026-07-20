import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SiteConfigProvider } from './context/SiteConfigContext.tsx';

// Safe global fetch getter/setter patch to prevent platforms/tests trying to mock window.fetch from throwing
// "Uncaught TypeError: Cannot set property fetch of #<Window> which has only a getter"
(function patchGlobalFetch() {
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    let customFetch = originalFetch;
    try {
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: true,
        get() {
          return customFetch;
        },
        set(val) {
          customFetch = val;
        }
      });
    } catch (e) {
      console.warn('Could not patch window.fetch:', e);
    }
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteConfigProvider>
      <App />
    </SiteConfigProvider>
  </StrictMode>,
);
