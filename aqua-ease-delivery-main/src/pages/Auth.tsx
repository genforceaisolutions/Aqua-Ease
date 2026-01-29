
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState<'user' | 'seller'>('user');
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRegister(params.get('register') === 'true');
    
    // Get user type from URL params (default to 'user' if not specified)
    const type = params.get('type');
    setUserType((type === 'seller' ? 'seller' : 'user') as 'user' | 'seller');
  }, [location.search]);
  
  // For demo purposes only - remove in production
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = false; // This would be a real auth check
    if (isAuthenticated) {
      if (userType === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate, userType]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">
              {isRegister ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isRegister 
                ? `Join AquaEase as a ${userType === 'seller' ? 'seller' : 'customer'} for hassle-free water delivery`
                : `Sign in to your AquaEase ${userType === 'seller' ? 'seller' : 'customer'} account`}
            </p>
          </div>
          
          {isRegister ? (
            <RegisterForm userType={userType} />
          ) : (
            <LoginForm userType={userType} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
