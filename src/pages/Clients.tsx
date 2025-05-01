
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Search, Eye, Filter, ArrowUpDown, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Mock client data
const clients = [
  {
    id: 1,
    name: "Soy Restaurant",
    updatedAt: "1 day ago",
    sales: "2345678 Frw",
    salesDate: "24.05.2018",
    category: "RESTO"
  },
  {
    id: 2,
    name: "Choose Kigali",
    updatedAt: "1 day ago",
    sales: "98745 Frw",
    salesDate: "24.05.2018",
    category: "RESTO"
  },
  {
    id: 3,
    name: "Planet Burget",
    updatedAt: "1 day ago",
    sales: "321456 Frw",
    salesDate: "24.05.2018",
    category: "RESTO"
  },
  {
    id: 4,
    name: "M Hotel",
    updatedAt: "2 days ago",
    sales: "78503 Frw",
    salesDate: "23.05.2018",
    category: "HOTEL"
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with New Client button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-medium">New Client</h2>
            <p className="text-sm text-gray-500">Add a new client</p>
          </div>
          <Link to="/dashboard/clients/new">
            <Button className="bg-white border text-black hover:bg-gray-100">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </Link>
        </div>

        {/* Client list */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <h3 className="text-lg font-medium">All Clients</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Clients details</TableHead>
                  <TableHead className="w-1/4">Sales</TableHead>
                  <TableHead className="w-1/4">Detailed report</TableHead>
                  <TableHead className="w-1/6">Category</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">Updated {client.updatedAt}</div>
                    </TableCell>
                    <TableCell>
                      <div>{client.sales}</div>
                      <div className="text-sm text-gray-500">on {client.salesDate}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Eye className="h-5 w-5 text-orange-500" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                        {client.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit client</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Clients;
