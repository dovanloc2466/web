// src/components/ChatList.tsx
import { List } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useChat } from '../ChatContext';


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

const StyledLinkDisable = styled.div`
  width: 100%;
  display: block;
  color: red;
  font-weight: 500;
  opacity: 0.5;
  cursor: not-allowed;
`;

const FetchNewChatJob: React.FC<{ chat: any }> = ({ chat }: { chat: any }) => {
  const { clients } = useChat();

  return (
    <StyledListItem>
      {clients.find(e => e.status == 'active' && e.clientId == chat.clientId) ? <StyledLink to={`/chat/${chat.clientId}`}>{chat.phoneNumber}</StyledLink> : <StyledLinkDisable>{chat.phoneNumber}</StyledLinkDisable>}
    </StyledListItem>
  );
};

export default FetchNewChatJob;