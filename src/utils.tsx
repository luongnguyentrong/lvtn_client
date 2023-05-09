import axios from "axios"
import Cookies from "universal-cookie"

export function getUnit(): string {
    if (process.env.NODE_ENV === "development") {
        return "pck"
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

export async function getCurrentUser(): Promise<any> {
    const cookies = new Cookies()
    const userinfo_endpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/userinfo`

    if (cookies.get("access_token")) {
        const access_token = cookies.get("access_token")

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };

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

export function getBearerHeader() {
    const cookies = new Cookies()
    const access_token = cookies.get("access_token")

    if (access_token) {
        const config = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
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
