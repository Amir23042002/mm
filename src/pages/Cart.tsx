
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-cyber-gold">
        <Navigation />
        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="mx-auto h-24 w-24 text-cyber-gold/50 mb-6" />
              <h1 className="text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
                YOUR CART IS EMPTY
              </h1>
              <p className="text-cyber-gold/80 mb-8 font-tech">
                Add some cyberpunk fashion to your collection
              </p>
              <Link to="/products">
                <Button className="bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright">
                  SHOP NOW
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-orbitron font-bold mb-8 cyber-text-glow"
          >
            SHOPPING CART
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded border border-cyber-gold/30"
                        />
                        <div className="flex-1">
                          <h3 className="font-orbitron font-bold text-cyber-gold">
                            {item.name}
                          </h3>
                          <p className="text-cyber-gold/60 font-tech text-sm">
                            {item.category}
                          </p>
                          <p className="text-cyber-gold font-bold mt-1">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-8 text-center font-bold">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-cyber-dark-gray/50 border-cyber-gold/30 sticky top-28">
                  <CardHeader>
                    <CardTitle className="font-orbitron cyber-text-glow">
                      ORDER SUMMARY
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-cyber-gold/80">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-cyber-gold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-cyber-gold/30 pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="cyber-text-glow">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        onClick={handleProceedToCheckout}
                        className="w-full bg-cyber-gold text-black font-bold hover:bg-cyber-gold-bright"
                      >
                        PROCEED TO CHECKOUT
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearCart}
                        className="w-full border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10"
                      >
                        CLEAR CART
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
