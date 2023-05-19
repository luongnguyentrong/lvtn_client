import { MenuProps, Layout, Menu } from "antd"
import { ClusterOutlined, UsergroupAddOutlined, BlockOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../Header";

export default function () {
    const navigate = useNavigate();


    const menuItems: MenuProps['items'] = [
        {
            key: "tables",
            icon: <BlockOutlined />,
            label: "Danh sách tập dữ liệu",
            onClick: () => {
                navigate("/unit_admin")
            }
        },
        {
            key: "folders",
            label: "Sơ đồ tổ chức",
            icon: <ClusterOutlined />,
            children: [
                {
                    key: "dsn",
                    label: "Vật lý 1",
                    onClick: () => {
                        navigate("folders/dsn")
                    }
                }
            ]
        },
        {
            key: "analyze",
            label: "Quản lý người dùng",
            icon: <UsergroupAddOutlined />,
            onClick: () => {
                navigate("users")
            }
        },
    ]
    return <Layout style={{ height: "100%" }}>
        <Header />

        <Layout>
            <Layout.Sider width={250} style={{ background: "white", paddingTop: 24 }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['tables']}
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