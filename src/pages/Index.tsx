import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lightning from "../components/Lightning";
import RotatingText from "../components/RotatingText";
import CyberButton from "../components/CyberButton";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const heroTexts = [
    "WELCOME TO OUR DREAM",
    "FUTURE IS NOW", 
    "STYLE REDEFINED",
    "CYBER FASHION"
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "CLASSIC T-SHIRT",
      price: 399,
      originalPrice: 899,
      image: "/placeholder.svg",
      category: "Classic"
    },
    {
      id: "2", 
      name: "LIMITED T-SHIRT",
      price: 399,
      originalPrice: 899,
      image: "/placeholder.svg",
      category: "Limited"
    },
    {
      id: "3",
      name: "SPECIAL T-SHIRT",
      price: 399,
      originalPrice: 899,
      image: "/placeholder.svg",
      category: "Special"
    }
  ];

  // Extract only alphabetic characters from phone
  const getAlphabeticName = (phone: string) => {
    return phone.replace(/[^a-zA-Z]/g, '');
  };

  const getUserName = () => {
    if (user?.phone) {
      return getAlphabeticName(user.phone);
    }
    return '';
  };

  const handleGetStarted = () => {
    if (user) {
      // User is authenticated, show personalized welcome
      const userName = user.phone; // Use phone since we don't have user_metadata anymore
      toast({
        title: `Welcome back!`,
        description: `Ready to explore the future, ${userName}?`,
      });
    } else {
      // Not authenticated, redirect to auth
      window.location.href = '/auth';
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Lightning hue={51} speed={1.5} intensity={0.8} size={2} />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-orbitron font-black mb-4 sm:mb-6">
              <RotatingText
                texts={heroTexts}
                rotationInterval={3000}
                mainClassName="cyber-text-glow"
                elementLevelClassName="inline-block"
              />
            </h1>
            
            <p className="text-sm sm:text-lg md:text-xl text-cyber-gold/80 max-w-2xl mx-auto mb-6 sm:mb-8 font-tech px-4">
              {user ? `Welcome back, ${getUserName()}! ` : ''}
              Experience the future of fashion with our cyberpunk-inspired collections.
              Handcrafted with futuristic fibers and limited edition designs.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Link to="/products">
              <CyberButton className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                SHOP NOW
              </CyberButton>
            </Link>
            {!user && (
              <Link to="/auth">
                <CyberButton className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto" variant="secondary">
                  JOIN NOW
                </CyberButton>
              </Link>
            )}
            <Link to="/about">
              <CyberButton className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto" variant="secondary">
                EXPLORE
              </CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-bold text-center mb-8 sm:mb-16 cyber-text-glow"
          >
            FEATURED COLLECTIONS
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OYIEE Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-cyber-gray-800/20">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-bold mb-8 sm:mb-16 cyber-text-glow"
          >
            WHY OYIEE?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "FUTURISTIC FIBERS",
                description: "Advanced materials that adapt to your body and environment"
              },
              {
                title: "LIMITED DROPS",
                description: "Exclusive collections with numbered pieces for true uniqueness"
              },
              {
                title: "HANDCRAFTED",
                description: "Each piece meticulously crafted by skilled artisans"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-4 sm:p-6 border border-cyber-gold/30 bg-cyber-dark-gray/50"
                style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
              >
                <h3 className="text-lg sm:text-xl font-orbitron font-bold mb-3 sm:mb-4 cyber-text-glow">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-cyber-gold/80 font-tech">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-cyber-gold/10 to-cyber-gold/5 border border-cyber-gold/50 p-6 sm:p-12"
            style={{ boxShadow: "0 0 50px rgba(255, 215, 0, 0.2)" }}
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl font-orbitron font-bold mb-4 sm:mb-6 cyber-text-glow">
              READY TO ENTER THE FUTURE?
            </h2>
            <p className="text-sm sm:text-lg text-cyber-gold/80 mb-6 sm:mb-8 font-tech">
              Join the revolution. Be part of the cyberpunk fashion movement.
            </p>
            <Link to="/products">
              <CyberButton className="text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4">
                EXPLORE COLLECTIONS
              </CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-cyber-gold/30 bg-cyber-dark-gray/20">
        <div className="container mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-4 sm:mb-6">
            <Link to="/about" className="font-tech text-sm sm:text-base hover:text-cyber-gold-bright transition-colors">
              ABOUT
            </Link>
            <Link to="/products" className="font-tech text-sm sm:text-base hover:text-cyber-gold-bright transition-colors">
              PRODUCTS
            </Link>
            <Link to="/leadership" className="font-tech text-sm sm:text-base hover:text-cyber-gold-bright transition-colors">
              LEADERSHIP
            </Link>
            <Link to="/upcoming" className="font-tech text-sm sm:text-base hover:text-cyber-gold-bright transition-colors">
              UPCOMING
            </Link>
            {!user && (
              <Link to="/auth" className="font-tech text-sm sm:text-base hover:text-cyber-gold-bright transition-colors">
                SIGN IN
              </Link>
            )}
          </div>
          <p className="text-cyber-gold/60 font-tech text-xs sm:text-sm">
            © 2025 OYIEE. All rights reserved. Future fashion, today.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
