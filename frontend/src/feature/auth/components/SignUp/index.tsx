import React from "react";
import { Button, Form, Input, Alert } from "antd";
import { useAuth } from "feature/auth/hooks/useAuth";
import { SignUpFormValues } from "types/form";

const SignUp: React.FC = () => {
  const { register, isLoading, error } = useAuth();

  const onFinish = async (values: SignUpFormValues) => {
    await register(values.email, values.password, values.name);
  };

  return (
    <Form
      name="signup"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {error && (
        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
          <Alert title={error} type="error" showIcon />
        </Form.Item>
      )}
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please input your name" },
          { min: 2, message: "Name must be at least 2 characters!" },
        ]}
      >
        <Input />
      </Form.Item>
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
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
