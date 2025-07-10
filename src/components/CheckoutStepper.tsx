
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, CreditCard } from 'lucide-react';
import AddressForm from './AddressForm';
import OrderReview from './OrderReview';
import PaymentSelection from './PaymentSelection';

export interface Address {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CheckoutStepperProps {
  onOrderComplete: (orderId: string) => void;
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMode, setPaymentMode] = useState<'PREPAID' | 'COD'>('PREPAID');

  const steps = [
    { id: 1, title: 'Shipping & Billing', icon: Package },
    { id: 2, title: 'Review Order', icon: CheckCircle2 },
    { id: 3, title: 'Payment', icon: CreditCard },
  ];

  const handleAddressSubmit = (addressData: Address) => {
    setAddress(addressData);
    setCurrentStep(2);
  };

  const handleOrderReview = () => {
    setCurrentStep(3);
  };

  const handlePaymentComplete = (orderId: string) => {
    onOrderComplete(orderId);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id
                  ? 'bg-cyber-gold border-cyber-gold text-black'
                  : 'border-cyber-gold/30 text-cyber-gold/50'
              }`}
            >
              <step.icon size={20} />
            </div>
            <span
              className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-cyber-gold' : 'text-cyber-gold/50'
              }`}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-cyber-gold' : 'bg-cyber-gold/30'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && (
          <AddressForm onSubmit={handleAddressSubmit} />
        )}
        
        {currentStep === 2 && address && (
          <OrderReview
            address={address}
            onEdit={() => setCurrentStep(1)}
            onContinue={handleOrderReview}
          />
        )}
        
        {currentStep === 3 && address && (
          <PaymentSelection
            address={address}
            paymentMode={paymentMode}
            onPaymentModeChange={setPaymentMode}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutStepper;
