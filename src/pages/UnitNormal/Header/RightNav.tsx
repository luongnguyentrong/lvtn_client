import { Menu, MenuProps } from "antd";
import { UserOutlined, ProfileOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';

export default function () {
    const items: MenuProps['items'] = [
        {

            key: "notification",
            icon: <BellOutlined />,
            label: "Thông báo"
        },
        {
            key: "user",
            icon: <UserOutlined />,
            children: [
                {
                    key: "profile",
                    icon: <ProfileOutlined />,
                    label: "Trang cá nhân"
                },
                {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout"
                }
            ]
        }
    ]

    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{
                justifyContent: "end",
            }}
            items={items}
        />
    )
}
