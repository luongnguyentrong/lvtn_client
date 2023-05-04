import { useEffect, useState } from "react";
import { OrganizationGraph, OrgItem, NodeData } from '@ant-design/graphs';
import axios from "axios";
import { getBearerHeader } from "../../utils";
import API from "../../api";

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

    const fakeData = {
        id: 'root',
        value: {
            name: 'Đại học Bách Khoa',
        },
        children: [
            {
                id: 'joel',
                value: {
                    name: 'Joel Alan',
                },
                children: [
                    {
                        id: 'c1',
                        value: {
                            name: 'c1',
                        },
                    },
                    {
                        id: 'c2',
                        value: {
                            name: 'c2',
                        },
                    },
                    {
                        id: 'c3',
                        value: {
                            name: 'c3',
                        },
                    },
                ],
            },
        ],
    };

    useEffect(() => {
        const config = getBearerHeader()
        if (config) {
            axios.get(API.ListOrg.URL, config).then(res => {
                setOrg(convertToNode(res.data))
            })
        }
    }, [])

    if (org === undefined) {
        return <p>Loading...</p>
    }

    return <OrganizationGraph nodeCfg={{
        size: [120, 40],
        style: {
            stroke: '#91d5ff',
        },
    }} behaviors={[]} height={400} autoFit={false} data={org} onReady={(graph) => {
        graph.on('node:click', (evt) => {
            const item = evt.item;

            console.log(item)
        });
    }} />;

}