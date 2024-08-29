// src/components/ChatWindow.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, List, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  padding: 20px;
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

  useEffect(() => {
    // Simulating fetching messages from an API
    const sampleMessages: Message[] = [
      { id: 1, sender: 'User', content: 'Hello!', timestamp: '2023-05-20T10:00:00Z' },
      { id: 2, sender: 'Bot', content: 'Hi there! How can I help you today?', timestamp: '2023-05-20T10:01:00Z' },
      { id: 3, sender: 'User', content: 'I have a question about your services.', timestamp: '2023-05-20T10:02:00Z' },
      { id: 4, sender: 'Bot', content: 'Sure, I\'d be happy to help. What would you like to know?', timestamp: '2023-05-20T10:03:00Z' },
    ];
    setMessages(sampleMessages);
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'User',
        content: input,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <ChatContainer>
      <ChatHeader level={2}>Chat {id}</ChatHeader>
      <MessageList
        dataSource={messages}
        renderItem={(msg: any) => (
          <MessageItem isUser={msg.sender === 'User'}>
            <div className="message-content">
              <span className="message-sender">{msg.sender}</span>
              <div className="message-bubble">
                {msg.content}
              </div>
              <span className="message-timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
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
  );
};

export default ChatWindow;