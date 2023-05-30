import { Dropdown, Menu, MenuProps, Space } from "antd";
import { UserOutlined, LogoutOutlined, QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import axios from "axios";
import Cookies from "universal-cookie";
import { getBearerHeader, getUnit } from "../utils";

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
            icon: <LogoutOutlined />,
            onClick: () => {
                const url = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/logout?redirect_uri=${location.hostname}`

                window.location.replace(url);
            }
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
            key: "user",
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