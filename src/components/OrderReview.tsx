
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { Edit, Package } from 'lucide-react';
import { Address } from './CheckoutStepper';

interface OrderReviewProps {
  address: Address;
  onEdit: () => void;
  onContinue: () => void;
}

const OrderReview: React.FC<OrderReviewProps> = ({ address, onEdit, onContinue }) => {
  const { items, getTotalPrice } = useCart();
  
  const subtotal = getTotalPrice();
  const gst = subtotal * 0.18; // 18% GST
  const shipping = 50; // Flat ₹50 shipping
  const total = subtotal + gst + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Shipping Address */}
      <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
        <CardHeader>
          <CardTitle className="font-orbitron cyber-text-glow flex items-center justify-between">
            <span className="flex items-center">
              <Package className="mr-2" />
              Shipping Address
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10"
            >
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-cyber-gold font-medium">{address.name}</p>
          <p className="text-cyber-gold/80">{address.phone}</p>
          <p className="text-cyber-gold/80">{address.address}</p>
          <p className="text-cyber-gold/80">
            {address.city}, {address.state} - {address.pincode}
          </p>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
        <CardHeader>
          <CardTitle className="font-orbitron cyber-text-glow">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-cyber-gold/80">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-cyber-gold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator className="bg-cyber-gold/30" />

          {/* Pricing Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyber-gold/80">Subtotal:</span>
              <span className="text-cyber-gold">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cyber-gold/80">GST (18%):</span>
              <span className="text-cyber-gold">₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cyber-gold/80">Shipping:</span>
              <span className="text-cyber-gold">₹{shipping.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="bg-cyber-gold/30" />

          <div className="flex justify-between font-bold text-lg">
            <span className="text-cyber-gold">Total:</span>
            <span className="text-cyber-gold cyber-text-glow">₹{total.toFixed(2)}</span>
          </div>

          <Button
            onClick={onContinue}
            className="w-full bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright"
          >
            Continue to Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderReview;
