import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MessageCircle, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      toast.success('Login successful!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-[#4a9eff] rounded-2xl mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">LexiFix</h1>
          <p className="text-[#999999] text-center">AI-Powered Chat with Text Refinement</p>
        </div>

        {/* Login Form */}
        <Card className="bg-[#1a1a1a] border-[#333] text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
            <CardDescription className="text-[#999999]">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="bg-red-900/20 border-red-800 text-red-300">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#cccccc]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[#2d2d2d] border-[#444] text-white placeholder:text-[#666] focus:border-[#4a9eff] focus:ring-[#4a9eff]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#cccccc]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#2d2d2d] border-[#444] text-white placeholder:text-[#666] focus:border-[#4a9eff] focus:ring-[#4a9eff] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full text-[#666] hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-[#4a9eff] hover:bg-[#3a8eef] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

              <div className="text-center text-[#999999] text-sm">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#4a9eff] hover:text-[#3a8eef] hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Test Accounts Info */}
        <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#333] rounded-lg">
          <h3 className="text-white font-semibold mb-2">Test Accounts</h3>
          <div className="space-y-2 text-sm">
            <div className="text-[#999999]">
              <span className="text-[#4a9eff]">User 1:</span> test1@lexifix.com / test123
            </div>
            <div className="text-[#999999]">
              <span className="text-[#4a9eff]">User 2:</span> test2@lexifix.com / test123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;