
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ShoppingCart, Check, Truck } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  quantity: number;
  status: 'pending' | 'processing' | 'delivered';
  amount: number;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-123456',
          date: '2023-06-15T14:30:00',
          quantity: 2,
          status: 'delivered',
          amount: 60,
        },
        {
          id: 'ORD-123457',
          date: '2023-06-14T10:15:00',
          quantity: 1,
          status: 'delivered',
          amount: 30,
        },
        {
          id: 'ORD-123458',
          date: '2023-06-13T16:45:00',
          quantity: 3,
          status: 'delivered',
          amount: 90,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'processing':
        return <Truck className="h-3 w-3 mr-1" />;
      case 'delivered':
        return <Check className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <Card className="border-border/40 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Recent Orders</CardTitle>
        <CardDescription>View your order history</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg border border-border animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="p-3 rounded-lg border border-border transition-all hover:border-aqua-200 hover:bg-aqua-50/30"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm">
                    {order.id}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`flex items-center text-xs px-2 py-0.5 ${getStatusColor(order.status)}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    {formatDate(order.date)}
                  </div>
                  <div className="flex items-center">
                    <ShoppingCart className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {order.quantity} {order.quantity === 1 ? 'can' : 'cans'}
                    </span>
                    <span className="text-xs font-medium ml-3">
                      ₹{order.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
