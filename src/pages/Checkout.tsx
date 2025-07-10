
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import CheckoutStepper from '@/components/CheckoutStepper';
import ThankYou from '@/components/ThankYou';

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState('');
  const [paymentMode, setPaymentMode] = useState<'PREPAID' | 'COD'>('PREPAID');

  // Redirect if cart is empty
  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const handleOrderComplete = (orderId: string) => {
    setCompletedOrderId(orderId);
    setOrderComplete(true);
  };

  if (orderComplete) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const shipping = 50;
    const total = subtotal + gst + shipping;

    return (
      <ThankYou
        orderId={completedOrderId}
        amount={paymentMode === 'PREPAID' ? total : undefined}
        paymentMode={paymentMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-orbitron font-bold mb-8 cyber-text-glow text-center"
          >
            CHECKOUT
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CheckoutStepper onOrderComplete={handleOrderComplete} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
