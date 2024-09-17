// src/components/ChatList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Input, Button, Select, Typography } from 'antd';
import styled from 'styled-components';
import { PhoneNumber } from './ChatLayout';
import FetchNewChatJob from './FetchNewChatJob';
import axios from 'axios';
import API_URL from '../config';
import { useChat } from '../ChatContext';

const { Title } = Typography;

interface Chat {
  id: number;
  name: string;
}

const chats: Chat[] = [
  { id: 1, name: 'Chat 1' },
  { id: 2, name: 'Chat 2' },
];


const ChatListContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

const ChatListHeader = styled(Title)`
  margin-bottom: 20px !important;
`;

const StyledList = styled(List)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledListItem = styled(List.Item)`
  padding: 12px 20px !important;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
  color: #1890ff;
  font-weight: 500;
`;

const ChatList: React.FC<{ listphone: PhoneNumber | undefined }> = ({ listphone }: { listphone: any }) => {
  const { clients, setClients } = useChat();
  const handleGetContact = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }
      const res = await axios.get(API_URL + 'textnow/get-all-messages', {
        params: {
          pageSize: 10,

        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClients(res.data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  useEffect(() => {
    if (listphone) {
      const interval = setInterval(handleGetContact, 20000);
      return () => clearInterval(interval);
    }
  }, [listphone]);

  useEffect(() => {
    if (listphone) {
      handleGetContact();
    }
  }, [listphone]);


  return (
    <ChatListContainer>
      <ChatListHeader level={3}>Phone Number List</ChatListHeader>
      {clients.length > 0 && (<StyledList
        dataSource={listphone}
        renderItem={(chat: any) => {
          return (
            <FetchNewChatJob chat={chat} />
          )
        }}
      />)}


    </ChatListContainer>
  );
};

export default ChatList;