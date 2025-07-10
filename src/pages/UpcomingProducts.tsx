import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import CyberButton from "../components/CyberButton";
import Lightning from "../components/Lightning";
import { Calendar, Star, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const UpcomingProducts = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState<string[]>([]);

  const upcomingReleases = [
    {
      id: "1",
      name: "CLASSIC T-SHIRT",
      category: "Classic",
      releaseDate: "August 15, 2025",
      price: 399,
      originalPrice: 899,
      image: "/placeholder.svg",
      description: "Minimalist design with subtle neon accents. Perfect for everyday cyberpunk style.",
      features: ["100% Organic Cotton", "Screen Printed Design", "Regular Fit"],
      limitedQuantity: false
    },
    {
      id: "2", 
      name: "LIMITED T-SHIRT",
      category: "Limited",
      releaseDate: "August 15, 2025",
      price: 399,
      originalPrice: 899,
      image: "/placeholder.svg",
      description: "Holographic print that changes with light. Limited to 100 pieces worldwide.",
      features: ["Holographic Print", "Premium Cotton Blend", "Numbered Edition"],
      limitedQuantity: 100
    },
    {
      id: "3",
      name: "SPECIAL T-SHIRT",
      category: "Special",
      releaseDate: "August 15, 2025", 
      price: 399,
      originalPrice: 899,
      image: "/placeholder.svg",
      description: "LED-embedded design with reactive technology. The ultimate futuristic statement.",
      features: ["Embedded LED Strips", "Touch Reactive", "Wireless Charging Compatible"],
      limitedQuantity: 50
    }
  ];

  const monthlySchedule = [
    { month: "August 2025", status: "upcoming" },
    { month: "September 2025", status: "planned" },
    { month: "October 2025", status: "planned" },
    { month: "November 2025", status: "planned" }
  ];

  const handleNotifyMe = (productId: string, productName: string) => {
    if (emailNotifications.includes(productId)) {
      toast({
        title: "Already Subscribed",
        description: `You're already set to be notified about ${productName}`,
        variant: "default"
      });
      return;
    }

    setEmailNotifications(prev => [...prev, productId]);
    toast({
      title: "Notification Set!",
      description: `You'll be notified when ${productName} releases`,
      variant: "default"
    });
  };

  const handleJoinWaitlist = () => {
    toast({
      title: "Welcome to the Waitlist!",
      description: "You'll be the first to know about new releases",
      variant: "default"
    });
  };

  const handleViewUpcoming = () => {
    // Scroll to the next release section
    const nextReleaseSection = document.querySelector('section[data-section="next-release"]');
    if (nextReleaseSection) {
      nextReleaseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinNewsletter = () => {
    toast({
      title: "Newsletter Subscription",
      description: "Newsletter signup functionality coming soon!",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0 opacity-30">
          <Lightning hue={51} speed={1.2} intensity={0.5} size={1.5} />
        </div>
        
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-orbitron font-black cyber-text-glow"
          >
            UPCOMING DROPS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg text-cyber-gold/80 mt-4 font-tech"
          >
            Every month, 3 new T-shirt designs. Be ready.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8"
          >
            <CyberButton onClick={handleViewUpcoming}>
              VIEW UPCOMING
            </CyberButton>
          </motion.div>
        </div>
      </section>

      {/* Next Release */}
      <section className="py-20 px-6" data-section="next-release">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 cyber-text-glow"
          >
            NEXT RELEASE
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingReleases.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="border border-cyber-gold/30 p-6 bg-cyber-dark-gray/20 relative overflow-hidden"
                style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
              >
                {product.limitedQuantity && (
                  <div className="absolute top-4 right-4 bg-cyber-gold text-black px-3 py-1 text-xs font-orbitron font-bold">
                    LIMITED {product.limitedQuantity}
                  </div>
                )}
                
                <div className="relative mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <div className="mb-4">
                  <span className="text-cyber-gold/60 text-sm font-tech uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-orbitron font-bold mt-2 cyber-text-glow">
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-cyber-gold/80 font-tech mb-4 text-sm">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-orbitron font-bold mb-2 text-sm">FEATURES:</h4>
                  <ul className="text-cyber-gold/70 font-tech text-xs space-y-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Star className="w-3 h-3 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-cyber-gold">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg line-through text-cyber-gold/50">₹{product.originalPrice}</span>
                      <span className="text-2xl font-orbitron font-bold">₹{product.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-cyber-gold/60 font-tech text-xs">
                    <Calendar className="w-4 h-4 mr-1" />
                    {product.releaseDate}
                  </div>
                </div>
                
                <CyberButton 
                  className="w-full"
                  onClick={() => handleNotifyMe(product.id, product.name)}
                  disabled={emailNotifications.includes(product.id)}
                >
                  {emailNotifications.includes(product.id) ? 'NOTIFIED ✓' : 'NOTIFY ME'}
                </CyberButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Schedule */}
      <section className="py-20 px-6 bg-cyber-gray-800/20">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16 cyber-text-glow"
          >
            RELEASE SCHEDULE
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlySchedule.map((schedule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`
                  border p-6 text-center
                  ${schedule.status === 'upcoming' 
                    ? 'border-cyber-gold bg-cyber-gold/10' 
                    : 'border-cyber-gold/30 bg-cyber-dark-gray/20'
                  }
                `}
                style={{ 
                  boxShadow: schedule.status === 'upcoming' 
                    ? "0 0 30px rgba(255, 215, 0, 0.3)" 
                    : "0 0 20px rgba(255, 215, 0, 0.1)" 
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-cyber-gold" />
                </div>
                <h3 className="font-orbitron font-bold mb-2 cyber-text-glow">
                  {schedule.month}
                </h3>
                {schedule.status === 'upcoming' && (
                  <div className="mt-4">
                    <span className="bg-cyber-gold text-black px-3 py-1 text-xs font-orbitron font-bold">
                      NEXT UP
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-cyber-gold/10 to-cyber-gold/5 border border-cyber-gold/50 p-12 max-w-2xl mx-auto"
            style={{ boxShadow: "0 0 50px rgba(255, 215, 0, 0.2)" }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 cyber-text-glow">
              NEVER MISS A DROP
            </h2>
            <p className="text-lg text-cyber-gold/80 mb-8 font-tech">
              Get notified 24 hours before each release. Be first in line for limited editions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CyberButton 
                className="text-lg px-12 py-4"
                onClick={handleJoinWaitlist}
              >
                JOIN WAITLIST
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

export default UpcomingProducts;
