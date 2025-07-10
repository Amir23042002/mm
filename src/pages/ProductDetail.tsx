import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from "../components/Navigation";
import CyberButton from "../components/CyberButton";
import Lightning from "../components/Lightning";
import { Heart, Plus, Minus, RotateCcw, Zap } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Mock product data - dynamic based on ID
  const getProductData = () => {
    if (id === "2") {
      return {
        id: "2",
        name: "LIMITED T-SHIRT",
        price: 399,
        originalPrice: 899,
        images: [
          "/lovable-uploads/26018610-53d7-4e83-8128-46f6be713f48.png",
          "/lovable-uploads/4150b9e6-0ad6-4154-af3e-d837838d97d7.png",
          "/lovable-uploads/ef3954ee-dfa8-449c-82fb-1eb6d1752419.png",
          "/lovable-uploads/9493bd5c-1db4-4752-acca-bb2aa274ed17.png"
        ],
        description: "Limited edition t-shirt with a striking torn design revealing red accents. Perfect for those who want to make a bold statement with their style.",
        features: [
          "Premium cotton blend fabric",
          "Unique torn design with red accents",
          "Limited to 100 pieces worldwide",
          "Hand-finished details",
          "Collector's edition design"
        ],
      };
    } else if (id === "3") {
      return {
        id: "3",
        name: "SPECIAL T-SHIRT",
        price: 399,
        originalPrice: 899,
        images: [
          "/lovable-uploads/cec1b1ad-b4f6-455e-953d-9f84bdf1654f.png",
          "/lovable-uploads/6c14253f-65eb-4b03-9e11-5e94dd273819.png",
          "/lovable-uploads/d14d0cf0-ade3-4ba5-bb09-8b71b7eabf8d.png",
          "/lovable-uploads/a6961bb4-f6f5-422b-97f0-6c7487cec9d5.png"
        ],
        description: "Color-blocked t-shirt featuring a modern geometric design with premium navy, orange, and beige color palette. Perfect for the fashion-forward individual.",
        features: [
          "Premium cotton blend fabric",
          "Color-blocked geometric design",
          "Modern fashion-forward styling",
          "Comfortable regular fit",
          "Special edition design"
        ],
      };
    } else {
      return {
        id: id || '1',
        name: "CLASSIC T-SHIRT",
        price: 399,
        originalPrice: 899,
        images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        description: "The ultimate fusion of style and technology. This t-shirt features premium cotton blend with cyberpunk-inspired designs that represent the future of fashion.",
        features: [
          "Premium cotton blend fabric",
          "Cyberpunk-inspired design",
          "Comfortable fit for daily wear",
          "Durable print technology",
          "Limited edition design"
        ],
      };
    }
  };

  const product = {
    ...getProductData(),
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      {
        id: 1,
        name: "Alex Chen",
        rating: 5,
        comment: "Absolutely incredible t-shirt! The quality is outstanding and the design is perfect.",
        verified: true
      },
      {
        id: 2,
        name: "Maya Rodriguez",
        rating: 5,
        comment: "Love the cyberpunk design! Great quality and comfortable to wear.",
        verified: true
      }
    ]
  };

  const relatedProducts = [
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Size Required',
        description: 'Please select a size before adding to cart.',
        variant: 'destructive',
      });
      return;
    }

    const productWithSize = {
      ...product,
      image: product.images[0],
      category: 'T-Shirts',
      selectedSize,
      quantity
    };

    addToCart(productWithSize);
    toast({
      title: 'Added to Cart',
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 text-sm font-tech">
              <Link to="/" className="hover:text-cyber-gold-bright transition-colors">HOME</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-cyber-gold-bright transition-colors">PRODUCTS</Link>
              <span>/</span>
              <span className="text-cyber-gold/60">{product.name}</span>
            </div>
          </motion.div>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative overflow-hidden mb-4 border border-cyber-gold/30 bg-cyber-dark-gray/20">
                <div className="absolute inset-0 z-0">
                  <Lightning hue={51} speed={0.5} intensity={0.3} size={0.5} />
                </div>
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="relative z-10 w-full h-96 lg:h-[500px] object-cover"
                />
                
                {/* 3D Viewer Button */}
                <button className="absolute top-4 right-4 z-20 bg-cyber-gold/20 border border-cyber-gold p-2 hover:bg-cyber-gold/30 transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 font-bold text-sm">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`
                      w-20 h-20 border-2 transition-all duration-300
                      ${activeImage === index 
                        ? "border-cyber-gold" 
                        : "border-cyber-gold/30 hover:border-cyber-gold/60"
                      }
                    `}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 cyber-text-glow">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl line-through text-cyber-gold/50 font-orbitron">₹{product.originalPrice}</span>
                  <span className="text-4xl font-orbitron font-bold text-cyber-gold">₹{product.price}</span>
                  <span className="bg-red-600 text-white px-2 py-1 text-sm font-bold rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>
              
              <p className="text-lg text-cyber-gold/80 mb-8 font-tech leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-orbitron font-bold mb-4 cyber-text-glow">
                  KEY FEATURES
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 font-tech">
                      <Zap className="w-4 h-4 text-cyber-gold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-orbitron font-bold mb-4 cyber-text-glow">
                  SIZE *
                </h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`
                        w-12 h-12 border-2 font-orbitron font-bold transition-all duration-300
                        ${selectedSize === size
                          ? "bg-cyber-gold text-black border-cyber-gold"
                          : "bg-transparent text-cyber-gold border-cyber-gold/30 hover:border-cyber-gold"
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="text-sm text-cyber-gold/60 hover:text-cyber-gold mt-2 font-tech">
                  SIZE GUIDE
                </button>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-xl font-orbitron font-bold mb-4 cyber-text-glow">
                  QUANTITY
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-cyber-gold/30 flex items-center justify-center hover:border-cyber-gold transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-orbitron font-bold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-cyber-gold/30 flex items-center justify-center hover:border-cyber-gold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <CyberButton
                  onClick={handleAddToCart}
                  className={`flex-1 text-lg py-4 ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  ADD TO CART
                </CyberButton>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`
                    border-2 border-cyber-gold p-4 transition-all duration-300
                    ${isWishlisted 
                      ? "bg-cyber-gold text-black" 
                      : "bg-transparent text-cyber-gold hover:bg-cyber-gold hover:text-black"
                    }
                  `}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              {!selectedSize && (
                <p className="text-sm text-red-400 font-tech mb-4">
                  * Please select a size to add to cart
                </p>
              )}
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-orbitron font-bold mb-8 cyber-text-glow">
              REVIEWS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20"
                  style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-orbitron font-bold">{review.name}</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${i < review.rating ? "text-cyber-gold" : "text-cyber-gold/30"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-cyber-gold/80 font-tech mb-2">
                    {review.comment}
                  </p>
                  {review.verified && (
                    <span className="text-xs text-cyber-gold/60 font-tech">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Related Products */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-orbitron font-bold mb-8 cyber-text-glow">
              RELATED PRODUCTS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20 hover:border-cyber-gold transition-all duration-300"
                  style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
                >
                  <div className="relative">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold">
                      {Math.round(((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                  <h3 className="font-orbitron font-bold mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg line-through text-cyber-gold/50">₹{relatedProduct.originalPrice}</span>
                    <span className="text-xl font-bold text-cyber-gold">₹{relatedProduct.price}</span>
                  </div>
                  <Link to={`/product/${relatedProduct.id}`}>
                    <CyberButton className="w-full">
                      VIEW
                    </CyberButton>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
