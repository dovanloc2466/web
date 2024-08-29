// src/AppRouter.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Dropdown, Avatar, Menu } from 'antd';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import { UserOutlined } from '@ant-design/icons';
import Login from './components/Login';
const { Header, Content, Sider } = Layout;

const AppRouter: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo192.png" alt="Logo" style={{ height: '32px', marginLeft: '16px', marginRight: '16px' }} />
              <h2 style={{ margin: '0' }}>Chat Application</h2>
            </div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Avatar style={{ margin: '16px' }} icon={<UserOutlined />} />
            </Dropdown>
          </Header>
          <Layout>
            <Sider width={300} style={{ background: '#f0f2f5' }}>
              <ChatList />
            </Sider>
            <Content style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ flex: 1 }}>
                <Routes>
                  <Route path="/chat/:id" element={<ChatWindow />} />
                  <Route path="/" element={<div>Select a chat</div>} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRouter;