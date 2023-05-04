
const BaseURL = import.meta.env.DEV ? "http://localhost:5000" : "https://api.ducluong.monster"

const API = {
    CreateUnits: {
        URL: BaseURL + "/units"
    },
    ListUnits: {
        API: "/units"
    },
    ListOrg: {
        URL: BaseURL + "/units/org"
    }
}

export default API