// src/components/ChatContact.tsx
import { Button, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useChat } from '../ChatContext';
import parsePhoneNumber from 'libphonenumber-js'

const { Title } = Typography;

const ChatContactContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

const ChatContactHeader = styled(Title)`
  margin-bottom: 20px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  &[data-highlighted="true"] {
    background-color: #e6f7ff;
  }
`;

const StyledLink = styled.div`
  width: 100%;
  display: block;
  color: #1890ff;
  font-weight: 500;
  cursor: pointer;
`;

const ChatContact: React.FC<any> = ({ newChat }: any) => {
  const { id } = useParams<Record<string, string | undefined>>();
  const { clients } = useChat();

  const location = useLocation();
  const navigate = useNavigate();

  const setQueryParam = (paramName: string, paramValue: string) => {
    const params = new URLSearchParams(location.search);
    params.set(paramName, paramValue);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const [contact, setContact] = useState();
  useEffect(() => {
    handleGetContact();
  }, [id]);

  const handleGetContact = async () => {
    const client = clients.find(e => e.clientId == id);
    if (client && client.messages) {
      const distinctContactValues: string[] = Array.from(new Set(client.messages.map((message: any) => message.contact_value)));
      setContact(distinctContactValues as any);
    }
  }

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('contact');
  };

  const currentContact = getQueryParams();

  return (
    <ChatContactContainer>
      <ChatContactHeader level={3}>Contact List <Button onClick={newChat}>New Chat</Button></ChatContactHeader>
      <StyledList
        dataSource={contact}
        renderItem={(chat: any) => {
          const phoneNumber = parsePhoneNumber(chat, "US")
          return (
            <StyledListItem data-highlighted={currentContact === chat}>
              <StyledLink onClick={() => { setQueryParam("contact", chat) }}>{phoneNumber?.formatNational()}</StyledLink>
            </StyledListItem>
          )
        }}
      />
    </ChatContactContainer>
  );
};

export default ChatContact;