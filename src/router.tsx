import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import BlockLayout from './layout/Block';
// import BlockNormal from "./pages/UnitNormal/BlockNormal";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/units",
                element: <Units />,
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