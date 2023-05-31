import { Dropdown, Menu, MenuProps, Space } from "antd";
import { UserOutlined, LogoutOutlined, QuestionCircleOutlined, BellOutlined } from '@ant-design/icons';
import axios from "axios";
import Cookies from "universal-cookie";
import { getBearerHeader, getUnit } from "../utils";
import { config } from "process";

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
                const logoutEndpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/logout`
                const cookies = new Cookies()

                getBearerHeader().then(config => {
                    const params = new URLSearchParams()
                    params.append("client_id", "console")
                    params.append("refresh_token", cookies.get("refresh_token"))

                    return axios.post(logoutEndpoint, params, config)
                }).then(res => {
                    if (res.status === 204) {
                        cookies.remove("access_token")
                        cookies.remove("refresh_token")

                        location.reload()
                    }
                })
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
                    <UserOutlined /> User
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