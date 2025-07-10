import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import CyberButton from "../components/CyberButton";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = ["All", "Classic", "Limited", "Special"];

  const products = [
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
      image: "/lovable-uploads/26018610-53d7-4e83-8128-46f6be713f48.png",
      category: "Limited"
    },
    {
      id: "3",
      name: "SPECIAL T-SHIRT",
      price: 399,
      originalPrice: 899,
      image: "/lovable-uploads/cec1b1ad-b4f6-455e-953d-9f84bdf1654f.png",
      category: "Special"
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const handleJoinNewsletter = () => {
    toast({
      title: "Newsletter Subscription",
      description: "Newsletter signup functionality coming soon!",
      variant: "default"
    });
  };

  const handleViewUpcoming = () => {
    // Navigate to upcoming products page using React Router
    navigate('/upcoming');
  };

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-orbitron font-black text-center mb-8 cyber-text-glow"
          >
            T-SHIRT COLLECTIONS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-cyber-gold/80 text-center max-w-2xl mx-auto font-tech"
          >
            Every month we launch 3 unique T-shirt designs: Classic for everyday wear, 
            Limited for collectors, and Special for true cyberpunk enthusiasts.
          </motion.p>
        </div>
      </section>

      {/* Category Info */}
      <section className="pb-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20 text-center"
              style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
            >
              <h3 className="text-xl font-orbitron font-bold mb-3 cyber-text-glow">CLASSIC</h3>
              <p className="text-cyber-gold/80 font-tech text-sm mb-3">
                Timeless designs with subtle cyberpunk elements. Perfect for daily wear.
              </p>
              <div className="text-cyber-gold font-orbitron font-bold">
                <span className="text-lg line-through text-cyber-gold/50">₹899</span>
                <span className="text-2xl ml-2">₹399</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border border-cyber-gold/50 p-6 bg-gradient-to-b from-cyber-gold/10 to-cyber-gold/5 text-center"
              style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)" }}
            >
              <h3 className="text-xl font-orbitron font-bold mb-3 cyber-text-glow">LIMITED</h3>
              <p className="text-cyber-gold/80 font-tech text-sm mb-3">
                Exclusive designs limited to 100 pieces. Collector's choice.
              </p>
              <div className="text-cyber-gold font-orbitron font-bold">
                <span className="text-lg line-through text-cyber-gold/50">₹899</span>
                <span className="text-2xl ml-2">₹399</span>
              </div>
              <div className="text-xs text-cyber-gold/60 font-tech mt-1">Only 100 pieces</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border border-cyber-gold p-6 bg-gradient-to-b from-cyber-gold/15 to-cyber-gold/10 text-center"
              style={{ boxShadow: "0 0 40px rgba(255, 215, 0, 0.3)" }}
            >
              <h3 className="text-xl font-orbitron font-bold mb-3 cyber-text-glow">SPECIAL</h3>
              <p className="text-cyber-gold/80 font-tech text-sm mb-3">
                High-tech features and premium materials. The ultimate statement.
              </p>
              <div className="text-cyber-gold font-orbitron font-bold">
                <span className="text-lg line-through text-cyber-gold/50">₹899</span>
                <span className="text-2xl ml-2">₹399</span>
              </div>
              <div className="text-xs text-cyber-gold/60 font-tech mt-1">Tech-enhanced</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div>
              <h3 className="text-lg font-orbitron font-bold mb-4 cyber-text-glow text-center">
                FILTER BY CATEGORY
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-3 border font-tech text-sm transition-all duration-300
                      ${selectedCategory === category 
                        ? "bg-cyber-gold text-black border-cyber-gold" 
                        : "bg-transparent text-cyber-gold border-cyber-gold/30 hover:border-cyber-gold"
                      }
                    `}
                  >
                    {category.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-orbitron font-bold mb-4 cyber-text-glow">
                NO PRODUCTS FOUND
              </h3>
              <p className="text-cyber-gold/80 font-tech">
                Try selecting a different category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Monthly Release Info */}
      <section className="py-20 px-6 bg-cyber-gray-800/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 cyber-text-glow">
              MONTHLY DROPS
            </h2>
            <p className="text-lg text-cyber-gold/80 mb-8 font-tech max-w-2xl mx-auto">
              Every month on the 15th, we release 3 new T-shirt designs. Each category offers 
              a unique experience for different types of cyberpunk enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CyberButton 
                className="text-lg px-12 py-4"
                onClick={handleViewUpcoming}
              >
                VIEW UPCOMING
              </CyberButton>
              <CyberButton 
                className="text-lg px-12 py-4" 
                variant="secondary"
                onClick={handleJoinNewsletter}
              >
                JOIN NEWSLETTER
              </CyberButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
