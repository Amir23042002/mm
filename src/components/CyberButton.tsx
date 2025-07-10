
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CyberButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
}

const CyberButton = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "", 
  disabled = false 
}: CyberButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden bg-transparent border-2 border-cyber-gold 
        text-cyber-gold px-6 py-3 font-orbitron font-bold uppercase 
        tracking-wider transition-all duration-300 disabled:opacity-50
        disabled:cursor-not-allowed ${className}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      style={{
        boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "#FFD700";
          e.currentTarget.style.color = "#000000";
          e.currentTarget.style.boxShadow = "0 0 30px #FFD700, 0 0 50px #FFD700";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#FFD700";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.3)";
        }
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-gold/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      {children}
    </motion.button>
  );
};

export default CyberButton;
