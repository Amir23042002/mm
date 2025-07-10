
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Lightning from "../components/Lightning";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-cyber-gold">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 sm:opacity-50">
          <Lightning hue={51} speed={1} intensity={0.6} size={1.5} />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-orbitron font-black cyber-text-glow"
          >
            ABOUT OYIEE
          </motion.h1>
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          
          {/* History Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 sm:mb-16"
          >
            <div className="border border-cyber-gold/30 p-4 sm:p-8 bg-cyber-dark-gray/20" 
                 style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.1)" }}>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold mb-4 sm:mb-6 cyber-text-glow">
                OUR HISTORY
              </h2>
              <p className="text-sm sm:text-lg text-cyber-gold/80 leading-relaxed font-tech mb-3 sm:mb-4">
                Founded in 2025, OYIEE was born out of the dreams of two friends from humble beginnings. 
                Coming from middle-class families, we didn't have millions in funding—but we had vision, 
                courage, and a deep belief that fashion could change lives.
              </p>
              <p className="text-sm sm:text-lg text-cyber-gold/80 leading-relaxed font-tech">
                What started in a small room with sketches, fabric samples, and big ideas has grown into 
                a movement. OYIEE isn't just a brand—it's a statement. A reminder that no matter where 
                you come from, your story deserves to be seen, heard, and worn with pride.
              </p>
            </div>
          </motion.section>

          {/* Vision Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 sm:mb-16"
          >
            <div className="border border-cyber-gold/50 p-4 sm:p-8 bg-gradient-to-r from-cyber-gold/10 to-cyber-gold/5"
                 style={{ boxShadow: "0 0 40px rgba(255, 215, 0, 0.2)" }}>
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold mb-4 sm:mb-6 cyber-text-glow">
                BRAND VISION
              </h2>
              <div className="text-center py-4 sm:py-8">
                <p className="text-lg sm:text-2xl font-orbitron font-bold cyber-text-glow mb-3 sm:mb-4">
                  "We wear dreams—not just clothes."
                </p>
                <p className="text-sm sm:text-lg text-cyber-gold/80 leading-relaxed font-tech mb-3 sm:mb-4">
                  Our vision is to create fashion that speaks louder than words. Every T-shirt is a canvas 
                  of confidence, identity, and attitude. We believe clothing isn't just about what you wear—it's 
                  about who you are, and where you're going.
                </p>
                <p className="text-sm sm:text-lg text-cyber-gold/80 leading-relaxed font-tech">
                  We want to take OYIEE to every street in the world—from the narrow gullies of our hometown 
                  to the runways of global fashion. And we'll do it with heart, hustle, and honesty.
                </p>
              </div>
            </div>
          </motion.section>

          {/* What Makes Us Unique */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold mb-6 sm:mb-8 text-center cyber-text-glow">
              WHAT MAKES US UNIQUE
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  title: "LIMITED DROPS",
                  description: "Each collection is exclusive—only 100 pieces per drop. If you get one, you're part of a select story. No restocks. No repeats."
                },
                {
                  title: "RAW AUTHENTICITY",
                  description: "Every design carries emotion—our roots, struggles, and ambition stitched into the threads. This isn't mass-produced fashion; it's personal."
                },
                {
                  title: "CRAFTED WITH PURPOSE",
                  description: "Each piece is made with care—high-quality cotton, thoughtful printing, and timeless fits that never go out of style."
                },
                {
                  title: "MADE FOR THE STREETS",
                  description: "Our designs are inspired by real life. Bold. Clean. Fearless. Clothes that don't just follow trends—they start them."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="border border-cyber-gold/30 p-4 sm:p-6 bg-cyber-dark-gray/20"
                  style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.1)" }}
                >
                  <h3 className="text-lg sm:text-xl font-orbitron font-bold mb-3 sm:mb-4 cyber-text-glow">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-cyber-gold/80 font-tech leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold mb-6 sm:mb-8 text-center cyber-text-glow">
              OUR JOURNEY
            </h2>
            
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  year: "2025",
                  title: "THE BEGINNING",
                  description: "Two friends, one dream. OYIEE is founded with the mission to create meaningful fashion for the youth, by the youth."
                },
                {
                  year: "2025",
                  title: "FIRST DROP (COMING SOON)",
                  description: "Our debut collection, \"STREET FIRE,\" will launch in August 2025—100 exclusive pieces that mark the beginning of something bold. A movement in the making."
                },
                {
                  year: "2025",
                  title: "BUILT FROM THE GROUND UP", 
                  description: "No investors. No big labels. Just passion, hustle, and community love."
                },
                {
                  year: "THE FUTURE",
                  title: "GLOBAL REACH",
                  description: "From local streets to international spotlights—we're ready to take OYIEE to the world. One shirt, one story at a time."
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-6"
                >
                  <div className="flex-shrink-0 w-full sm:w-24 text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-orbitron font-bold cyber-text-glow">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow border border-cyber-gold/30 p-3 sm:p-4 bg-cyber-dark-gray/20">
                    <h3 className="text-base sm:text-lg font-orbitron font-bold mb-2 text-cyber-gold">
                      {milestone.title}
                    </h3>
                    <p className="text-sm sm:text-base text-cyber-gold/80 font-tech">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default About;
