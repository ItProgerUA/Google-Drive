import React from "react";
import { Button, Form, Input, Alert } from "antd";
import { useAuth } from "feature/auth/hooks/useAuth";
import { LoginFormValues } from "types/form";

const Login: React.FC = () => {
  const { login, isLoading, error } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    await login(values.email, values.password);
  };

  return (
    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {error && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Alert title={error} type="error" showIcon />
        </Form.Item>
      )}

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
