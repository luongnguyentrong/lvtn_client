import React from 'react';
import { Layout, Row, Col, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import 'antd/dist/reset.css';
const { Header, Footer, Content, Sider } = Layout;
import { theme } from 'antd';
import { Divider, List, Typography } from 'antd';
import './inside.css';
import UploadSection from '../components/UploadSection';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <UploadSection />
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];


const Inside = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (<Layout>

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
            <Dropdown className='Plus' menu={{ items }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
              <Button>+ Thêm mới</Button>
            </Dropdown>


            <br />
            <Divider orientation="left">Small Size</Divider>
            <List
              size="small"
              header={<div>Header</div>}
              footer={<div>Footer</div>}
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Content>
        </Layout>
      </Layout>
    </Content>

    <Footer >Footer</Footer>

  </Layout>
  );
};

export default Inside;