import { Card, Layout, Typography } from "antd"
import { OrganizationGraph } from '@ant-design/graphs';

const DemoOrganizationGraph = () => {
    const data = {
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
                        children: [
                            {
                                id: 'c1-1',
                                value: {
                                    name: 'c1-1',
                                },
                            },
                            {
                                id: 'c1-2',
                                value: {
                                    name: 'c1-2',
                                },
                                children: [
                                    {
                                        id: 'c1-2-1',
                                        value: {
                                            name: 'c1-2-1',
                                        },
                                    },
                                    {
                                        id: 'c1-2-2',
                                        value: {
                                            name: 'c1-2-2',
                                        },
                                    },
                                ],
                            },
                        ],
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
                        children: [
                            {
                                id: 'c3-1',
                                value: {
                                    name: 'c3-1',
                                },
                            },
                            {
                                id: 'c3-2',
                                value: {
                                    name: 'c3-2',
                                },
                                children: [
                                    {
                                        id: 'c3-2-1',
                                        value: {
                                            name: 'c3-2-1',
                                        },
                                    },
                                    {
                                        id: 'c3-2-2',
                                        value: {
                                            name: 'c3-2-2',
                                        },
                                    },
                                    {
                                        id: 'c3-2-3',
                                        value: {
                                            name: 'c3-2-3',
                                        },
                                    },
                                ],
                            },
                            {
                                id: 'c3-3',
                                value: {
                                    name: 'c3-3',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };

    return <OrganizationGraph nodeCfg={{
        style: () => ({
            fill: '#91d5ff',
            stroke: '#91d5ff',
        }),
    }} data={data} behaviors={['drag-canvas', 'drag-node']} />;
};


export default function () {
    return <Layout.Content>
        <Card bordered={false}>
            <Typography.Title level={3}>Danh sách đơn vị</Typography.Title>

            <DemoOrganizationGraph />
        </Card>
    </Layout.Content>
}