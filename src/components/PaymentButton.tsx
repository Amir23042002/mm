
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Address } from './CheckoutStepper';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentButtonProps {
  amount: number;
  address: Address;
  items: any[];
  disabled: boolean;
  onSuccess: (orderId: string) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  amount,
  address,
  items,
  disabled,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { clearCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast({
        title: 'Payment System Loading',
        description: 'Please wait for the payment system to load.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Create order on backend
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          address,
          paymentMode: 'PREPAID',
          amount: amount,
        }),
      });

      const orderData = await response.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: 'INR',
        name: 'OYIEE',
        description: 'Cyberpunk Fashion Order',
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/.netlify/functions/confirm-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              clearCart();
              onSuccess(verifyData.orderId);
              toast({
                title: 'Payment Successful!',
                description: 'Your order has been confirmed.',
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast({
              title: 'Payment Verification Failed',
              description: 'Please contact support with your payment details.',
              variant: 'destructive',
            });
          }
        },
        prefill: {
          name: address.name,
          contact: address.phone,
        },
        theme: {
          color: '#FFD700',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading || !razorpayLoaded}
      className="w-full bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright"
    >
      {isLoading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
    </Button>
  );
};

export default PaymentButton;
