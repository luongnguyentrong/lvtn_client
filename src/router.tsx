import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import BlockLayout from './layout/Block';
import NewBlock from "./pages/Admin/NewBlock";
import Home from "./pages/Admin/Menu/Home";
// import BlockNormal from "./pages/UnitNormal/BlockNormal";

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
])