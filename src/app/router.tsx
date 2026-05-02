import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { LoginForm } from '@/features/auth/pages/LoginPage';
import { SignUpForm } from '@/features/auth/pages/SignUpPage';
import { CheckoutPage } from '@/features/checkout/pages/CheckoutPage';
import { CartSummaryPage } from '@/features/cart/pages/CartSummaryPage';
import { ProductDetailsPage } from '@/features/products/pages/ProductDetailsPage';
import { ProductsPage } from '@/features/products/pages/ProductsPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { PublicRoute } from '@/features/auth/components/PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/login" replace/> },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        ),
      },
      {
        path: 'signup',
        element: (
          <PublicRoute>
            <SignUpForm />
          </PublicRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'products/:productId',
        element: (
          <ProtectedRoute>
            <ProductDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart/summary',
        element: (
          <ProtectedRoute>
            <CartSummaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
