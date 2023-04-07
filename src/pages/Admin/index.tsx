import React from 'react';
import { SettingOutlined, BellOutlined, UserOutlined, LineChartOutlined, ApartmentOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Avatar, Layout, Menu, Row, Col, Input } from 'antd';
import Content from './Content';
import { useNavigate } from 'react-router-dom';

const { Header, Footer } = Layout;
const { Search } = Input


const menu_items: MenuProps['items'] = [UserOutlined, SettingOutlined, BellOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub_${key}`,
            icon: <Badge count={5}><Avatar shape='square' icon={React.createElement(icon)} /></Badge>,
        };
    },
);

const navs = [
    {
        label: "Dashboard",
        icon: LineChartOutlined,
        path: "/dashboard",
    },
    {
        label: "Đơn vị",
        icon: ApartmentOutlined,
        path: "/units",
    },
    {
        label: "Quản lý người dùng",
        icon: TeamOutlined,
    }
]

const sider_items: MenuProps['items'] = navs.map(
    (obj, index) => {
        return {
            key: `slider_items_${index}`,
            icon: React.createElement(obj.icon),
            label: obj.label,
        };
    },
);

const headerStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    height: "48px",
    lineHeight: "48px",
    width: "100%",
    zIndex: "100",
    right: "0px",
}

const emptyHeaderStyle: React.CSSProperties = {
    height: "48px",
    lineHeight: "48px",
    background: "transparent",
}

const siderStyles: React.CSSProperties = {
    overflow: "hidden",
    paddingTop: "48px",
    flex: "0 0 208px",
    maxWidth: "208px",
    minWidth: "208px",
    width: "208px",
}

const App: React.FC = () => {
    const navigate = useNavigate()

    const handleSiderClick: MenuProps["onClick"] = (e) => {
        if (e.key === "slider_items_1")
            navigate("/units")
    }

    return (
        <Layout>
            <Layout.Sider style={siderStyles} >
                <Menu
                    mode="inline"
                    style={{ height: '100%' }}
                    items={sider_items}
                    onClick={handleSiderClick}
                />
            </Layout.Sider>

            <Layout>
                <Header style={emptyHeaderStyle} />
                <Header style={headerStyles}>
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
        </Layout>
    );
};

export default App;