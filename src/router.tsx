import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import BlockLayout from './layout/Block';
import NewBlock from "./pages/UnitAdmin/NewBlock";
import Home from "./pages/Admin/Menu/Home";
import Block from "./pages/UnitAdmin/Block"
import BlockNormal from "./pages/UnitNormal/BlockNormal";
import UserManager from "./pages/Admin/UserManager";
import UnitAdminLayout from "./pages/UnitAdmin/UnitAdminLayout";
import UnitAdmin from "./pages/UnitAdmin/UnitAdmin";
import Details from "./pages/Blocks/Layout";
import Default from "./pages/Blocks/Default";
import Criteria from "./pages/Blocks/Criteria";

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
                element: <Details />,
                children: [
                    {
                        index: true,
                        element: <Default />
                    },
                    {
                        path: "criteria",
                        element: <Criteria />
                    }
                ]
            }
        ]
    },
    {
        path: "/blocks/:id",
        element: <BlockLayout />
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