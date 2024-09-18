import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import API_URL from '../config';
import ChatList from './ChatList'; // Đảm bảo bạn đã import ChatList
import ChatWindow from './ChatWindow'; // Đảm bảo bạn đã import ChatWindow

const { Header, Sider, Content } = Layout;
export interface PhoneNumber {
    phoneNumber: string;
    clientId: string;
    textNowUser: string;
}

export interface User {
    username: string;
    phoneNumbers: PhoneNumber[];
}
const ChatLayout = ({ handleLogout }: any) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(API_URL + 'auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);


    return (
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
                    <Content style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                            <Routes>
                                <Route path="/chat/:id" element={<ChatWindow user={user} />} />
                                <Route path="/" element={<div style={{ fontWeight: 'bold', fontSize: 20 }}>Select a chat</div>} />
                                <Route path="/login" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default ChatLayout;
