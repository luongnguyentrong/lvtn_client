import React from 'react';
import { SettingOutlined, HomeOutlined, BellOutlined, UserOutlined, LineChartOutlined, ApartmentOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Row, Col, Input } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import RightNav from './Header/RightNav';

const { Header, Footer } = Layout;

const navs = [
    {
        label: "Trang chủ",
        icon: HomeOutlined,
        path: "/dashboard",
    },
    {
        label: "Tổ chức",
        icon: ApartmentOutlined,
        path: "/units",
    },
    {
        label: "Quản lý người dùng",
        icon: TeamOutlined,
        path: "/users"
    },
    {
        label: "Cài đặt",
        icon: SettingOutlined,
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
    backgroundColor: "white",
    borderBottom: '1px solid rgba(5, 5, 5, 0.06)'
}

interface IProps {
    children: React.ReactElement;
}

const AdminLayout: React.FC<IProps> = (props: IProps) => {
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
    const navigate = useNavigate()

    const handleSiderClick: MenuProps["onClick"] = (e) => {
        if (e.key === "slider_items_0")
            navigate("/")
        else if (e.key === "slider_items_1")
            navigate("/units")
        else if (e.key === "slider_items_2")
            navigate("/users")
    }

    return (
        <Layout style={{ minHeight: '100%' }}>
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
                            <Link to={"/"}>
                                <div className="logo">
                                    <img src="/logo.png" alt="logo" style={{ width: 32 }} />
                                </div>
                            </Link>
                        </Col>
                        <Col span={12} style={{ display: "inherit" }}><Input.Search size='middle' placeholder='Nhập tên tập dữ liệu...' /></Col>
                        <Col flex="auto">
                            <RightNav />
                        </Col>
                    </Row>
                </Header>

                <Outlet />

                <Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;