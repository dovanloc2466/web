// src/AppRouter.tsx
import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatLayout from './components/ChatLayout';
import Login from './components/Login';
import API_URL from './config'; // Import URL từ file config
import { ChatProvider } from './ChatContext';

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('token');
    if (storedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (values: any) => {
    try {
      const response = await axios.post(API_URL + "auth/login", values);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true)
    } catch (err) {
      console.error('Login failed:', err);
      setIsAuthenticated(false)
    }
  }
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ChatProvider>
      <Router>
        <ChatLayout handleLogout={handleLogout} />
      </Router>
    </ChatProvider>

  );
};

export default AppRouter;