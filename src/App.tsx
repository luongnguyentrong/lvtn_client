import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Cookies from 'universal-cookie';
import './App.css';
import axios from 'axios';
import MainPage from './MainPage';

function getUnit(): string {
    if (process.env.NODE_ENV === "development") {
        return "hcmut"
    }

    const arr = window.location.hostname.split(".")

    if (arr.length === 2) {
        return "main"
    }

    if (arr.length === 3) {
        return arr[0]
    }

    return ""
}

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
    const [mainRole, setMainRole] = useState<string>("")

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
                        } else if (roles.includes("normal")) {
                            setMainRole("normal")
                        }
                    }
                }
            })
        }
    }, [])

    return (
       <MainPage/>
//        <div className="App">
//        <header className="App-header">
//            <img src={logo} className="App-logo" alt="logo" />
//            { mainRole !== "" ? <p>IN side {mainRole}</p> : <p>rrwerwerw</p>}
//            <a
//                className="App-link"
//                href="https://reactjs.org"
//                target="_blank"
//                rel="noopener noreferrer"
//            >
//                Learn React
//            </a>
//        </header>
//    </div>
    );
}

export default App;
