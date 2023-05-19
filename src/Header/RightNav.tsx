import { Dropdown, Menu, MenuProps, Space } from "antd";
import { UserOutlined, LogoutOutlined, QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';

export default function () {
    const profile_items: MenuProps['items'] = [
        {
            key: '0',
            label: "Trang cá nhân",
            icon: <UserOutlined />
        },
        {
            type: 'divider',
        },
        {
            key: '1',
            label: "Logout",
            icon: <LogoutOutlined />
        },
    ];

    const items: MenuProps['items'] = [
        {

            key: "notification",
            icon: <BellOutlined />,
            label: "Thông báo"
        }, {
            key: "contact",
            icon: <QuestionCircleOutlined />,
            label: "Liên hệ"
        },
        {
            key: "profile",
            label: <Dropdown menu={{ items: profile_items }} placement="bottomRight" trigger={['click']}>
                <Space>
                    <UserOutlined /> Lương
                </Space>
            </Dropdown>,
        }
    ]

    return (
        <Menu
            mode="horizontal"
            style={{
                justifyContent: "end",
            }}
            items={items}
        />
    )
}