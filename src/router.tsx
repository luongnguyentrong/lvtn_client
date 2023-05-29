import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import NewBlock from "./pages/UnitAdmin/NewBlock";
import Home from "./pages/Admin/Home";
import Block from "./pages/UnitAdmin/Block"
import BlockNormal from "./pages/UnitNormal/BlockNormal";
import UserManager from "./pages/Admin/UserManager";
import UnitAdminLayout from "./pages/UnitAdmin/UnitAdminLayout";
import UnitAdmin from "./pages/UnitAdmin/UnitAdmin";
import BlockLayout from "./pages/Blocks/Layout";
import Default from "./pages/Blocks/Default";
import Criteria from "./pages/Blocks/Criteria";
import DisplayTable from "./pages/Blocks/DisplayTable";
import DisplayFolder from "./pages/Blocks/DisplayFolder";
import DisplayAnalytics from "./pages/Blocks/DisplayAnalytics";
import UserManagement from "./pages/UnitAdmin/UserManagement";
import New from "./pages/Blocks/Tables/NewTable";
import Relationships from "./pages/Blocks/Relationships";
import Organizations from "./pages/Organizations";
import OrganizationsDefault from "./pages/Organizations/Default";
import ViewUnit from "./pages/Organizations/ViewUnit";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/units",
                element: <Units />,
            },
            {
                path: "/users",
                element: <UserManager />
            }
        ]
    },
    {
        path: "/organizations",
        element: <Organizations />,
        children: [
            {
                index: true,
                element: <OrganizationsDefault />,
            },
            {
                path: "views/:unit_name",
                element: <ViewUnit />
            }
        ]
    },
    {
        path: "/users",
        element: <Organizations />,
        children: [
            {
                index: true,
                element: <UserManagement />,
            },
        ]
    },
    {
        path: "/unit_admin",
        element: <UnitAdminLayout />,
        children: [
            {
                index: true,
                element: <UnitAdmin />,
            },
            {
                path: "blocks/new",
                element: <NewBlock />
            },
        ]
    },
    {
        path: "/blocks/:block_id",
        element: <BlockLayout />,
        children: [
            {
                index: true,
                element: <Default />
            },
            {
                path: "new_table",
                element: <New />
            },
            {
                path: "criteria",
                element: <Criteria />
            },
            {
                path: "tables/:table_id",
                element: <DisplayTable />
            },
            {
                path: "folders/:folder_name",
                element: <DisplayFolder />
            },
            {
                path: "relationships",
                element: <Relationships />
            }
        ]
    },
    {
        path: "/oauth2/token",
        element: <SSOCallback />
    },
    {
        path: "/UnitAdmin/block",
        element: <Block />
    },
    {
        path: "/UnitUser/BlockNormal",
        element: <BlockNormal />
    }
])