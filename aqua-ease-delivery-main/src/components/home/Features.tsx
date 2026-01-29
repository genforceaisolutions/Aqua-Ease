
import { useState, useEffect } from 'react';
import { 
  Bell, 
  Clock, 
  CreditCard, 
  Map, 
  Phone, 
  ShoppingCart, 
  Truck, 
  User 
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const Features = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  const features: Feature[] = [
    {
      title: "One-Tap Ordering",
      description: "Order water cans with just one tap. No more phone calls or waiting on hold.",
      icon: <ShoppingCart className="h-10 w-10 text-aqua-500" />,
    },
    {
      title: "Real-Time Tracking",
      description: "Track your order status in real-time from acceptance to delivery.",
      icon: <Truck className="h-10 w-10 text-aqua-500" />,
    },
    {
      title: "User Registration",
      description: "Simple sign-up with phone number and apartment details for faster ordering.",
      icon: <User className="h-10 w-10 text-aqua-500" />,
    },
    {
      title: "Scheduled Orders",
      description: "Set up recurring deliveries daily, weekly, or monthly and never run out.",
      icon: <Clock className="h-10 w-10 text-aqua-500" />,
    },
    {
      title: "Multiple Payment Options",
      description: "Pay with cash, UPI, cards, or digital wallets for complete flexibility.",
      icon: <CreditCard className="h-10 w-10 text-aqua-500" />,
    },
    {
      title: "Push Notifications",
      description: "Get alerts when your order is accepted, out for delivery, or completed.",
      icon: <Bell className="h-10 w-10 text-aqua-500" />,
    },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleItems((prev) => [...prev, index]);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-item').forEach((item) => {
      observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Designed for Convenience
          </h2>
          <p className="text-lg text-muted-foreground">
            AquaEase combines elegant design with practical features to make water delivery effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              data-index={index}
              className={`feature-item p-6 md:p-8 rounded-xl bg-white border border-border transition-all duration-500 ease-out ${
                visibleItems.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-3 bg-aqua-50 inline-flex rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
