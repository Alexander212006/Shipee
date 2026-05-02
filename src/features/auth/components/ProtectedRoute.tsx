import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAuthorized } from '../utils/session';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isUserAuthorized()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
