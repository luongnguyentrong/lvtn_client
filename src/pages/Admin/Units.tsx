import { Avatar, Button, Card, Layout, Space, Spin, Table, Tabs, Tag, Tooltip, Typography } from "antd"
import { OrganizationGraph, OrgItem, NodeData } from '@ant-design/graphs';
import { useEffect, useState } from "react";
import type { TabsProps, TableColumnsType } from 'antd'
import { getBearerHeader } from "../../utils";
import { ApartmentOutlined, TableOutlined, PlusOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';
import axios from "axios";

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

    return <OrganizationGraph behaviors={[]} height={400} data={org} onReady={(graph) => {
        graph.on('node:click', (evt) => {
            const item = evt.item;

            console.log(item)
        });
    }} />;
};

interface IUnit {
    realm_id: string
    created_by: {
        id: string
        first_name: string
        last_name: string
        username: string
    }
    display_name: string
    name: string
    description: string
    url: string
}

function UnitTable(props: { units: Array<IUnit> }) {
    const columns: TableColumnsType<IUnit> = [
        {
            title: 'Tên đơn vị',
            dataIndex: 'display_name',
            key: 'display_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Mô tả',
            width: 300,
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => {
                return <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                    {description}
                </Typography.Paragraph>
            }
        },
        {
            title: 'Người quản lý',
            dataIndex: 'address',
            key: 'manager',
        },
        {
            title: 'Người tạo',
            dataIndex: ["created_by", "username"],
            key: 'creator',
            render: (username: string) => {
                return <Space>
                    <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/323455858_1672322863162786_3713949282425593143_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Fnevu6BcCe8AX-Zsjzq&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfB7COif51-Wr_9CNhT9ouxWk11r7zf5Eqk3SmIhFLTy3w&oe=64550DA0" />
                    <Typography.Text>{username}</Typography.Text>
                </Space>
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: () => (
                <Space >
                    <Tooltip title="Chỉnh sửa thông tin đơn vị">
                        <Button icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Xoá đơn vị">
                        <Button icon={<DeleteFilled />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const tableData = props.units.map((data, i) => ({
        key: i,
        ...data
    }))

    return <Table columns={columns} dataSource={tableData} />;
}

export default function () {
    const [units, setUnits] = useState<Array<IUnit> | undefined>()
    useEffect(() => {
        axios.get("http://localhost:5000/units", getBearerHeader()).then(res => {
            setUnits(res.data)
        })
    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span>
                <ApartmentOutlined />
                Sơ đồ tổ chức
            </span>,
            children: <UnitOrgChart />,
        },
        {
            key: '2',
            label: <span>
                <TableOutlined />
                Tổng quát
            </span>,
            children:
                units === undefined ?
                    <div style={{
                        paddingTop: "20px",
                        minHeight: '200px',
                        textAlign: 'center'
                    }}>
                        <Spin />
                    </div> : <UnitTable units={units} />
            ,
        },
    ];

    return <Layout.Content>
        <div style={{ margin: 24, minHeight: 380 }}>
            <Card title="Đại học Bách Khoa" extra={<Button type="primary"
                icon={<PlusOutlined />}
            >Tạo đơn vị</Button>}>
                <Tabs defaultActiveKey="1" items={items} />
            </Card>
        </div>
    </Layout.Content >
}