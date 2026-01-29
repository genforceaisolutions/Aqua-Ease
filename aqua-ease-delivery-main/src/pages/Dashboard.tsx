
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OrderPanel from '@/components/dashboard/OrderPanel';
import OrderHistory from '@/components/dashboard/OrderHistory';
import ScheduleOrder from '@/components/dashboard/ScheduleOrder';
import { ShoppingCart, Clock, ClipboardList, Bell, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get user data
    setTimeout(() => {
      setUserName('John Doe');
      setIsLoading(false);
    }, 1000);
  }, []);
  
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
                    <>Welcome back, {userName}</>
                  )}
                </h1>
                <p className="text-muted-foreground mt-1">Manage your water deliveries</p>
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
                <div className="w-10 h-10 rounded-full bg-aqua-100 flex items-center justify-center mr-3">
                  <ShoppingCart className="h-5 w-5 text-aqua-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="font-semibold">{isLoading ? '...' : '12'}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Next Delivery</div>
                  <div className="font-semibold">{isLoading ? '...' : 'Not Scheduled'}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <ClipboardList className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Subscription</div>
                  <div className="font-semibold">{isLoading ? '...' : 'None'}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-border flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Bell className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Notifications</div>
                  <div className="font-semibold">{isLoading ? '...' : '2 New'}</div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <Tabs defaultValue="order" className="animate-fade-in">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="order">Quick Order</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>
          <TabsContent value="order">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <OrderPanel />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <OrderHistory />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="schedule">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-1 animate-slide-up">
                <ScheduleOrder />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:col-span-2 animate-slide-up">
                <OrderHistory />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
