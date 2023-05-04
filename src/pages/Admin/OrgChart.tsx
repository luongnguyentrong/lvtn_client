import { useEffect, useState } from "react";
import { OrganizationGraph, OrgItem, NodeData, Edge } from '@ant-design/graphs';
import axios from "axios";
import { getBearerHeader } from "../../utils";
import API from "../../api";
import { Spin } from "antd";

function convertToNode(data: any) {
    const children = data.children ? data.children.map((data: any) => convertToNode(data)) : undefined;

    const node: NodeData<OrgItem> = {
        id: data.realm_id,
        children: children,
        value: {
            title: data.display_name,
            name: data.name
        }
    }

    return node
}

export default function () {
    const [org, setOrg] = useState<NodeData<OrgItem>>()

    useEffect(() => {
        const config = getBearerHeader()
        if (config) {
            axios.get(API.ListOrg.URL, config).then(res => {
                setOrg(convertToNode(res.data))
            })
        }
    }, [])

    if (org === undefined) {
        return <div style={{
            paddingTop: "20px",
            minHeight: '200px',
            textAlign: 'center'
        }}>
            <Spin />
        </div>
    }

    return <OrganizationGraph nodeCfg={{
        size: [120, 40],
        style: {
            radius: 3,
            stroke: '#91d5ff',
            fill: "white",
        },
        label: {
        }
    }} behaviors={[]} height={400} autoFit={false} data={org} onReady={(graph) => {
        graph.on('node:click', (evt) => {
            const item = evt.item;

            console.log(item)
        });
    }} />;

}