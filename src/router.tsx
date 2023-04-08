import { createBrowserRouter } from "react-router-dom"
import React from 'react';
import App from "./App";
import SSOCallback from "./components/SSOCallback"
import Block from './pages/UnitAdmin/Block';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
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