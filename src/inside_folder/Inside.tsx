import React from 'react';
import { Layout, Row, Col, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import 'antd/dist/reset.css';
const { Header, Footer, Content, Sider } = Layout;
import { theme } from 'antd';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Modal } from 'antd';
import './inside.css';
import { useState, useEffect } from "react";
import CreateTable from '../Create-table/CreateTable';
import Uploadfile from '../Upload-file/Uploadfile';
//const apiEndpoint = 'https://er37kclyy9.execute-api.ap-southeast-1.amazonaws.com/dev/lvtnstorage/Untitled.png';

const Inside = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
const items: MenuProps['items'] = [
  {
    key: '1',
    label: ( 
      <div>uploadfile</div>
    ),
  },
  {
    key: '2',
    label: (
      <div>tạo văn bản</div>
    ),
  },
  {
    key: '3',
    label: (
      <>
      <Button onClick={showModal}>
        Tạo bảng dữ liệu
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CreateTable />
      </Modal>
    </>
    ),
  },
];
  return (
  <Layout>

    <Content style={{ width: '80%', height: '1000px', margin: '0 0' }}>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              width: 1290,
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Đánh giá sinh viên
            <Button style={{ margin: '0px 10px 0px 900px' }}>Phân tích</Button>
            <Dropdown className='Plus' menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }} trigger={['click']}>
              <Button>+ Thêm mới</Button>
            </Dropdown>
            <br />
          
        {/* //  <Uploadfile apiEndpoint={apiEndpoint}/> */}
          </Content>
        </Layout>
      </Layout>
    </Content>
    <Footer >Footer</Footer>

  </Layout>
  );
};

export default Inside;