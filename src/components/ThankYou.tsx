
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ThankYouProps {
  orderId: string;
  amount?: number;
  paymentMode: 'PREPAID' | 'COD';
}

const ThankYou: React.FC<ThankYouProps> = ({ orderId, amount, paymentMode }) => {
  useEffect(() => {
    // Prevent back navigation to checkout
    const handlePopState = () => {
      window.location.href = '/';
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyber-gold flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30 text-center">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle2 className="text-green-500" size={64} />
            </motion.div>
            <CardTitle className="font-orbitron cyber-text-glow text-2xl">
              Order Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <p className="text-cyber-gold/80">
                Thank you for your order. Your cyberpunk fashion is on its way!
              </p>
              <div className="bg-black/50 p-4 rounded border border-cyber-gold/30">
                <p className="text-sm text-cyber-gold/70">Order ID:</p>
                <p className="font-mono text-cyber-gold font-bold">{orderId}</p>
              </div>
              {amount && (
                <div className="bg-black/50 p-4 rounded border border-cyber-gold/30">
                  <p className="text-sm text-cyber-gold/70">Amount Paid:</p>
                  <p className="text-cyber-gold font-bold text-xl">₹{amount.toFixed(2)}</p>
                </div>
              )}
            </div>

            {paymentMode === 'COD' && (
              <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="text-orange-500" size={20} />
                  <span className="font-medium text-orange-400">Cash on Delivery</span>
                </div>
                <p className="text-sm text-orange-300">
                  Please keep the exact amount ready. Our delivery partner will collect 
                  the payment when your order arrives.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <p className="text-cyber-gold/80 text-sm">
                You will receive an SMS confirmation shortly with tracking details.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/orders" className="flex-1">
                  <Button className="w-full bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright">
                    Track Order
                  </Button>
                </Link>
                <Link to="/products" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ThankYou;
