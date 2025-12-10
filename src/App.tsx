import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyAccountPage from './pages/VerifyAccountPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProductDetailPage from './pages/ProductDetailPage';
import FlashSalePage from './pages/FlashSalePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="flash-sale" element={<FlashSalePage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="verify-email" element={<VerifyAccountPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;