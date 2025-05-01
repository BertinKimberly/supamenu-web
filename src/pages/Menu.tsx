
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Mock menu items data
const initialMenuItems = [
  {
    id: 1,
    name: "Tom Yummy",
    description: "Soft, Lime Vodka, Lemongrass, Ginger, Chilli",
    category: "DRINK",
    price: 5000,
    image: "/lovable-uploads/10c774d0-e577-4cad-9e38-e8830697ec3b.png"
  },
  {
    id: 2,
    name: "Singapore Sling",
    description: "Gin, Cointreau, Cherry Liqueur",
    category: "DRINK",
    price: 5000,
    image: "/lovable-uploads/3294206c-dac3-4fa3-a841-1f3fe8e284bb.png"
  },
  {
    id: 3,
    name: "Mojito",
    description: "Rum, Mint, Sugar, Lime Juice, Soda",
    category: "DRINK",
    price: 5000,
    image: "/lovable-uploads/3294206c-dac3-4fa3-a841-1f3fe8e284bb.png"
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("DRINK");
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "DRINK",
    price: 0,
    image: null
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewItem(prev => ({ ...prev, category: value }));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast.error("Please fill in required fields");
      return;
    }

    const newItemWithId = {
      ...newItem,
      id: menuItems.length + 1,
      image: "/lovable-uploads/3294206c-dac3-4fa3-a841-1f3fe8e284bb.png" // placeholder image
    };

    setMenuItems([...menuItems, newItemWithId]);
    toast.success("Menu item added successfully!");
    setNewItem({
      name: "",
      description: "",
      category: activeCategory,
      price: 0,
      image: null
    });
    setDialogOpen(false);
  };

  const categories = [
    { id: "DRINK", label: "Drink" },
    { id: "STARTER", label: "Starter" },
    { id: "APPETIZER", label: "Appetizer" },
    { id: "DESSERT", label: "Dessert" },
    { id: "MAIN", label: "Main" },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Menu</h1>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium">Menus</h2>
            <p className="text-sm text-gray-500">as of 23-May-2022, 04:44 PM</p>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full ${
                  activeCategory === category.id
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
                variant={activeCategory === category.id ? "default" : "outline"}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="space-y-3 mt-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md">
                <div className="w-16 h-16 rounded-md bg-gray-200 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">{item.description}</div>
                  <div className="font-medium">{item.name} - 12.5</div>
                  <div className="text-orange-500">Frw {item.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">Add Item</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Create new item name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newItem.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                    />
                  </div>
                  
                  <div>
                    <Label>Category</Label>
                    <RadioGroup 
                      value={newItem.category} 
                      onValueChange={handleCategoryChange}
                      className="grid grid-cols-2 gap-2 mt-2"
                    >
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={category.id} id={category.id} />
                          <Label htmlFor={category.id}>{category.label}</Label>
                          {category.id === "DRINK" && (
                            <span className="bg-gray-200 text-xs px-2 py-0.5 rounded">DEFAULT</span>
                          )}
                          {category.id !== "DRINK" && (
                            <Button variant="ghost" size="sm" className="ml-auto h-6 text-xs bg-orange-500 hover:bg-orange-600 text-white">
                              NEW
                            </Button>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price (RWF)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={newItem.price || ""}
                      onChange={handleInputChange}
                      placeholder="Price"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newItem.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAddItem}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Plus className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-gray-500">Create new item</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Menu;
