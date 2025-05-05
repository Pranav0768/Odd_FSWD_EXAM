
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !location.pathname.includes('/login') && !location.pathname.includes('/register')) {
      toast.error('You must be logged in to access this page');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-eventPurple border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated or on login/register pages
  if (isAuthenticated || location.pathname.includes('/login') || location.pathname.includes('/register')) {
    return <>{children}</>;
  }

  // This should never be reached due to the redirect in useEffect
  return null;
};

export default AuthGuard;
