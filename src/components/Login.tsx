import React from 'react';
import { Form, Input, Button, Typography, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;
const { Content } = Layout;

interface LoginProps {
  onLogin: (values: any) => void;
}

const LoginContainer = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginForm = styled(Form)`
  width: 300px;
  padding: 24px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    if (values.username && values.password) {
      onLogin(values);
    } else {
      console.log('Login failed: Invalid credentials');
    }
  };

  return (
    <LoginContainer>
      <LoginForm
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Login</Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Use username: testuser and password: password123
        </p>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;