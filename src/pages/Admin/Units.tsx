import { Card, Layout, Typography } from "antd"
import { OrganizationGraph, OrgItem, NodeData } from '@ant-design/graphs';
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api";
import { getBearerHeader } from "../../utils";

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



const UnitOrgChart = () => {
    const [org, setOrg] = useState<NodeData<OrgItem>>()

    const fakeData = {
        id: 'root',
        value: {
            name: 'master',
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
        setOrg(fakeData)
        const config = getBearerHeader()
        if (config) {
            // axios.get(API.baseURL + API.ListOrg.API, config).then(res => {
            //     setOrg(convertToNode(res.data))
            // })
        }
    }, [])

    if (org === undefined) {
        return <p>Loading...</p>
    }

    return <OrganizationGraph data={org} onReady={(graph) => {
        graph.on('node:click', (evt) => {
            const item = evt.item;
            
            console.log(item)
        });
    }} />;
};


export default function () {
    return <Layout.Content>
        <Card bordered={false}>
            <Typography.Title level={3}>Sơ đồ tổ chức</Typography.Title>

            <UnitOrgChart />
        </Card>
    </Layout.Content>
}