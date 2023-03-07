import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

function LoginForm() {
  let history = useNavigate();
  history('/mainpage');
  return (
    <div className='Form_login'>
    <Form
    name="basic"
    labelCol={{ span: 12 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 800 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item className="remember" valuePropName="checked" wrapperCol={{ offset: 10, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 12, span: 30 }}>
     
      <Button type="primary" htmlType="submit" onClick={() => { history("/mainpage");} }
      >  Login  </Button>
    </Form.Item>
  </Form>
  </div>
  );
}

export default LoginForm

