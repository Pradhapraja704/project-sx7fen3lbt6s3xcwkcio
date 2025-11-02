import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { MessageCircle, Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const isPasswordValid = password.length >= 8 &&
                         /[a-z]/.test(password) &&
                         /[A-Z]/.test(password) &&
                         /\d/.test(password);

  const isFormValid = name &&
                     email &&
                     password &&
                     confirmPassword &&
                     password === confirmPassword &&
                     isPasswordValid &&
                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    if (!isFormValid) {
      setError('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      toast.success('Registration successful! Welcome to LexiFix!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return 'bg-gray-600';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (password.length === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-[#4a9eff] rounded-2xl mb-4">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">LexiFix</h1>
          <p className="text-[#999999] text-center">AI-Powered Chat with Text Refinement</p>
        </div>

        {/* Register Form */}
        <Card className="bg-[#1a1a1a] border-[#333] text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Create account</CardTitle>
            <CardDescription className="text-[#999999]">
              Join LexiFix and start chatting with AI-powered refinement
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
                <Label htmlFor="name" className="text-[#cccccc]">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#2d2d2d] border-[#444] text-white placeholder:text-[#666] focus:border-[#4a9eff] focus:ring-[#4a9eff]"
                />
              </div>

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
                {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Please enter a valid email address
                  </p>
                )}
                {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Email format is valid
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#cccccc]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
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

                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#999999]">Password strength</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength === 1 ? 'text-red-400' :
                        passwordStrength === 2 ? 'text-yellow-400' :
                        passwordStrength === 3 ? 'text-blue-400' : 'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-[#666] space-y-1">
                      <div className="flex items-center gap-1">
                        {password.length >= 8 ?
                          <Check className="h-3 w-3 text-green-400" /> :
                          <X className="h-3 w-3 text-red-400" />
                        }
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/[a-z]/.test(password) && /[A-Z]/.test(password) ?
                          <Check className="h-3 w-3 text-green-400" /> :
                          <X className="h-3 w-3 text-red-400" />
                        }
                        <span>Upper and lowercase letters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {/\d/.test(password) ?
                          <Check className="h-3 w-3 text-green-400" /> :
                          <X className="h-3 w-3 text-red-400" />
                        }
                        <span>At least one number</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#cccccc]">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-[#2d2d2d] border-[#444] text-white placeholder:text-[#666] focus:border-[#4a9eff] focus:ring-[#4a9eff] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full text-[#666] hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Passwords do not match
                  </p>
                )}
                {confirmPassword && password === confirmPassword && password.length > 0 && (
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Passwords match
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-[#4a9eff] hover:bg-[#3a8eef] text-white"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>

              <div className="text-center text-[#999999] text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-[#4a9eff] hover:text-[#3a8eef] hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;