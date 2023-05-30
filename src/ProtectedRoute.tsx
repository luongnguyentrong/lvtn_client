import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { getUnit } from "./utils";

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
    children: React.ReactNode
}

export default function (props: IProps) {
    useEffect(() => {
        const cookies = new Cookies()
        const access_token = cookies.get("access_token")

        if (!access_token) {
            const authorization_endpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/auth?${getAuthParams()}`

            window.location.href = authorization_endpoint
        }
    }, [])

    return props.children
}