
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20 hover:border-cyber-gold transition-all duration-300"
      style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <p className="text-cyber-gold/60 text-sm font-tech uppercase tracking-wider">
          {product.category}
        </p>
        
        <h3 className="font-orbitron font-bold text-lg group-hover:text-cyber-gold-bright transition-colors">
          {product.name}
        </h3>
        
        <div className="text-cyber-gold">
          {product.originalPrice ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg line-through text-cyber-gold/50">₹{product.originalPrice}</span>
              <span className="text-xl font-bold">₹{product.price}</span>
            </div>
          ) : (
            <p className="text-xl font-bold">₹{product.price}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Link to={`/product/${product.id}`}>
            <button className="w-full border border-cyber-gold/30 py-2 px-4 font-orbitron font-bold text-cyber-gold hover:bg-cyber-gold hover:text-black transition-all duration-300">
              VIEW DETAILS
            </button>
          </Link>
          
          <AddToCartButton 
            product={product} 
            showSizeSelector={true}
            availableSizes={['S', 'M', 'L', 'XL']}
          />
        </div>
      </div>

      {/* Cyber Glow Effect */}
      <div className="absolute inset-0 border border-cyber-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;
