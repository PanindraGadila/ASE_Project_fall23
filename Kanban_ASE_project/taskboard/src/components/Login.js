import React, { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import * as userApi from "../api/auth";

const Login = ({ onLogin }) => {
  const [error, setError] = useState(null);
  const onFinish = async (values) => {
    try {
      const res = await userApi.signIn(values);
      onLogin(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1>Login</h1>
      {error && (
        <Alert
          style={{ marginBottom: 12, width: "100%" }}
          message={error}
          type="error"
        />
      )}

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login;
