
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Minus, Clock } from 'lucide-react';

const OrderPanel = () => {
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const { toast } = useToast();
  
  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };
  
  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };
  
  const handleOrderNow = () => {
    setIsOrdering(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: `${quantity} water can${quantity > 1 ? 's' : ''} will be delivered soon.`,
      });
      setIsOrdering(false);
      
      // Add ripple effect to the card
      const element = document.getElementById('order-success-card');
      if (element) {
        element.classList.add('animate-pulse');
        setTimeout(() => {
          element.classList.remove('animate-pulse');
        }, 1000);
      }
    }, 1500);
  };
  
  return (
    <Card 
      id="order-success-card" 
      className="border-border/40 shadow-lg transition-all duration-500 hover:shadow-xl"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Quick Order</CardTitle>
        <CardDescription>Order water cans with one tap</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between py-2 px-4 bg-aqua-50/50 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-aqua-100 rounded-full mr-4">
                <ShoppingCart className="h-6 w-6 text-aqua-600" />
              </div>
              <div>
                <div className="font-medium">Water Can</div>
                <div className="text-sm text-muted-foreground">20L Mineral Water</div>
              </div>
            </div>
            <div className="font-semibold text-aqua-700">₹30</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Quantity</div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={incrementQuantity}
                disabled={quantity >= 10}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between font-medium">
            <span>Total Amount</span>
            <span className="text-lg text-aqua-700">₹{(quantity * 30).toFixed(2)}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              className="w-full bg-aqua-500 hover:bg-aqua-600 btn-ripple transition-all"
              onClick={handleOrderNow}
              disabled={isOrdering}
            >
              {isOrdering ? "Placing Order..." : "Order Now"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-aqua-200 hover:bg-aqua-50 transition-all"
            >
              <Clock className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground text-center pt-2">
            Estimated delivery time: 30-45 minutes
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderPanel;
