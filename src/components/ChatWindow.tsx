// src/components/ChatWindow.tsx
import { Button, Input, List, Space, Tag, Typography, Form } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ChatContact from './ChatContact';
import { CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import API_URL from '../config';
import { Message, useChat } from '../ChatContext';

const { Title } = Typography;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  padding: 20px;
  flex:1;
`;

const ChatHeader = styled(Title)`
  margin-bottom: 20px !important;
`;

const MessageList = styled(List)`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const MessageItem = styled(List.Item) <{ isUser: boolean }>`
  padding: 12px 20px;
  border-bottom: none !important;
  
  .message-content {
    display: flex;
    flex-direction: column;
    align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    max-width: 80%;
    margin-left: ${props => props.isUser ? 'auto' : '0'};
    margin-right: ${props => props.isUser ? '0' : 'auto'};
  }

  .message-sender {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .message-bubble {
    background: ${props => props.isUser ? '#1890ff' : '#f0f0f0'};
    color: ${props => props.isUser ? '#fff' : '#000'};
    padding: 8px 12px;
    border-radius: 18px;
    max-width: 100%;
    word-wrap: break-word;
  }

  .message-timestamp {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }
`;

const InputGroup = styled(Input.Group)`
  display: flex;
`;

const ChatInput = styled(Input)`
  flex: 1;
`;

const SendButton = styled(Button)`
`;

const ChatWindow: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [newChat, setNewChat] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const [form] = Form.useForm();

  const location = useLocation();
  const { clients } = useChat();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('contact');
  };

  const contact = getQueryParams();

  const handleSend = async () => {

    const token = localStorage.getItem('token');
    const res = await axios.post(API_URL + 'textnow/send-message', { clientId: id, contactValue: contact, message: input, toName: contact, fromName: '' }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
    );
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(), // or any unique identifier
        username: 'YourUsername', // replace with actual username
        contact_value: "19062988308", // replace with actual contact value
        e164_contact_value: "+19062988308", // replace with actual e164 format
        contact_type: 1, // replace with actual contact type
        contact_name: "Contact Name", // replace with actual contact name
        message_direction: 1, // replace with actual message direction
        message_type: 1, // replace with actual message type
        message: input, // message content
        read: false, // set read status
        date: new Date().toISOString(), // current timestamp
        deleted: false, // set deleted status
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };


  const formatPhoneNumber = (input: string): string => {
    const cleaned = ('' + input).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    const formattedMatch = input.match(/^\((\d{3})\) (\d{3})-(\d{4})$/);
    if (formattedMatch) {
      return input;
    }

    return input;
  };

  const onFinish = (values: { inputValue: string }) => {
    if (values.inputValue.trim()) {
      const formattedNumber = formatPhoneNumber(values.inputValue.trim());
      if (formattedNumber !== values.inputValue.trim()) {
        setData([...data, formattedNumber]);
        form.resetFields();
      }
    }
  };

  const removeTag = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const currentChat = clients.find(e => e.clientId == id)?.messages.filter(e => e.contact_value == contact);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <Sider width={300} style={{ background: '#f0f2f5' }}>
        <ChatContact newChat={() => {
          setNewChat(true);
        }} />
      </Sider>
      <ChatContainer>
        <ChatHeader level={2}>Chat {contact}</ChatHeader>
        {newChat && (
          <Space direction="vertical" size="middle">
            <Form form={form} onFinish={onFinish} layout="inline">
              <Form.Item name="inputValue">
                <Input placeholder="Input Phone Number" />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
            <div style={{ marginTop: '10px' }}>
              {data.map((e, index) => (
                <Tag key={index} closeIcon={<CloseCircleOutlined />} onClose={() => removeTag(index)}>
                  {e}
                </Tag>
              ))}
            </div>
          </Space>
        )}
        <MessageList
          dataSource={currentChat}
          renderItem={(msg: any) => (
            <MessageItem isUser={msg.message_direction === 2}>
              <div className="message-content">
                <span className="message-sender">{msg.message_direction === 2 ? "Me" : msg.contact_name}</span>
                <div className="message-bubble">
                  {msg.message}
                </div>
                <span className="message-timestamp">
                  {new Date(msg.date).toLocaleTimeString()} {msg.message_direction === 1 ? msg.read ? "Read" : "Unread" : ""}
                </span>
              </div>
            </MessageItem>
          )}
        />
        <InputGroup compact style={{ display: 'flex', gap: '0' }}>
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onPressEnter={handleSend}
            style={{ flex: 1 }}
          />
          <SendButton type="primary" onClick={handleSend}>
            Send
          </SendButton>
        </InputGroup>
      </ChatContainer>
    </div>

  );
};

export default ChatWindow;