// src/components/ChatList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Input, Button, Select, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

interface Chat {
  id: number;
  name: string;
}

const chats: Chat[] = [
  { id: 1, name: 'Chat 1' },
  { id: 2, name: 'Chat 2' },
];

const phoneNumbers = [
  '+84123456789',
  '+84987654321',
];

const ChatListContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

const ChatListHeader = styled(Title)`
  margin-bottom: 20px !important;
`;

const PhoneSelect = styled(Select)`
  width: 100%;
  margin-bottom: 16px;
`;

const AddChatGroup = styled(Input.Group)`
  display: flex !important  ;
  margin-bottom: 16px;  
`;

const AddChatInput = styled(Input)`
  flex: 1;
`;

const AddChatButton = styled(Button)`
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

const ChatList: React.FC = () => {
  const [selectedPhone, setSelectedPhone] = useState<string | undefined>(undefined);

  return (
    <ChatListContainer>
      <ChatListHeader level={3}>Chat List</ChatListHeader>
      <PhoneSelect
        placeholder="Select phone number"
        onChange={(value: any) => setSelectedPhone(value)}
      >
        {phoneNumbers.map((number) => (
          <Select.Option key={number} value={number}>
            {number}
          </Select.Option>
        ))}
      </PhoneSelect>
      <AddChatGroup compact>
        <AddChatInput placeholder="Enter name" />
        <AddChatButton type="primary">Add</AddChatButton>
      </AddChatGroup>
      <StyledList
        dataSource={chats}
        renderItem={(chat: any) => (
          <StyledListItem>
            <StyledLink to={`/chat/${chat.id}`}>{chat.name}</StyledLink>
          </StyledListItem>
        )}
      />
    </ChatListContainer>
  );
};

export default ChatList;