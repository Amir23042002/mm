
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import OtpDialog from '@/components/OtpDialog';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().min(10, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      gender: 'male',
      phone: '',
      password: ''
    }
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    console.log('Starting signup process with data:', { ...data, password: '[REDACTED]' });
    
    try {
      const functionUrl = window.location.hostname === 'localhost' 
        ? '/.netlify/functions/send-email-otp'
        : 'https://oyieetesting.netlify.app/.netlify/functions/send-email-otp';
      
      console.log('Calling function URL:', functionUrl);
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);

      let responseData;
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Server returned invalid response: ${response.status}`);
      }

      if (!response.ok) {
        console.error('Response not ok:', responseData);
        throw new Error(responseData.error || `Server error: ${response.status}`);
      }

      console.log('Parsed response data:', responseData);
      
      if (responseData.success && responseData.otpToken) {
        setPendingEmail(data.email);
        setOtpToken(responseData.otpToken);
        setShowOtpModal(true);
        console.log('OTP modal should now be visible for email:', data.email);
        toast({
          title: "Verification code sent!",
          description: "Please check your email for the verification code.",
        });
      } else {
        throw new Error(responseData.error || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-orbitron cyber-text-glow">
              JOIN OYIEE
            </CardTitle>
            <p className="text-cyber-gold/60 font-tech">
              Create your cyberpunk identity
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-cyber-gold font-tech">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-cyber-gold font-tech">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="gender" className="text-cyber-gold font-tech">
                  Gender
                </Label>
                <Select onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}>
                  <SelectTrigger className="bg-black/50 border-cyber-gold/30 text-cyber-gold">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-cyber-dark-gray border-cyber-gold/30">
                    <SelectItem value="male" className="text-cyber-gold">Male</SelectItem>
                    <SelectItem value="female" className="text-cyber-gold">Female</SelectItem>
                    <SelectItem value="other" className="text-cyber-gold">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-cyber-gold font-tech">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className="bg-black/50 border-cyber-gold/30 text-cyber-gold"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-cyber-gold font-tech">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    className="bg-black/50 border-cyber-gold/30 text-cyber-gold pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gold/60 hover:text-cyber-gold"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyber-gold text-black hover:bg-cyber-gold/80 font-tech"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-cyber-gold/60 font-tech text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-cyber-gold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {showOtpModal && otpToken && (
        <OtpDialog
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          email={pendingEmail}
          otpToken={otpToken}
        />
      )}
    </div>
  );
};

export default SignUp;
