
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Lightning from "../components/Lightning";
import { Mail, Linkedin, Phone } from "lucide-react";

const Leadership = () => {
  const founders = [
    {
      name: "AMIR HASHMI",
      role: "CEO & CO-FOUNDER",
      image: "/lovable-uploads/c93acca5-f58b-478f-91e6-8f286fcd6969.png",
      punchLines: [
        "Creating future-ready solutions with technology & vision",
        "Driven by purpose. Powered by innovation.",
        "Empowering businesses through AI and digital transformation."
      ],
      achievements: [
        "Graduated from University of Calcutta with a B.Com (Honours) degree",
        "Currently working on one active business venture and an AI-based project",
        "Experienced AI Developer with hands-on project leadership",
        "Passionate about building next-gen digital solutions"
      ],
      contact: {
        email: "aamirhashmi02@gmail.com",
        linkedin: "linkedin.com/in/theamirhashmi02",
        phone: "+91 7890875125"
      }
    },
    {
      name: "ZIAUL MUSTAFA", 
      role: "CFO & CO-FOUNDER",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      punchLines: [
        "Strategic financial architect of OYIEE's growth",
        "Turning numbers into sustainable business success",
        "Financial innovation meets technological excellence"
      ],
      achievements: [
        "Secured $50M+ in venture capital funding",
        "Former VP of Finance at Fortune 500 company",
        "CPA with MBA from Wharton Business School",
        "Expert in fintech and blockchain economics"
      ],
      contact: {
        email: "ziaul@oyiee.com",
        linkedin: "linkedin.com/in/ziaulm",
        phone: "+1 (555) 123-4568"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 sm:opacity-60">
          <Lightning hue={51} speed={1.2} intensity={0.7} size={1.8} />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-orbitron font-black cyber-text-glow"
          >
            FOUNDERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-lg text-cyber-gold/80 mt-4 font-tech"
          >
            The visionaries behind OYIEE
          </motion.p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-7xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
              >
                <div 
                  className="border border-cyber-gold/30 p-4 sm:p-8 bg-cyber-dark-gray/20 transition-all duration-300 hover:border-cyber-gold"
                  style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(255, 215, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 215, 0, 0.1)";
                  }}
                >
                  {/* Profile Image */}
                  <div className="relative mb-4 sm:mb-6 overflow-hidden mx-auto w-24 h-24 sm:w-32 sm:h-32">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover rounded-full border-2 border-cyber-gold/50 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Founder Info */}
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-2xl font-orbitron font-bold mb-2 cyber-text-glow">
                      {founder.name}
                    </h3>
                    
                    <div className="text-cyber-gold/80 font-tech text-sm sm:text-lg tracking-wider mb-3 sm:mb-4">
                      {founder.role}
                    </div>

                    {/* Punch Lines */}
                    <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                      {founder.punchLines.map((line, idx) => (
                        <p key={idx} className="text-cyber-gold/70 text-xs sm:text-sm font-tech italic">
                          "{line}"
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-orbitron font-bold mb-2 sm:mb-3 text-cyber-gold">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {founder.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-cyber-gold/70 text-xs sm:text-sm font-tech flex items-start">
                          <span className="text-cyber-gold mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t border-cyber-gold/20 pt-3 sm:pt-4">
                    <h4 className="text-base sm:text-lg font-orbitron font-bold mb-2 sm:mb-3 text-cyber-gold">
                      Contact
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Mail size={14} className="text-cyber-gold sm:w-4 sm:h-4" />
                        <a 
                          href={`mailto:${founder.contact.email}`}
                          className="text-cyber-gold/70 text-xs sm:text-sm font-tech hover:text-cyber-gold transition-colors break-all"
                        >
                          {founder.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Linkedin size={14} className="text-cyber-gold sm:w-4 sm:h-4" />
                        <a 
                          href={`https://${founder.contact.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyber-gold/70 text-xs sm:text-sm font-tech hover:text-cyber-gold transition-colors break-all"
                        >
                          {founder.contact.linkedin}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Phone size={14} className="text-cyber-gold sm:w-4 sm:h-4" />
                        <a 
                          href={`tel:${founder.contact.phone}`}
                          className="text-cyber-gold/70 text-xs sm:text-sm font-tech hover:text-cyber-gold transition-colors"
                        >
                          {founder.contact.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-cyber-gold animate-pulse" />
                    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-cyber-gold animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-cyber-gold animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-cyber-gold animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;
