import React from 'react';
import { Layout, Row, Col, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import 'antd/dist/reset.css';
const { Header, Footer, Content, Sider } = Layout;
import { theme } from 'antd';
import 'reactjs-popup/dist/index.css';
import { Modal } from 'antd';
import './inside.css';
import { useState, useEffect } from "react";
import CreateTable from '../Create-table/CreateTable';
import Uploadfile from '../Upload-file/Uploadfile';
//const apiEndpoint = 'https://er37kclyy9.execute-api.ap-southeast-1.amazonaws.com/dev/lvtnstorage/Untitled.png';

const Inside = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
  <Layout>

    <Content style={{ width: '80%', height: '1000px', margin: '0 0' }}>
      <Layout>
        
        <Layout style={{ padding: '0 24px 24px' }}>
          <CreateTable/>
          <Content
            style={{
              width: 1290,
              padding: 24,
              margin: 0,
              height: 180,
              background: colorBgContainer,
              marginTop: 50
            }}
          >
            <Button style={{ margin: '0px 10px 0px 900px' }}>Phân tích</Button>
            <br />
          </Content>
        </Layout>
      </Layout>
    </Content>
    <Footer >Footer</Footer>

  </Layout>
  );
};

export default Inside;