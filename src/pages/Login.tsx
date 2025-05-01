
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Logo from "@/components/Logo";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would connect this to a backend
    if (email && password) {
      toast.success("Login successful!");
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      toast.error("Please enter both email and password");
    }
  };

  return (
    <div className="min-h-screen bg-orange-500 flex justify-center items-center">
      <div className="w-full max-w-lg flex">
        {/* Left side logo */}
        <div className="w-1/2 flex items-center justify-center p-6">
          <Logo size="large" variant="dark" />
        </div>

        {/* Right side login form */}
        <div className="w-full md:w-1/2 bg-white rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-gray-400">Welcome</h2>
            <h1 className="text-2xl font-bold mt-2">Login to SupaMenu</h1>
            <p className="text-gray-500 text-sm mt-2">Enter your email and password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-500 uppercase text-xs">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-gray-500 uppercase text-xs">Password</label>
                <Link to="/forgot-password" className="text-gray-400 text-xs">Forgot password?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
            >
              Log In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? 
              <Link to="/signup" className="text-blue-500 ml-1">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <div className="flex justify-center">
              <p className="text-gray-500 text-sm">
                Forgot your password/login
              </p>
              <button className="text-blue-500 uppercase ml-2 text-sm">RESET</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
