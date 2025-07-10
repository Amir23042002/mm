
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CyberButton from './CyberButton';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showSizeSelector?: boolean;
  availableSizes?: string[];
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  className, 
  showSizeSelector = true,
  availableSizes = ['S', 'M', 'L', 'XL']
}) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please sign in to add items to your cart.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    if (showSizeSelector && !selectedSize) {
      toast({
        title: 'Size Required',
        description: 'Please select a size before adding to cart.',
        variant: 'destructive',
      });
      return;
    }

    const productWithSize = {
      ...product,
      selectedSize: showSizeSelector ? selectedSize : undefined
    };

    addToCart(productWithSize);
    toast({
      title: 'Added to Cart',
      description: `${product.name}${selectedSize ? ` (Size: ${selectedSize})` : ''} has been added to your cart.`,
    });

    // Reset size selection after adding to cart
    if (showSizeSelector) {
      setSelectedSize('');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {showSizeSelector && (
        <div>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="bg-cyber-dark-gray border-cyber-gold/30 text-cyber-gold">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent className="bg-cyber-dark-gray border-cyber-gold/30">
              {availableSizes.map((size) => (
                <SelectItem key={size} value={size} className="text-cyber-gold hover:bg-cyber-gold/10">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <CyberButton 
        onClick={handleAddToCart} 
        className={`w-full ${showSizeSelector && !selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {!user ? 'LOGIN TO ADD TO CART' : 'ADD TO CART'}
      </CyberButton>
      
      {showSizeSelector && !selectedSize && user && (
        <p className="text-xs text-red-400 font-tech text-center">
          Please select a size
        </p>
      )}
      
      {!user && (
        <p className="text-xs text-cyber-gold/60 font-tech text-center">
          Sign in required to add items to cart
        </p>
      )}
    </div>
  );
};

export default AddToCartButton;
