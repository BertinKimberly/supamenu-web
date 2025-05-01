
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// Mock orders data
const initialOrders = [
  {
    id: 1,
    items: [{ name: "Tom Yummy", quantity: 2 }],
    table: 1,
    time: "07:00-23:00",
    price: 5000,
    status: "NEW",
  },
  {
    id: 2,
    items: [{ name: "Tom Yummy", quantity: 2 }],
    table: 1,
    time: "07:00-23:00",
    price: 5000,
    status: "NEW",
  },
  {
    id: 3,
    items: [{ name: "Tom Yummy", quantity: 2 }],
    table: 1,
    time: "07:00-23:00",
    price: 5000,
    status: "DELIVERED",
  },
  {
    id: 4,
    items: [{ name: "Tom Yummy", quantity: 2 }],
    table: 1,
    time: "07:00-23:00",
    price: 5000,
    status: "DELIVERED",
  },
  {
    id: 5,
    items: [{ name: "Tom Yummy", quantity: 2 }],
    table: 1,
    time: "07:00-23:00",
    price: 5000,
    status: "REJECTED",
  },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("NEW");
  const [orders, setOrders] = useState(initialOrders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    category: "DRINK",
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCategoryChange = (value: string) => {
    setNewOrder(prev => ({ ...prev, category: value }));
  };

  const handleAddOrder = () => {
    const newOrderItem = {
      id: orders.length + 1,
      items: [{ name: "Tom Yummy", quantity: 2 }],
      table: Math.floor(Math.random() * 10) + 1,
      time: "07:00-23:00",
      price: 5000,
      status: "NEW",
    };

    setOrders([newOrderItem, ...orders]);
    toast.success("New order added successfully!");
    setDialogOpen(false);
  };

  const getFilteredOrders = () => {
    if (activeTab === "ALL") return orders;
    return orders.filter(order => order.status === activeTab);
  };

  const getStatusCounts = () => {
    const delivered = orders.filter(order => order.status === "DELIVERED").length;
    const waiting = orders.filter(order => order.status === "NEW").length;
    const rejected = orders.filter(order => order.status === "REJECTED").length;
    
    return {
      delivered,
      waiting,
      rejected,
      all: orders.length
    };
  };

  const statusCounts = getStatusCounts();
  const filteredOrders = getFilteredOrders();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Orders</h1>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-lg font-medium">Orders</h2>
                <p className="text-sm text-gray-500">as of 23-May-2022, 04:44 PM</p>
              </div>
              
              <div className="mt-4 sm:mt-0">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
                      Add Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Order</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Create new Order</Label>
                        <div className="flex items-center mt-2 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Plus className="h-5 w-5 text-gray-500" />
                          </div>
                          <span className="text-gray-500 ml-2">Select items</span>
                        </div>
                      </div>
                      
                      <RadioGroup 
                        value={newOrder.category} 
                        onValueChange={handleCategoryChange}
                        className="grid grid-cols-1 gap-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="DESSERT" id="dessert" />
                          <Label htmlFor="dessert">Dessert</Label>
                          <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs bg-orange-500 hover:bg-orange-600 text-white">
                            NEW
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="MAIN" id="main" />
                          <Label htmlFor="main">Main</Label>
                          <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs bg-orange-500 hover:bg-orange-600 text-white">
                            NEW
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="DRINK" id="drink" checked />
                          <Label htmlFor="drink">Drink</Label>
                          <span className="ml-auto text-xs bg-gray-200 px-2 py-0.5 rounded">DEFAULT</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="APPETIZER" id="appetizer" />
                          <Label htmlFor="appetizer">Appetizer</Label>
                          <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs bg-orange-500 hover:bg-orange-600 text-white">
                            NEW
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="STARTER" id="starter" />
                          <Label htmlFor="starter">Starter</Label>
                          <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs bg-orange-500 hover:bg-orange-600 text-white">
                            NEW
                          </Button>
                        </div>
                      </RadioGroup>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAddOrder}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Add Order
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="flex mt-6 space-x-2 overflow-x-auto pb-2">
              <Button
                onClick={() => handleTabChange("NEW")}
                className={`rounded-full ${
                  activeTab === "NEW"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
                variant={activeTab === "NEW" ? "default" : "outline"}
              >
                New
              </Button>
              <Button
                onClick={() => handleTabChange("DELIVERED")}
                className={`rounded-full ${
                  activeTab === "DELIVERED"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
                variant={activeTab === "DELIVERED" ? "default" : "outline"}
              >
                Delivered
              </Button>
              <Button
                onClick={() => handleTabChange("REJECTED")}
                className={`rounded-full ${
                  activeTab === "REJECTED"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
                variant={activeTab === "REJECTED" ? "default" : "outline"}
              >
                Rejected
              </Button>
              <Button
                onClick={() => handleTabChange("ALL")}
                className={`rounded-full ${
                  activeTab === "ALL"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
                variant={activeTab === "ALL" ? "default" : "outline"}
              >
                All
              </Button>
            </div>
          </div>
          
          <div className="divide-y">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-orange-500 font-medium">Order #{order.id}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          <span className="text-xs text-gray-500">Soft, Lime Vodka, Lemongrass, Ginger, Chilli</span>
                          <div>{item.name} x {item.quantity}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Table {order.table}</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-orange-500 font-medium">Frw {order.price}</div>
                    <div className="text-xs text-gray-500 mt-1">Order</div>
                    <div className="text-xs text-gray-500">{order.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col space-y-2">
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium">Delivered</div>
          <div className="text-2xl font-bold">{statusCounts.delivered}</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium">Waiting</div>
          <div className="text-2xl font-bold">{statusCounts.waiting}</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium">Rejected</div>
          <div className="text-2xl font-bold">{statusCounts.rejected}</div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium">All</div>
          <div className="text-2xl font-bold">{statusCounts.all}</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
