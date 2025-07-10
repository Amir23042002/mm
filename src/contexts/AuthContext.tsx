
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  fullName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithToken: (token: string) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('oyiee_token');
    if (token) {
      try {
        const decoded = jwtDecode<User & { exp: number }>(token);
        if (decoded.exp > Date.now() / 1000) {
          setUser({
            id: decoded.id,
            fullName: decoded.fullName,
            email: decoded.email,
            gender: decoded.gender,
            phone: decoded.phone
          });
        } else {
          localStorage.removeItem('oyiee_token');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('oyiee_token');
      }
    }
    setLoading(false);
  }, []);

  const loginWithToken = (token: string) => {
    try {
      const decoded = jwtDecode<User & { exp: number }>(token);
      localStorage.setItem('oyiee_token', token);
      setUser({
        id: decoded.id,
        fullName: decoded.fullName,
        email: decoded.email,
        gender: decoded.gender,
        phone: decoded.phone
      });
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        loginWithToken(data.token);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: data.error || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  };

  const signOut = () => {
    localStorage.removeItem('oyiee_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    loginWithToken,
    login,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
