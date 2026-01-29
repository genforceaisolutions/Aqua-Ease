
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, X, Clock, TrendingUp, DollarSign, Package, Bell, LogOut } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  block: string;
  roomNumber: string;
  quantity: number;
  orderDate: string;
  deliveryDate: string | null;
  status: 'pending' | 'accepted' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'verified' | 'failed';
  paymentMethod: 'cash' | 'upi' | 'card' | 'wallet';
}

const SellerDashboard = () => {
  const [sellerName, setSellerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Simulate API call to get seller data and orders
    setTimeout(() => {
      setSellerName('Water Supply Store');
      setOrders([
        {
          id: 'ORD-001',
          customerName: 'John Doe',
          block: 'Block A',
          roomNumber: '101',
          quantity: 2,
          orderDate: '2023-05-15T09:30:00',
          deliveryDate: null,
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'cash'
        },
        {
          id: 'ORD-002',
          customerName: 'Jane Smith',
          block: 'Block B',
          roomNumber: '205',
          quantity: 1,
          orderDate: '2023-05-15T10:15:00',
          deliveryDate: null,
          status: 'accepted',
          paymentStatus: 'verified',
          paymentMethod: 'upi'
        },
        {
          id: 'ORD-003',
          customerName: 'Mike Johnson',
          block: 'Block C',
          roomNumber: '310',
          quantity: 3,
          orderDate: '2023-05-15T08:45:00',
          deliveryDate: null,
          status: 'out_for_delivery',
          paymentStatus: 'verified',
          paymentMethod: 'card'
        },
        {
          id: 'ORD-004',
          customerName: 'Sarah Williams',
          block: 'Block A',
          roomNumber: '102',
          quantity: 2,
          orderDate: '2023-05-14T14:20:00',
          deliveryDate: '2023-05-14T16:30:00',
          status: 'delivered',
          paymentStatus: 'verified',
          paymentMethod: 'cash'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const getPendingOrders = () => orders.filter(order => order.status === 'pending');
  const getAcceptedOrders = () => orders.filter(order => ['accepted', 'out_for_delivery'].includes(order.status));
  const getDeliveredOrders = () => orders.filter(order => order.status === 'delivered');
  
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Accepted</Badge>;
      case 'out_for_delivery':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Out for Delivery</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pending</Badge>;
      case 'verified':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Verified</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, deliveryDate: newStatus === 'delivered' ? new Date().toISOString() : order.deliveryDate } 
          : order
      )
    );
  };
  
  const verifyPayment = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, paymentStatus: 'verified' } 
          : order
      )
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 pt-24 pb-16">
        <header className="mb-8">
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {isLoading ? (
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                  ) : (
                    <>Welcome, {sellerName}</>
                  )}
                </h1>
                <p className="text-muted-foreground mt-1">Manage your water delivery orders</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 sm:mt-0 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pending Orders</div>
                  <div className="font-semibold">{isLoading ? '...' : getPendingOrders().length}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                  <div className="font-semibold">{isLoading ? '...' : getAcceptedOrders().length}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Delivered Today</div>
                  <div className="font-semibold">{isLoading ? '...' : getDeliveredOrders().length}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Revenue Today</div>
                  <div className="font-semibold">{isLoading ? '...' : '₹580'}</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="pending" className="animate-fade-in">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="pending">Pending Orders</TabsTrigger>
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : getPendingOrders().length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No pending orders at the moment.
                  </CardContent>
                </Card>
              ) : (
                getPendingOrders().map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Customer</h4>
                          <p>{order.customerName}</p>
                          <div className="text-sm">
                            <div className="font-medium">{order.block}, Room {order.roomNumber}</div>
                            <div className="text-muted-foreground">Quantity: {order.quantity} can(s)</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Payment</h4>
                          <div className="flex items-center gap-2">
                            <span>Status: </span>
                            {getPaymentStatusBadge(order.paymentStatus)}
                          </div>
                          <div className="text-sm">
                            <div>Method: {order.paymentMethod.toUpperCase()}</div>
                            <div className="text-muted-foreground">
                              Amount: ₹{order.quantity * 40}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:items-end justify-center gap-2">
                          {order.paymentStatus === 'pending' && order.paymentMethod !== 'cash' && (
                            <Button 
                              onClick={() => verifyPayment(order.id)}
                              size="sm"
                              className="w-full md:w-auto"
                            >
                              Verify Payment
                            </Button>
                          )}
                          
                          <div className="flex gap-2 w-full md:w-auto">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1 border-green-200 text-green-600 hover:bg-green-50"
                              onClick={() => updateOrderStatus(order.id, 'accepted')}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : getAcceptedOrders().length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No active orders at the moment.
                  </CardContent>
                </Card>
              ) : (
                getAcceptedOrders().map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Customer</h4>
                          <p>{order.customerName}</p>
                          <div className="text-sm">
                            <div className="font-medium">{order.block}, Room {order.roomNumber}</div>
                            <div className="text-muted-foreground">Quantity: {order.quantity} can(s)</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Payment</h4>
                          <div className="flex items-center gap-2">
                            <span>Status: </span>
                            {getPaymentStatusBadge(order.paymentStatus)}
                          </div>
                          <div className="text-sm">
                            <div>Method: {order.paymentMethod.toUpperCase()}</div>
                            <div className="text-muted-foreground">
                              Amount: ₹{order.quantity * 40}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:items-end justify-center gap-2">
                          {order.status === 'accepted' && (
                            <Button 
                              className="w-full md:w-auto"
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                            >
                              Mark as Out for Delivery
                            </Button>
                          )}
                          
                          {order.status === 'out_for_delivery' && (
                            <Button 
                              className="w-full md:w-auto bg-green-600 hover:bg-green-700"
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Mark as Delivered
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 gap-4">
              {isLoading ? (
                <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : getDeliveredOrders().length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    No completed orders yet.
                  </CardContent>
                </Card>
              ) : (
                getDeliveredOrders().map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Customer</h4>
                          <p>{order.customerName}</p>
                          <div className="text-sm">
                            <div className="font-medium">{order.block}, Room {order.roomNumber}</div>
                            <div className="text-muted-foreground">Quantity: {order.quantity} can(s)</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Payment</h4>
                          <div className="flex items-center gap-2">
                            <span>Status: </span>
                            {getPaymentStatusBadge(order.paymentStatus)}
                          </div>
                          <div className="text-sm">
                            <div>Method: {order.paymentMethod.toUpperCase()}</div>
                            <div className="text-muted-foreground">
                              Amount: ₹{order.quantity * 40}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <div className="text-sm">
                            <h4 className="font-medium text-muted-foreground">Delivered On</h4>
                            <div>{new Date(order.deliveryDate!).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;
