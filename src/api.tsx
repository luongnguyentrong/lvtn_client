
const BaseURL = import.meta.env.DEV ? "http://localhost:5000" : "https://api.ducluong.monster"

const API = {
    CreateUnits: {
        URL: BaseURL + "/units/"
    },
    CreateUsers: {
        URL: BaseURL + "/users/"
    },
    ListUnits: {
        URL: BaseURL + "/units/"
    },
    ListOrg: {
        URL: BaseURL + "/units/org"
    },
    Dashboards: {
        List: BaseURL + "/superset/",
        Create: BaseURL + "/superset/",
    },
}

export default API