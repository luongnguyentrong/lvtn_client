import axios from "axios"
import Cookies from "universal-cookie"
import API from "./api"
import { Navigate } from "react-router-dom"

export function getUnit(): string {
    if (process.env.NODE_ENV === "development") {
        return "master"
    }

    const arr = window.location.hostname.split(".")

    if (arr.length <= 2) {
        return "master"
    }

    if (arr.length === 3) {
        return arr[0]
    }

    return ""
}

export interface IUser {
    sub: string
    roles: Array<string>
    preferred_username: string
    given_name: string
    family_name: string
}

export async function getCurrentUser(): Promise<IUser | undefined> {
    const cookies = new Cookies()
    const userinfo_endpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/userinfo`

    if (cookies.get("access_token")) {
        const config = await getBearerHeader()
        const result = await axios.post(userinfo_endpoint, {}, config)

        if (result.status === 200) {
            return result.data
        }
    }
}

export function toSlug(str: string) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str
        .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
        .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

    // Thay ký tự đĐ
    str = str.replace(/[đĐ]/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa ký tự - liên tiếp
    str = str.replace(/-+/g, '-');

    // xóa phần dư - ở đầu & cuối
    str = str.replace(/^-+|-+$/g, '');

    let matches = str.match(/\b(\w)/g);
    if (matches) {
        return matches.join(''); // JSON
    }

    return "";
}

export async function getBearerHeader() {
    const cookies = new Cookies()
    let current_access_token = cookies.get("access_token")

    if (!current_access_token) {
        const current_refresh_token = cookies.get("refresh_token")

        if (current_refresh_token) {
            const data = new URLSearchParams();
            data.append('grant_type', 'refresh_token');
            data.append('client_id', 'console');
            data.append('refresh_token', current_refresh_token);

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            const response = await axios.post(API.Keycloak.Token(getUnit()), data, config)

            const cookies = new Cookies()
            const { access_token, expires_in, id_token, refresh_expires_in, refresh_token } = response.data;

            cookies.set("access_token", access_token, {
                path: "/",
                maxAge: expires_in,
            })

            cookies.set("id_token", id_token, {
                path: "/"
            })
            cookies.set("refresh_token", refresh_token, {
                path: "/",
                maxAge: refresh_expires_in
            })

            current_access_token = access_token
        } else {
            Navigate({ to: "/" })
        }
    }

    if (current_access_token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${current_access_token}`,
            },
        };

        return config
    }
}


export function getAPIHost(): string {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:5000"
    }

    return "https://api.ducluong.monster"
}
