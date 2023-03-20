import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/oauth2/token",
        element: <SSOCallback />
    }
])