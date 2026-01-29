
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Hero = () => {
  // Animation state
  const [isAnimated, setIsAnimated] = useState(false);
  
  // Trigger animation on component mount
  useState(() => {
    setIsAnimated(true);
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50/50 pt-32 pb-20 md:pt-40 md:pb-24">
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-[500px] w-[500px] rounded-full bg-aqua-100/30 blur-3xl"></div>
        <div className="absolute -left-10 top-1/3 h-[300px] w-[300px] rounded-full bg-aqua-50/50 blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className={`space-y-6 transition-all duration-700 ease-out ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center rounded-full border border-aqua-200 bg-aqua-50/50 px-3 py-1 text-sm text-aqua-700">
              <span className="font-medium">Hassle-free water delivery</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Water delivery,{' '}
              <span className="bg-gradient-to-r from-aqua-500 to-blue-500 bg-clip-text text-transparent">
                simplified
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground md:text-xl">
              Order water cans for your apartment with just one tap. No more calls, 
              no more waiting. Get water delivered when you need it.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Link to="/auth?register=true">
                <Button 
                  size="lg" 
                  className="bg-aqua-500 hover:bg-aqua-600 text-white transition-all btn-ripple"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-aqua-200 bg-white hover:bg-aqua-50 transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-x-2">
                  <Check className="h-4 w-4 text-aqua-500" />
                  <span>One-tap ordering</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Check className="h-4 w-4 text-aqua-500" />
                  <span>Real-time tracking</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Check className="h-4 w-4 text-aqua-500" />
                  <span>Scheduled deliveries</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 ease-out delay-300 ${
            isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative mx-auto aspect-square max-w-[500px]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-aqua-50 to-blue-50 shadow-xl"></div>
              <div className="absolute inset-2 rounded-2xl overflow-hidden glass">
                <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-aqua-700">AquaEase</div>
                    <div className="text-sm font-medium text-aqua-500">12:45 PM</div>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  {/* App interface mockup */}
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-medium">Water Can</div>
                      <div className="text-aqua-600 font-semibold">₹30</div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <Button className="bg-aqua-500 hover:bg-aqua-600 text-white text-sm flex-grow">
                        Order Now
                      </Button>
                      <Button variant="outline" className="border-aqua-200 text-sm">
                        Schedule
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="font-medium mb-2">Delivery Status</div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-aqua-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-aqua-600">Out for delivery</span>
                      <span className="text-muted-foreground">12 mins</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-sm text-muted-foreground">Delivery Address</div>
                    <div className="font-medium">Block B, Apartment 305</div>
                    <div className="text-sm text-muted-foreground mt-1">Green Valley Apartments</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-12 -right-6 h-20 w-20 rounded-full bg-aqua-100/90 animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-12 -left-6 h-12 w-12 rounded-full bg-blue-100/80 animate-float" style={{ animationDelay: '1.2s' }}></div>
              <div className="absolute top-1/3 -left-10 h-16 w-16 rounded-full border border-aqua-200 animate-float" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
