
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Home, Phone, MapPin, User, Mail, Store } from 'lucide-react';

interface RegisterFormProps {
  userType: 'user' | 'seller';
}

const RegisterForm = ({ userType = 'user' }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    apartmentBlock: '',
    apartmentNumber: '',
    storeName: '',
    storeAddress: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to register the user
      toast({
        title: "Account created!",
        description: `You've successfully registered for AquaEase as a ${userType === 'seller' ? 'seller' : 'customer'}.`,
      });
      
      // Redirect based on user type
      if (userType === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/dashboard');
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-border/30 animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to register for AquaEase as a {userType === 'seller' ? 'seller' : 'customer'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          {userType === 'user' ? (
            <div className="space-y-2">
              <Label>Apartment Details</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="apartmentBlock"
                    name="apartmentBlock"
                    placeholder="Block (e.g., Block A)"
                    value={formData.apartmentBlock}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="apartmentNumber"
                    name="apartmentNumber"
                    placeholder="Room Number (e.g., 101)"
                    value={formData.apartmentNumber}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Store Details</Label>
              <div className="space-y-4">
                <div className="relative">
                  <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="storeName"
                    name="storeName"
                    placeholder="Store Name"
                    value={formData.storeName}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="storeAddress"
                    name="storeAddress"
                    placeholder="Store Address"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-aqua-500 hover:bg-aqua-600 transition-all" 
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          By creating an account, you agree to our{' '}
          <a href="/terms" className="text-aqua-600 hover:text-aqua-700 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-aqua-600 hover:text-aqua-700 underline">
            Privacy Policy
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
