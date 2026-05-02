import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAuthorized } from '../utils/session';

type PublicRouteProps = {
  children: ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  if (isUserAuthorized()) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};
