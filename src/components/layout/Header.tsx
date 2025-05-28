import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, Menu, Bell, X, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Format date as MMM DD, YYYY
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-3 
                ${isScrolled ? 'bg-midnight shadow-lg' : 'bg-midnight-200/80 backdrop-blur-md'}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            <Building className="h-8 w-8 text-wayne-blue" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-100">WAYNE TERMINAL</h1>
              <p className="text-xs text-gray-400">Financial Command Center</p>
            </div>
          </Link>
        </div>

        {/* Time and date display */}
        <div className="hidden md:flex flex-col items-center">
          <p className="text-lg font-mono text-wayne-blue">{formattedTime}</p>
          <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-wayne-blue transition-colors">Dashboard</Link>
          <Link to="/portfolio" className="text-gray-300 hover:text-wayne-blue transition-colors">Portfolio</Link>
          <Link to="/market" className="text-gray-300 hover:text-wayne-blue transition-colors">Market</Link>
          <Link to="/enterprises" className="text-gray-300 hover:text-wayne-blue transition-colors">Enterprises</Link>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-midnight-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-400" />
            </button>
            <button className="flex items-center justify-center h-9 w-9 bg-wayne-blue rounded-full">
              <User className="h-5 w-5 text-white" />
            </button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-400 hover:text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 py-3 border-t border-midnight-100">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="px-2 py-2 text-gray-300 hover:bg-midnight-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/portfolio" 
              className="px-2 py-2 text-gray-300 hover:bg-midnight-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/market" 
              className="px-2 py-2 text-gray-300 hover:bg-midnight-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Market
            </Link>
            <Link 
              to="/enterprises" 
              className="px-2 py-2 text-gray-300 hover:bg-midnight-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Enterprises
            </Link>
          </div>
          
          <div className="mt-4 pt-3 border-t border-midnight-100 flex items-center justify-between">
            <p className="text-sm text-gray-400">{formattedDate} | {formattedTime}</p>
            <button className="p-2 rounded-full hover:bg-midnight-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;