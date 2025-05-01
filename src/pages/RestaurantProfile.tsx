
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Bell } from "lucide-react";
import { toast } from "sonner";

const steps = [
  {
    id: 1,
    title: "Restaurant Information",
    description: "Restaurant name, address, contact, owner details",
  },
  {
    id: 2,
    title: "Restaurant Type & Timings",
    description: "Establishment & cuisine type, opening hours",
  },
  {
    id: 3,
    title: "Create your menu",
    description: "Menu, restaurant food images",
  },
];

const RestaurantProfile = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: "",
    fullName: "",
    contactNumber: "",
    ownerPhone: "",
    ownerName: "",
    ownerEmail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (activeStep === 1) {
      // Validate restaurant info
      if (!restaurantInfo.name || !restaurantInfo.contactNumber || !restaurantInfo.ownerName) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    
    if (activeStep < steps.length) {
      setActiveStep(prev => prev + 1);
    } else {
      // Complete the setup
      toast.success("Restaurant profile created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo variant="dark" />
          <div className="flex items-center gap-4">
            <button className="p-2">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Jacques Kagabo</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/62feb466-8968-48d0-b985-9ec4add172cc.png" 
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side steps */}
          <div className="md:w-1/3">
            <div className="border rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">
                1. Create your restaurant profile
              </h2>
              
              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 ${
                      step.id === activeStep 
                        ? "bg-orange-500 text-white" 
                        : step.id < activeStep 
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {step.id < activeStep ? "✓" : step.id}
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        step.id === activeStep ? "text-black" : "text-gray-500"
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side form */}
          <div className="md:w-2/3">
            <div className="border rounded-lg p-6">
              {/* Step 1: Restaurant Information */}
              {activeStep === 1 && (
                <>
                  <h2 className="text-lg font-medium mb-6">Restaurant Information</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Restaurant Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={restaurantInfo.name}
                        onChange={handleInputChange}
                        placeholder="Restaurant Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Restaurant Complete Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={restaurantInfo.fullName}
                        onChange={handleInputChange}
                        placeholder="Restaurant Complete Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact number @ Restaurant</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                          +250
                        </span>
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          value={restaurantInfo.contactNumber}
                          onChange={handleInputChange}
                          className="rounded-l-none"
                          placeholder="Mobile number"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-3">Restaurant owner details</h3>
                      
                      <div className="space-y-4">
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                            +250
                          </span>
                          <Input
                            name="ownerPhone"
                            value={restaurantInfo.ownerPhone}
                            onChange={handleInputChange}
                            className="rounded-l-none"
                            placeholder="Mobile number"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            name="ownerName"
                            value={restaurantInfo.ownerName}
                            onChange={handleInputChange}
                            placeholder="Owner Name"
                          />
                          <Input
                            name="ownerEmail"
                            value={restaurantInfo.ownerEmail}
                            onChange={handleInputChange}
                            placeholder="Restaurant Owner Email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Step 2: Restaurant Type & Timings */}
              {activeStep === 2 && (
                <>
                  <h2 className="text-lg font-medium mb-6">Restaurant Type & Timings</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="type">Restaurant Type (restaurant, pub, hotel, coffeeshop, other)</Label>
                      <div className="relative">
                        <Input
                          id="type"
                          placeholder="Restaurant"
                          className="pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          placeholder="All-Day"
                          className="pr-10"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Opening Hours</Label>
                      <div className="flex gap-4 items-center">
                        <div className="w-1/2">
                          <Label htmlFor="openFrom" className="mb-1 block">From</Label>
                          <div className="relative">
                            <Input
                              id="openFrom"
                              placeholder="13:00"
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <Label htmlFor="openTo" className="mb-1 block">To</Label>
                          <div className="relative">
                            <Input
                              id="openTo"
                              placeholder="23:00"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Upload images (pictures or logo)</Label>
                      <Button variant="outline" className="w-full py-8">
                        Choose Images
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              {/* Step 3: Create Menu */}
              {activeStep === 3 && (
                <>
                  <h2 className="text-lg font-medium mb-6">Create your menu</h2>
                  
                  <div className="mb-6">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
                        Drink
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Starter
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Appetizer
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Dessert
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        Main
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="menuName">Name</Label>
                      <Input
                        id="menuName"
                        placeholder="Menu Name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="RWF"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="menuDescription">Menu description</Label>
                      <Input
                        id="menuDescription"
                        placeholder="Description"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Image</Label>
                      <Button variant="outline" className="w-full py-4">
                        Upload image
                      </Button>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button variant="outline" className="flex items-center gap-2 text-orange-500 border-orange-500">
                        Add more
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleNextStep}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  {activeStep < steps.length ? "Next" : "Complete"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
