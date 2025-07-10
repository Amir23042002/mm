
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-orbitron cyber-text-glow">
              WELCOME TO OYIEE
            </CardTitle>
            <p className="text-cyber-gold/60 font-tech">
              Choose your path to enter the dreamscape
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-cyber-gold text-black hover:bg-cyber-gold/80 font-tech text-lg py-6"
            >
              SIGN IN
            </Button>
            
            <Button
              onClick={() => navigate('/signup')}
              variant="outline"
              className="w-full border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10 font-tech text-lg py-6"
            >
              CREATE ACCOUNT
            </Button>

            <div className="text-center mt-8">
              <p className="text-cyber-gold/40 font-tech text-sm">
                Enter the cyberpunk fashion revolution
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
