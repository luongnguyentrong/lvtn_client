const API = {
    baseURL: import.meta.env.DEV ? "http://localhost:5000" : "https://api.ducluong.monster",
    CreateUnits: {
        URL: "/units"
    },
    ListUnits: {
        API: "/units"
    },
    ListOrg: {
        API: "/units/org"
    }
}

export default API