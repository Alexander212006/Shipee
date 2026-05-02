import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { LoginForm } from '@/features/auth/pages/LoginPage';
import { SignUpForm } from '@/features/auth/pages/SignUpPage';
import { CartSummaryPage } from '@/features/cart/pages/CartSummaryPage';
import { ProductDetailsPage } from '@/features/products/pages/ProductDetailsPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace/> },
      { path: 'login', element: <LoginForm /> },
      { path: 'signup', element: <SignUpForm /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailsPage /> },
      { path: 'cart/summary', element: <CartSummaryPage /> },
    ],
  },
]);
