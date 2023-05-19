
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
        List: "http://localhost:5000" + "/superset/",
        Create: "http://localhost:5000" + "/superset/",
    },
    Folders: {
        Show: BaseURL + "/show_folders_normal?user="
    },
    Blocks: {
        List: BaseURL + "/blocks/",
        Create: BaseURL + "/blocks/",
        Tables: {
            Create: (block_name: string) => BaseURL + "/blocks/" + block_name + "/tables/",
            List: (block_name: string) => BaseURL + "/blocks/" + block_name + "/tables/"
        }
    },
    Users: {
        List: BaseURL + "/users/"
    }
}

export default API