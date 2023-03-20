import React from 'react';
import { Layout, Row, Col } from 'antd';
import 'antd/dist/reset.css';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './index.css';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import Inside from './inside_folder/Inside';

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
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

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key: string = String(index + 1);

    return {
      key: `sub${key}`,
      label: `Folder ${key}`,

    };
  },
);


const Main = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (<Layout>
    <Header>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='Logo' span={6}>
          <img src="./QAS.svg" alt="logo" />
        </Col>
        <Col className='Search-bar' span={12}>
          <Search className='Search' placeholder="input search text" onSearch={onSearch} style={{ width: 500 }} />
        </Col>
        <Col className='Bellout' span={6}>
          <BellOutlined className='bell' />
          <Avatar className='Avartar' size={40} icon={<UserOutlined />} />
        </Col>

      </Row>
    </Header>

    <Content style={{ width: '80%', height: '1000px', margin: '20px 0px' }}>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <div>
            <h1>Các dữ liệu quản lý</h1>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow trigger={['click']}>
              <Button>+ Thêm mới</Button>
            </Dropdown>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Inside />
      </Layout>
    </Content>

    <Footer >Footer</Footer>

  </Layout>
  );
};

export default Main;