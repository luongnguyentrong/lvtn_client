import { Menu, MenuProps } from "antd";
import { UserOutlined, ProfileOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from "axios";
import { getBearerHeader, getUnit } from "../../../utils";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate()

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
                    onClick: () => {
                        const LogoutEndpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/logout`
                        const config = getBearerHeader()

                        if (config !== undefined) {
                            const cookies = new Cookies()
                            const params = new URLSearchParams()
                            params.append("client_id", "console")
                            params.append("refresh_token", cookies.get("refresh_token"))

                            axios.post(LogoutEndpoint, params, config).then(res => {
                                if (res.status === 204) {
                                    cookies.remove("access_token")
                                    cookies.remove("refresh_token")

                                    navigate("/")
                                }
                            })
                        } 
                    },
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
