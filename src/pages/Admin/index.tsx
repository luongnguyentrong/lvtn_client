import React from 'react';
import { SettingOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Avatar, Layout, Menu, Row, Col, Input } from 'antd';
import Content from './Content';

const { Header, Footer } = Layout;
const { Search } = Input


const menu_items: MenuProps['items'] = [UserOutlined, SettingOutlined, BellOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub_${key}`,
            icon: <Badge count={5}><Avatar shape='square' icon={React.createElement(icon)} /></Badge>,
            style: {
            },
        };
    },
);


const App: React.FC = () => {
    return (
        <Layout>
            <Header>
                <Row align="middle">
                    <Col span={6}>
                        <div className="logo">
                            <img src="/logo.png" alt="logo" style={{ width: 32 }} />
                        </div>
                    </Col>
                    <Col span={12} style={{ display: "inherit" }}><Search size='middle' placeholder='Enter resource name...' /></Col>
                    <Col span={6} flex="auto">
                        <Menu mode='horizontal' theme='dark' items={menu_items} style={{ justifyContent: 'flex-end' }} />
                    </Col>
                </Row>
            </Header>

            <Content />

            <Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Footer>
        </Layout>
    );
};

export default App;