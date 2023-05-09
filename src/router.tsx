import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import BlockLayout from './layout/Block';
import NewBlock from "./pages/Admin/NewBlock";
import Home from "./pages/Admin/Menu/Home";
import Block from "./pages/UnitAdmin/Block"
import BlockNormal from "./pages/UnitNormal/BlockNormal";
import UserManager from "./pages/Admin/UserManager";

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
                path: "/new",
                element: <NewBlock />
            },
            {
                path: "/users",
                element: <UserManager />
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