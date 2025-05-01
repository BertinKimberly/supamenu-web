
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const NewClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    category: "",
    representative: "",
    creationDate: "",
    address: "",
    email: "",
    phone: "",
    bankAccount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.clientName || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // In a real app, you would send this data to a backend
    toast.success("Client added successfully!");
    navigate("/dashboard/clients");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Client</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client</Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Client name"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RESTO">Restaurant</SelectItem>
                  <SelectItem value="HOTEL">Hotel</SelectItem>
                  <SelectItem value="PUB">Pub</SelectItem>
                  <SelectItem value="CAFE">Cafe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="representative">Representative</Label>
              <Input
                id="representative"
                name="representative"
                value={formData.representative}
                onChange={handleChange}
                placeholder="Name"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="creationDate">Date of creation</Label>
              <Input
                id="creationDate"
                name="creationDate"
                type="date"
                value={formData.creationDate}
                onChange={handleChange}
                placeholder="Month & Year"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Province, District, Sector, Cell"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Bank Account (IBAN)</Label>
              <Input
                id="bankAccount"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="IBAN"
                className="w-full"
              />
            </div>
            
            <div className="pt-4 flex justify-center">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white w-48">
                Add Client
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewClient;
