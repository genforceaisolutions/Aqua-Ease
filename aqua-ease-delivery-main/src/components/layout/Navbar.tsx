
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'Dashboard', path: '/dashboard', icon: null },
    { name: 'About', path: '/about', icon: null },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-medium text-lg tracking-tight"
          >
            <span className="text-aqua-600 font-bold">Aqua</span>
            <span className="text-foreground">Ease</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-aqua-50 text-aqua-600'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                }`}
              >
                <div className="flex items-center">
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/auth">
              <Button 
                variant="outline" 
                className="border-aqua-200 hover:bg-aqua-50 hover:text-aqua-600 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/auth?register=true">
              <Button 
                className="bg-aqua-500 hover:bg-aqua-600 text-white transition-all duration-300 btn-ripple"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="hover:bg-secondary"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 animate-fade-in">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={closeMenu}
          />
          <div className="relative w-full bg-background border-b border-border shadow-xl animate-slide-down">
            <div className="px-4 py-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium ${
                    location.pathname === link.path
                      ? 'bg-aqua-50 text-aqua-600'
                      : 'hover:bg-secondary'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 pb-3 flex flex-col space-y-2">
                <Link to="/auth" onClick={closeMenu}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-aqua-200 hover:bg-aqua-50"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?register=true" onClick={closeMenu}>
                  <Button 
                    className="w-full justify-start bg-aqua-500 hover:bg-aqua-600 text-white"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
