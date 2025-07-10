
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Truck, Smartphone } from 'lucide-react';
import { Address } from './CheckoutStepper';
import PaymentButton from './PaymentButton';

interface PaymentSelectionProps {
  address: Address;
  paymentMode: 'PREPAID' | 'COD';
  onPaymentModeChange: (mode: 'PREPAID' | 'COD') => void;
  onPaymentComplete: (orderId: string) => void;
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  address,
  paymentMode,
  onPaymentModeChange,
  onPaymentComplete,
}) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const subtotal = getTotalPrice();
  const gst = subtotal * 0.18;
  const shipping = 50;
  const total = subtotal + gst + shipping;

  const handleCODOrder = async () => {
    if (!termsAccepted) {
      toast({
        title: 'Terms Required',
        description: 'Please accept the terms and conditions to proceed.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          address,
          paymentMode: 'COD',
          amount: total,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        clearCart();
        onPaymentComplete(data.orderId);
        toast({
          title: 'Order Placed!',
          description: 'Your Cash on Delivery order has been confirmed.',
        });
      } else {
        throw new Error(data.error || 'Failed to create order');
      }
    } catch (error) {
      toast({
        title: 'Order Failed',
        description: 'Failed to place your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
        <CardHeader>
          <CardTitle className="font-orbitron cyber-text-glow">
            Select Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Online Payment */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMode === 'PREPAID'
                  ? 'border-cyber-gold bg-cyber-gold/10'
                  : 'border-cyber-gold/30 hover:border-cyber-gold/50'
              }`}
              onClick={() => onPaymentModeChange('PREPAID')}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex space-x-1">
                    <CreditCard className="text-cyber-gold" size={20} />
                    <Smartphone className="text-cyber-gold" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-cyber-gold">Online Payment</h3>
                  <p className="text-sm text-cyber-gold/70">
                    UPI, Cards, Net Banking, PhonePe, Google Pay
                  </p>
                </div>
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMode === 'COD'
                  ? 'border-cyber-gold bg-cyber-gold/10'
                  : 'border-cyber-gold/30 hover:border-cyber-gold/50'
              }`}
              onClick={() => onPaymentModeChange('COD')}
            >
              <div className="flex items-center space-x-3">
                <Truck className="text-cyber-gold" size={24} />
                <div>
                  <h3 className="font-medium text-cyber-gold">Cash on Delivery</h3>
                  <p className="text-sm text-cyber-gold/70">
                    Pay when your order arrives
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="rounded border-cyber-gold/30"
            />
            <label htmlFor="terms" className="text-sm text-cyber-gold/80">
              I accept the{' '}
              <a href="#" className="text-cyber-gold underline">
                terms and conditions
              </a>
            </label>
          </div>

          {/* Payment Button */}
          <div className="pt-4">
            {paymentMode === 'PREPAID' ? (
              <PaymentButton
                amount={total}
                address={address}
                items={items}
                disabled={!termsAccepted}
                onSuccess={onPaymentComplete}
              />
            ) : (
              <Button
                onClick={handleCODOrder}
                disabled={!termsAccepted || isProcessing}
                className="w-full bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright"
              >
                {isProcessing ? 'Processing...' : `Place COD Order - ₹${total.toFixed(2)}`}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSelection;
