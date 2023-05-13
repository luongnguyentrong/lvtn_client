import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import NewBlock from "./pages/UnitAdmin/NewBlock";
import Home from "./pages/Admin/Menu/Home";
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
import AnalyzeCard from "./pages/UnitNormal/Cards/AnalyzeCard";
import DisplayAnalytics from "./pages/Blocks/DisplayAnalytics";

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
        path: "/unit_admin",
        element: <UnitAdminLayout />,
        children: [
            {
                index: true,
                element: <UnitAdmin name="something" />
            },
            {
                path: "blocks/new",
                element: <NewBlock />
            },
            {
                path: "blocks/:block_name",
                element: <BlockLayout />,
                children: [
                    {
                        index: true,
                        element: <Default />
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
                        path: "analytics",
                        element: <DisplayAnalytics />
                    }
                ]
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