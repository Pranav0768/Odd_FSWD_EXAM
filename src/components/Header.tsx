
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-1.5 rounded-md bg-eventPurple text-white font-bold">
            CE
          </div>
          <span className="hidden text-xl font-bold md:inline-block">Campus Events</span>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/events" className="text-sm font-medium hover:text-eventPurple transition-colors">
                Events
              </Link>
              <Link to="/create-event" className="text-sm font-medium hover:text-eventPurple transition-colors">
                Create Event
              </Link>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm font-medium">
                  <User size={16} />
                  <span>{user?.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="text-sm border-eventPurple text-eventPurple hover:bg-eventPurple hover:text-white"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-eventPurple text-eventPurple hover:bg-eventPurple hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="sm" 
                  className="bg-eventPurple hover:bg-eventPurple/90"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
