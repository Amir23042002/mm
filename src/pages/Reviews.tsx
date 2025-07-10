
import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import CyberButton from "../components/CyberButton";

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  
  const filters = ["All", "5 Stars", "4 Stars", "3 Stars", "By Product"];
  
  const reviews = [
    {
      id: 1,
      name: "Alex Chen",
      product: "CYBER JACKET X1",
      rating: 5,
      date: "2024-12-15",
      comment: "This jacket is absolutely incredible! The adaptive fiber technology actually works - it kept me warm when it was cold and breathable when it got hot. The LED strips are subtle but add the perfect cyberpunk touch. Worth every penny!",
      verified: true,
      helpful: 23,
      tags: ["🔥 Trendy", "🚀 Fast Delivery"]
    },
    {
      id: 2,
      name: "Maya Rodriguez",
      product: "NEON HOODIE",
      rating: 5,
      date: "2024-12-12",
      comment: "I've never owned anything like this. The quality is outstanding - you can feel the premium materials immediately. The glow effect is mesmerizing and gets compliments everywhere I go. OYIEE is the future of fashion!",
      verified: true,
      helpful: 18,
      tags: ["🔥 Trendy", "💎 Premium Quality"]
    },
    {
      id: 3,
      name: "Jordan Kim",
      product: "QUANTUM PANTS",
      rating: 5,
      date: "2024-12-10",
      comment: "These pants are from another dimension. The fit is perfect, the material feels like liquid metal, and the way they catch light is just stunning. Limited edition piece that I'll treasure forever.",
      verified: true,
      helpful: 15,
      tags: ["🚀 Fast Delivery", "💎 Premium Quality"]
    },
    {
      id: 4,
      name: "Sam Rivers",
      product: "HOLOGRAM VEST",
      rating: 4,
      date: "2024-12-08",
      comment: "Really cool vest with amazing holographic effects. The only reason it's not 5 stars is that I wish it came in more sizes. But the quality and design are top-notch. Definitely buying more from OYIEE.",
      verified: true,
      helpful: 12,
      tags: ["🔥 Trendy"]
    },
    {
      id: 5,
      name: "Taylor Park",
      product: "ELECTRIC DRESS",
      rating: 5,
      date: "2024-12-05",
      comment: "This dress is a masterpiece! Wore it to a cyberpunk event and I was the center of attention. The electric blue accents are mesmerizing and the cut is so flattering. OYIEE has redefined what fashion can be.",
      verified: true,
      helpful: 20,
      tags: ["🔥 Trendy", "✨ Show Stopper"]
    },
    {
      id: 6,
      name: "Casey Wong",
      product: "PLASMA SHORTS",
      rating: 4,
      date: "2024-12-02",
      comment: "Great shorts for the summer cyberpunk aesthetic. The plasma effect is subtle but noticeable. Comfortable and well-made. Would love to see more colors in future drops!",
      verified: true,
      helpful: 8,
      tags: ["🚀 Fast Delivery"]
    }
  ];

  const topReviews = reviews.filter(review => review.rating === 5).slice(0, 3);

  const getFilteredReviews = () => {
    if (selectedFilter === "All") return reviews;
    if (selectedFilter === "5 Stars") return reviews.filter(r => r.rating === 5);
    if (selectedFilter === "4 Stars") return reviews.filter(r => r.rating === 4);
    if (selectedFilter === "3 Stars") return reviews.filter(r => r.rating === 3);
    return reviews;
  };

  const getAverageRating = () => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-orbitron font-black text-center mb-8 cyber-text-glow"
          >
            REVIEWS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-cyber-gold/80 text-center max-w-2xl mx-auto font-tech"
          >
            Real feedback from our cyberpunk community. See what fashion revolutionaries 
            are saying about their OYIEE experience.
          </motion.p>
        </div>
      </section>

      {/* Rating Overview */}
      <section className="pb-12 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* Average Rating */}
            <div className="text-center border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20"
                 style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}>
              <div className="text-4xl font-orbitron font-bold cyber-text-glow mb-2">
                {getAverageRating()}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < Math.floor(Number(getAverageRating())) ? "text-cyber-gold" : "text-cyber-gold/30"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-cyber-gold/80 font-tech">
                Based on {reviews.length} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20"
                 style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}>
              <h3 className="font-orbitron font-bold mb-4 cyber-text-glow">
                RATING BREAKDOWN
              </h3>
              {Object.entries(getRatingDistribution()).reverse().map(([stars, count]) => (
                <div key={stars} className="flex items-center space-x-2 mb-2">
                  <span className="font-tech text-sm w-6">{stars}★</span>
                  <div className="flex-1 bg-cyber-gold/20 h-2">
                    <div 
                      className="bg-cyber-gold h-2"
                      style={{ width: `${(count / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="font-tech text-sm w-8">{count}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20"
                 style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}>
              <h3 className="font-orbitron font-bold mb-4 cyber-text-glow">
                COMMUNITY STATS
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between font-tech">
                  <span>Total Reviews:</span>
                  <span className="text-cyber-gold">{reviews.length}</span>
                </div>
                <div className="flex justify-between font-tech">
                  <span>5-Star Reviews:</span>
                  <span className="text-cyber-gold">{getRatingDistribution()[5]}</span>
                </div>
                <div className="flex justify-between font-tech">
                  <span>Verified Purchases:</span>
                  <span className="text-cyber-gold">{reviews.filter(r => r.verified).length}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Reviews */}
      <section className="pb-12 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-orbitron font-bold mb-8 cyber-text-glow"
          >
            TOP REVIEWS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="border border-cyber-gold/50 p-6 bg-gradient-to-br from-cyber-gold/10 to-cyber-gold/5"
                style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.2)" }}
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
                
                <p className="text-cyber-gold/80 font-tech mb-4 leading-relaxed">
                  {review.comment}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-cyber-gold/20 text-cyber-gold px-2 py-1 font-tech"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-cyber-gold/60 font-tech">
                  {review.verified && "✓ Verified Purchase"} • {review.helpful} found helpful
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`
                  px-4 py-2 border font-tech text-sm transition-all duration-300
                  ${selectedFilter === filter 
                    ? "bg-cyber-gold text-black border-cyber-gold" 
                    : "bg-transparent text-cyber-gold border-cyber-gold/30 hover:border-cyber-gold"
                  }
                `}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Reviews */}
      <section className="pb-20 px-6">
        <div className="container mx-auto">
          <div className="space-y-6">
            {getFilteredReviews().map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20"
                style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
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
                      {review.verified && (
                        <span className="text-xs bg-cyber-gold/20 text-cyber-gold px-2 py-1 font-tech">
                          ✓ VERIFIED
                        </span>
                      )}
                    </div>
                    
                    <p className="text-cyber-gold/60 font-tech text-sm mb-3">
                      {review.product} • {review.date}
                    </p>
                    
                    <p className="text-cyber-gold/80 font-tech leading-relaxed mb-4">
                      {review.comment}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-cyber-gold/20 text-cyber-gold px-2 py-1 font-tech"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <button className="text-sm text-cyber-gold/60 hover:text-cyber-gold font-tech transition-colors">
                      👍 Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-cyber-gray-800/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 cyber-text-glow">
              READY TO WRITE YOUR OWN REVIEW?
            </h2>
            <p className="text-lg text-cyber-gold/80 mb-8 font-tech">
              Join our community of cyberpunk fashion pioneers and share your OYIEE experience.
            </p>
            <CyberButton className="text-lg px-12 py-4">
              SHOP NOW
            </CyberButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
