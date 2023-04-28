import Cookies from "universal-cookie"

export function getUnit(): string {
    if (process.env.NODE_ENV === "development") {
        return "hcmut"
    }

    const arr = window.location.hostname.split(".")

    if (arr.length === 2) {
        return "master"
    }

    if (arr.length === 3) {
        return arr[0]
    }

    return ""
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
