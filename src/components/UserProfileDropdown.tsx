
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, ShoppingCart, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfileDropdown = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user?.fullName || user?.email || 'User';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-cyber-gold/30">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-cyber-gold text-black font-bold text-xs">
              {displayName ? getInitials(displayName) : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-cyber-dark-gray border-cyber-gold/30" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-cyber-gold">
              {user?.fullName || 'User'}
            </p>
            <p className="text-xs leading-none text-cyber-gold/60">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-gold/30" />
        <DropdownMenuItem asChild className="text-cyber-gold hover:bg-cyber-gold/10 cursor-pointer">
          <Link to="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-cyber-gold hover:bg-cyber-gold/10 cursor-pointer">
          <Link to="/cart" className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>Cart</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-cyber-gold hover:bg-cyber-gold/10 cursor-pointer">
          <Link to="/orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-cyber-gold/30" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-cyber-gold hover:bg-cyber-gold/10 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
