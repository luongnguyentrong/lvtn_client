import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Units from "./pages/Admin/Units";

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
    }
])