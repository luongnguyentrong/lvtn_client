export function getUnit(): string {
    if (process.env.NODE_ENV === "development") {
        return "master"
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