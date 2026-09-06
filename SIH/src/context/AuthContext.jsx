import React, { createContext, useContext, useState, useEffect } from 'react';
import { currentUser } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('farmogram_user');
    return saved ? JSON.parse(saved) : currentUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authStatus = localStorage.getItem('farmogram_auth');
    return authStatus !== null ? JSON.parse(authStatus) : true; // default true for seamless SIH demo
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem('farmogram_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('farmogram_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (userData) => {
    setUser(userData || currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const toggleRole = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      setIsAdmin,
      login,
      logout,
      updateProfile,
      toggleRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
