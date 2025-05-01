
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";

// Mock data for the chart
const data = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 35 },
  { name: "Mar", value: 25 },
  { name: "Apr", value: 40 },
  { name: "May", value: 30 },
  { name: "Jun", value: 38 },
  { name: "Jul", value: 42 },
  { name: "Aug", value: 32 },
  { name: "Sep", value: 28 },
  { name: "Oct", value: 36 },
  { name: "Nov", value: 40 },
  { name: "Dec", value: 45 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <DashboardLayout>
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60</div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenues (FRW)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">38234000</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67569</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-3">
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Today's trends</CardTitle>
                <div className="flex space-x-2 text-sm">
                  <button 
                    className={`px-2 py-1 ${activeTab === "today" ? "text-orange-500 font-medium" : "text-gray-500"}`}
                    onClick={() => setActiveTab("today")}
                  >
                    Today
                  </button>
                  <button 
                    className={`px-2 py-1 ${activeTab === "week" ? "text-orange-500 font-medium" : "text-gray-500"}`}
                    onClick={() => setActiveTab("week")}
                  >
                    Week
                  </button>
                  <button 
                    className={`px-2 py-1 ${activeTab === "month" ? "text-orange-500 font-medium" : "text-gray-500"}`}
                    onClick={() => setActiveTab("month")}
                  >
                    Month
                  </button>
                  <button 
                    className={`px-2 py-1 ${activeTab === "year" ? "text-orange-500 font-medium" : "text-gray-500"}`}
                    onClick={() => setActiveTab("year")}
                  >
                    Year
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FF9800"
                    fill="#FFF3E0"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67569</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Delivered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">54567</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4560</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Restaurants */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium">
                Restaurants
              </CardTitle>
              <button className="text-orange-500 text-sm">View details</button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sole Luna</span>
              <span className="text-sm font-medium">40000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Soy</span>
              <span className="text-sm font-medium">12000</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Hotels */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium">
                Hotels
              </CardTitle>
              <button className="text-orange-500 text-sm">View details</button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Park Inn</span>
              <span className="text-sm font-medium">4230</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">M Hotel</span>
              <span className="text-sm font-medium">1035</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Create New */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium">
                Create
              </CardTitle>
              <button className="text-orange-500 text-sm">View all</button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Create new</span>
              <Button size="sm" variant="ghost" className="p-0 h-auto">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="restaurant" name="create" className="text-orange-500" />
                <label htmlFor="restaurant" className="text-sm">Restaurants</label>
                <Button size="sm" className="ml-auto h-6 bg-orange-500 hover:bg-orange-600">
                  New
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="radio" id="hotel" name="create" className="text-orange-500" />
                <label htmlFor="hotel" className="text-sm">Hotels</label>
                <Button size="sm" className="ml-auto h-6 bg-orange-500 hover:bg-orange-600">
                  New
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="radio" id="pub" name="create" checked className="text-orange-500" />
                <label htmlFor="pub" className="text-sm">Pub</label>
                <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">Default</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pubs */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium">
                Pubs
              </CardTitle>
              <button className="text-orange-500 text-sm">View details</button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sundowner</span>
              <span className="text-sm font-medium">300</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Gate N19</span>
              <span className="text-sm font-medium">150</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Cafes */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium">
                Cafes
              </CardTitle>
              <button className="text-orange-500 text-sm">View details</button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Aroma</span>
              <span className="text-sm font-medium">2230</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Patisserie Royale</span>
              <span className="text-sm font-medium">500</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
