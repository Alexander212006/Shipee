import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { LoginForm } from '@/features/auth/pages/LoginPage';
import { SignUpForm } from '@/features/auth/pages/SignUpPage';
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
    ],
  },
]);
