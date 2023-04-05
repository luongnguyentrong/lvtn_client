import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Cookies from 'universal-cookie';
import 'antd/dist/reset.css'
import './index.css';
import axios from 'axios';
import MainPage from './MainPage';
import UnitAdmin from './pages/UnitAdmin/UnitAdmin';
import Loading from './pages/Loading';
import Admin from './pages/Admin';
import Normal from './pages/Normal';
import { getUnit } from './utils';
import { useNavigate } from 'react-router-dom';

function getAuthParams() {
    const data = {
        "response_type": "code",
        "client_id": "console",
        "redirect_uri": window.location.origin + "/oauth2/token",
        "scope": "openid profile email roles"
    }

    const params = new URLSearchParams(data)

    return params.toString()
}

function App() {
    return <UnitAdmin />
    const [mainRole, setMainRole] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        const cookies = new Cookies()
        const access_token = cookies.get("access_token")

        if (!access_token) {
            const authorization_endpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/auth?${getAuthParams()}`

            window.location.href = authorization_endpoint
        } else {
            const userinfo_endpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/userinfo`

            const config = {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            };

            axios.post(userinfo_endpoint, {}, config).then((res) => {
                if (res.status === 200) {
                    if (res.data.roles && Array.isArray(res.data.roles)) {
                        const roles: string[] = res.data.roles

                        if (roles.includes("admin")) {
                            setMainRole("admin")
                        } else if (roles.includes("unit_admin")) {
                            setMainRole("unit_admin")
                        } else if (roles.includes("unit_normal")) {
                            setMainRole("unit_normal")
                        }
                    }
                }
            }).catch(error => {
                cookies.remove("access_token")
                cookies.remove("id_token")
                cookies.remove("refresh_token")
                navigate("/")
            })
        }
    }, [])
        
    switch (mainRole) {
        case "admin":
            return <Admin />

        case "unit_admin":
            return <UnitAdmin />

        case "unit_normal":
            return <Normal />

        default:
            return <Loading />
    }
}

export default App;
