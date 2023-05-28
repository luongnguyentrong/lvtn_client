import { Layout } from "antd"
import React from "react";
import Home from "./Home";
import Units from "./Units";

export default function () {
    function getContent(path: string) {
        if (path === "/") 
            return <Home />
        
        else if (path === "/units")
            return <Units />

        return <p>Empty</p>
    }

    return (
        <Layout>
            {getContent(window.location.pathname)}
        </Layout>
    )
}