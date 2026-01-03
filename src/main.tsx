import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './i18n/I18nContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { EngagementProvider } from './context/EngagementContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <CartProvider>
            <EngagementProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <App />
              </BrowserRouter>
            </EngagementProvider>
          </CartProvider>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>,
);