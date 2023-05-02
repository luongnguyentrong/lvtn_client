import { Menu, MenuProps } from "antd";
import { UserOutlined, BellOutlined } from '@ant-design/icons';


export default function () {
    const items: MenuProps['items'] = [
        {

            key: "notification",
            icon: <BellOutlined />,
            label: "Thông báo"
        },
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "Lương"
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