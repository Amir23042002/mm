
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import UserProfileDropdown from "./UserProfileDropdown";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PRODUCTS", path: "/products" },
    { name: "LEADERSHIP", path: "/leadership" },
    { name: "UPCOMING", path: "/upcoming" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-cyber-gold/30">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold font-orbitron cyber-text-glow">
            OYIEE
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative font-orbitron font-bold text-xs lg:text-sm tracking-wider transition-all duration-300 hover:text-cyber-gold-bright"
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyber-gold"
                    layoutId="activeTab"
                    style={{ boxShadow: "0 0 8px #FFD700" }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10 font-orbitron"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-cyber-gold text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </Link>
                <UserProfileDropdown />
              </>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10 font-orbitron"
                >
                  SIGN IN
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <Link to="/cart" className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10 font-orbitron p-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-cyber-gold text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            <Button
              variant="outline"
              size="sm"
              className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10 p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 border-t border-cyber-gold/30 pt-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="font-orbitron font-bold text-sm tracking-wider transition-all duration-300 hover:text-cyber-gold-bright px-2 py-1"
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <div
                      className="mt-1 h-0.5 bg-cyber-gold"
                      style={{ boxShadow: "0 0 8px #FFD700" }}
                    />
                  )}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-cyber-gold/20">
                {user ? (
                  <div className="flex items-center justify-between">
                    <UserProfileDropdown />
                  </div>
                ) : (
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyber-gold/30 text-cyber-gold hover:bg-cyber-gold/10 font-orbitron w-full"
                    >
                      SIGN IN
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
