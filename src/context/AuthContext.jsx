import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shopsphere_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load/verification
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('shopsphere_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('shopsphere_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Dummy validation
    if (!email || !password) {
      throw new Error('Please enter email and password');
    }
    
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }

    const dummyUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0] || 'User',
      email: email,
      token: 'demo-token-' + Date.now()
    };
    
    setUser(dummyUser);
    return dummyUser;
  };

  const register = async (name, email, password, phone) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const dummyUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      phone: phone || '',
      token: 'demo-token-' + Date.now()
    };
    
    setUser(dummyUser);
    return dummyUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (user) {
      const newUser = { ...user, ...updatedData };
      setUser(newUser);
      return newUser;
    }
    throw new Error('No user logged in');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
