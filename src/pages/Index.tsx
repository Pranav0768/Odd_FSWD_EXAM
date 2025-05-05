
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Users, Award } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/events');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-md bg-eventPurple text-white font-bold">
              CE
            </div>
            <span className="text-xl font-bold"> Campus Events</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-eventPurple text-eventPurple hover:bg-eventPurple hover:text-white"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-eventPurple hover:bg-eventPurple/90">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-100 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-eventPurple to-eventTeal">
              College Event Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              A comprehensive platform to manage, discover, and participate in events at your college campus.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-eventPurple hover:bg-eventPurple/90"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-eventPurple text-eventPurple hover:bg-eventPurple hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg bg-white shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-eventPurple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Event Management</h3>
                <p className="text-gray-600">
                  Create, edit, and manage various types of college events with ease.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg bg-white shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-eventPurple" />
                </div>
                <h3 className="text-xl font-bold mb-3">User Authentication</h3>
                <p className="text-gray-600">
                  Secure login system ensures only authorized users can create and manage events.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg bg-white shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-eventPurple" />
                </div>
                <h3 className="text-xl font-bold mb-3">Event Showcase</h3>
                <p className="text-gray-600">
                  Display events with rich details, images, and information for better engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-eventPurple to-eventTeal">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to manage your college events?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join now and start creating, organizing, and managing your college events effortlessly.
            </p>
            <Link to="/register">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-eventPurple hover:bg-gray-100"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="p-1.5 rounded-md bg-white text-eventPurple font-bold">
                CE
              </div>
              <span className="text-lg font-semibold">Campus Events</span>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} College Event Hub | 23IT043
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
