
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers')
});

type OtpFormData = z.infer<typeof otpSchema>;

interface OtpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  otpToken: string;
}

const OtpDialog: React.FC<OtpDialogProps> = ({ isOpen, onClose, email, otpToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithToken } = useAuth();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema)
  });

  const onSubmit = async (data: OtpFormData) => {
    setIsLoading(true);
    console.log('Verifying OTP for email:', email);
    
    try {
      const functionUrl = window.location.hostname === 'localhost' 
        ? '/.netlify/functions/verify-email-otp'
        : 'https://oyieetesting.netlify.app/.netlify/functions/verify-email-otp';

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otpToken,
          code: data.otp,
          email
        }),
      });

      const responseData = await response.json();
      console.log('Verify OTP response:', responseData);

      if (response.ok && responseData.success) {
        loginWithToken(responseData.token);
        toast({
          title: "Account verified successfully!",
          description: "Welcome to OYIEE! Your account has been created.",
        });
        reset();
        onClose();
      } else {
        throw new Error(responseData.error || 'Verification failed');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error.message || "Please check your OTP and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-dark-gray/95 border-cyber-gold/30 text-cyber-gold">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron cyber-text-glow text-center">
            VERIFY YOUR EMAIL
          </DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <p className="text-cyber-gold/60 font-tech text-center">
            We've sent a 6-digit verification code to<br />
            <span className="text-cyber-gold font-bold">{email}</span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="otp" className="text-cyber-gold font-tech">
                Verification Code
              </Label>
              <Input
                id="otp"
                {...register('otp')}
                className="bg-black/50 border-cyber-gold/30 text-cyber-gold text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
              {errors.otp && (
                <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>
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
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-cyber-gold/40 font-tech text-sm">
              Didn't receive the code? Check your spam folder or try again.
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
