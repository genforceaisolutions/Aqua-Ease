
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Check, 
  ChevronRight, 
  CircleDot,
  Clock
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ScheduleOrder = () => {
  const [selectedFrequency, setSelectedFrequency] = useState('weekly');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedTime, setSelectedTime] = useState('morning');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const frequencies = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
  ];
  
  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ];
  
  const times = [
    { id: 'morning', label: 'Morning (8AM - 11AM)' },
    { id: 'afternoon', label: 'Afternoon (12PM - 3PM)' },
    { id: 'evening', label: 'Evening (4PM - 7PM)' },
  ];
  
  const handleSchedule = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Schedule set successfully!",
        description: `Your water delivery is scheduled ${selectedFrequency === 'daily' ? 'every day' : 
          selectedFrequency === 'weekly' ? `every ${selectedDay}` : 'monthly'} in the ${selectedTime}.`,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  // Helper function to safely click on tab triggers
  const clickTabTrigger = (value: string) => {
    const element = document.querySelector(`[data-value="${value}"]`) as HTMLElement;
    if (element) {
      element.click();
    }
  };
  
  return (
    <Card className="border-border/40 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Schedule Delivery</CardTitle>
        <CardDescription>Set up recurring water deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="frequency" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="frequency">Frequency</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frequency" className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {frequencies.map((frequency) => (
                <div
                  key={frequency.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedFrequency === frequency.id 
                      ? 'border-aqua-500 bg-aqua-50/50 text-aqua-700' 
                      : 'border-border hover:border-aqua-200 hover:bg-aqua-50/30'
                  }`}
                  onClick={() => setSelectedFrequency(frequency.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 ${
                      selectedFrequency === frequency.id ? 'bg-aqua-500' : 'border border-muted-foreground'
                    }`}>
                      {selectedFrequency === frequency.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span>{frequency.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            
            {selectedFrequency && (
              <div className="flex justify-end">
                <Button 
                  variant="link" 
                  className="text-aqua-600"
                  onClick={() => clickTabTrigger('day')}
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="day" className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {selectedFrequency === 'weekly' && days.map((day) => (
                <div
                  key={day.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedDay === day.id 
                      ? 'border-aqua-500 bg-aqua-50/50 text-aqua-700' 
                      : 'border-border hover:border-aqua-200 hover:bg-aqua-50/30'
                  }`}
                  onClick={() => setSelectedDay(day.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 ${
                      selectedDay === day.id ? 'bg-aqua-500' : 'border border-muted-foreground'
                    }`}>
                      {selectedDay === day.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span>{day.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
              
              {selectedFrequency !== 'weekly' && (
                <div className="p-4 text-center text-muted-foreground">
                  {selectedFrequency === 'daily' 
                    ? 'Daily delivery will occur every day of the week.' 
                    : 'Monthly delivery will occur on the same date each month.'}
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="link" 
                className="text-aqua-600"
                onClick={() => clickTabTrigger('frequency')}
              >
                <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back
              </Button>
              <Button 
                variant="link" 
                className="text-aqua-600"
                onClick={() => clickTabTrigger('time')}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="time" className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              {times.map((time) => (
                <div
                  key={time.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedTime === time.id 
                      ? 'border-aqua-500 bg-aqua-50/50 text-aqua-700' 
                      : 'border-border hover:border-aqua-200 hover:bg-aqua-50/30'
                  }`}
                  onClick={() => setSelectedTime(time.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-3 ${
                      selectedTime === time.id ? 'bg-aqua-500' : 'border border-muted-foreground'
                    }`}>
                      {selectedTime === time.id && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span>{time.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="link" 
                className="text-aqua-600"
                onClick={() => clickTabTrigger('day')}
              >
                <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back
              </Button>
              <Button 
                className="bg-aqua-500 hover:bg-aqua-600 transition-all btn-ripple"
                onClick={handleSchedule}
                disabled={isSubmitting}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Setting Schedule...' : 'Set Schedule'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-sm font-medium mb-2">Current Schedule</div>
          <div className="flex items-start space-x-3">
            <CircleDot className="w-5 h-5 text-aqua-500 mt-0.5" />
            <div>
              <p className="text-sm">No active schedules</p>
              <p className="text-xs text-muted-foreground mt-1">
                Set up a schedule above to receive regular deliveries
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleOrder;
