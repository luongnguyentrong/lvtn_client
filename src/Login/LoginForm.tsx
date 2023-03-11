import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css';
import Keycloak from 'keycloak-js';

function LoginForm() {
  let history = useNavigate();
  history('/mainpage');
  // const handleSubmit = (values: any) => {
  //   const { username, password } = values;

  //   // Send a POST request to the server
  //   fetch('http://localhost:8080', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ username, password })
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log('Request succeeded!');
  //       history('/mainpage');
  //     } else {
  //       console.log('Request failed!');
  //     }
  //   })
  //   .catch(error => {
  //     console.log('Request failed!', error);
  //   });
  // };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="Form_login">
       <div className="title">
          <h1>QA System</h1>
        </div>
      <Form
        rootClassName="form"
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        //onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="sub">Vui lòng nhập thông tin để đăng nhập</div>
        <Form.Item
            rootClassName="formItem"
            label={<p style={{ fontSize: '17px' }}>Username</p>}
            name="username"
            style={{ marginTop: 80 }}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            rootClassName="formItem"
            label={<p style={{ fontSize: '17px' }}>Password</p>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="forget">
            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 30 }} className="btt1">
            <Button
              type="primary"
              htmlType="submit"
              className="btt"
            >
              {' '}
              Đăng nhập{' '}
            </Button>
          </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm

