import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";
import Block from './pages/UnitAdmin/Block';

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
        path: "/oauth2/token",
        element: <SSOCallback />
    },
    {
        path: "/Unitadmin/block",
        element: <Block />
    }
])