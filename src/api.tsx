
export const BaseURL = import.meta.env.DEV ? "http://localhost:5000" : "https://api.ducluong.monster"

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
    }
}

export default API