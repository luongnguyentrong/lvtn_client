import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { getBearerHeader, getUnit } from "./utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

interface IProps {
    children: JSX.Element
    role?: string
}

export default function (props: IProps) {
    const navigate = useNavigate()

    useEffect(() => {
        getBearerHeader().then(config => {
            if (props.role) {
                const userinfo_endpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/userinfo`

                axios.post(userinfo_endpoint, {}, config).then((res) => {
                    if (res.status === 200) {
                        if (res.data.roles && Array.isArray(res.data.roles)) {
                            const roles: string[] = res.data.roles

                            if (props.role) {
                                if (!roles.includes(props.role))
                                    navigate("/", { replace: true })
                            }
                        }
                    }
                })

            }
        })
    }, [])

    return props.children
}