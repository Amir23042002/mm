
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, UserCheck } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-orbitron font-bold mb-8 cyber-text-glow"
          >
            YOUR PROFILE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
              <CardHeader>
                <CardTitle className="font-orbitron cyber-text-glow flex items-center">
                  <User className="mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-cyber-gold/60" />
                  <div>
                    <p className="text-sm text-cyber-gold/60">Full Name</p>
                    <p className="text-cyber-gold font-tech">
                      {user?.fullName || 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-cyber-gold/60" />
                  <div>
                    <p className="text-sm text-cyber-gold/60">Email Address</p>
                    <p className="text-cyber-gold font-tech">
                      {user?.email || 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-cyber-gold/60" />
                  <div>
                    <p className="text-sm text-cyber-gold/60">Phone Number</p>
                    <p className="text-cyber-gold font-tech">
                      {user?.phone || 'Not available'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-cyber-gold/60" />
                  <div>
                    <p className="text-sm text-cyber-gold/60">Gender</p>
                    <p className="text-cyber-gold font-tech capitalize">
                      {user?.gender || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-cyber-gold/30">
                  <p className="text-xs text-cyber-gold/40 font-tech">
                    Account ID: {user?.id || 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
