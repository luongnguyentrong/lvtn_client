export const BASE_URL = "ducluong.monster"

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
            List: (block_name: string) => BaseURL + "/blocks/" + block_name + "/tables/",
            GET: (block_id: string, table_id: string) => BaseURL + "/blocks/" + block_id + "/tables/" + table_id,
            Upsert: (block_id: string, table_id: string) => BaseURL + "/blocks/" + block_id + "/tables/" + table_id + "/data",
            UploadFromExcel: (block_id?: string, table_id?: string) => BaseURL + "/blocks/" + block_id + "/tables/" + table_id + "/upload",
            Columns: {
                List: (block_id: string, table_id: number) => BaseURL + "/blocks/" + block_id + "/tables/" + table_id + "/columns",
            }
        },
        References: {
            List: (block_id: string) => BaseURL + "/blocks/" + block_id + "/refs/",
            Create: (block_id: string) => BaseURL + "/blocks/" + block_id + "/refs/",
        }
    },
    Users: {
        List: BaseURL + "/users/"
    },
    Keycloak: {
        Token: (cur_unit: string) => `https://sso.ducluong.monster/realms/${cur_unit}/protocol/openid-connect/token`
    }
}

export default API