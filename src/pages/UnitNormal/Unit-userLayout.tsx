import { MenuProps, Layout, Menu } from "antd"
import { ClusterOutlined, HomeOutlined, UsergroupAddOutlined, BlockOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../Header";

export default function () {
    const navigate = useNavigate();


    const menuItems: MenuProps['items'] = [
        {
            key: "tables",
            icon: <HomeOutlined />,
            label: "Trang chủ",
            onClick: () => {
                navigate("/unit_user")
            }
        },

    ]
    return <Layout style={{ height: "100%" }}>
        <Header />
        <Layout>
            <Layout.Sider width={250} style={{ background: "white", paddingTop: 24 }}>
                <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems}
                />
            </Layout.Sider>

            <Layout>
                <Outlet />
                <Layout.Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Layout.Footer>
            </Layout>
        </Layout>

    </Layout>
}