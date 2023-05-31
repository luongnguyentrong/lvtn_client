import { Button, Card, Layout, Space, Tabs, TabsProps } from "antd"
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { OrganizationGraph } from '@ant-design/graphs';
import { useNavigate } from "react-router-dom";
import AddUnitRequest from "./Modals/AddUnitRequest";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBearerHeader } from "../../utils";
import API from "../../api";
import Loading from "../Loading";
import { OrganizationGraphData } from "@ant-design/graphs/es/components/organization-graph";
import UnitTable from "./Tables/UnitTable";
import RequestTable from "./Tables/RequestTable";
import ProtectedRoute from "../../ProtectedRoute";

interface IBlock {
    id: number
    name: string
    display_name: string
    description: string | null
    schema_size?: string
}

interface org {
    id: string
    created_by: string
    display_name: string
    name: string
    description: string
    url: string
    children: Array<org>
}

function transform(node: org): OrganizationGraphData {
    return {
        id: node.id,
        value: {
            name: node.display_name,
            title: node.name
        },
        children: node.children && node.children.map(childNode => transform(childNode))
    }
}

export const DemoOrganizationGraph = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<OrganizationGraphData>()

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.ListOrg.URL, config)
        }).then(res => {
            let raw_org = res.data as org

            const new_org: OrganizationGraphData = transform(raw_org)

            setData(new_org)
        })
    }, [])

    return data === undefined ? <Loading /> : <OrganizationGraph style={{
        textAlign: "center",
        background: "rgba(249, 245, 246,0.5)",
        borderRadius: 12,
    }}
        width={900}
        behaviors={[]}
        nodeCfg={{
            size: [140, 40],
            style: {
                cursor: "pointer"
            },
            label: {
            }
        }}
        autoFit={false}
        onReady={(graph) => {
            graph.on('node:click', (event) => {
                if (event.item && event.item._cfg) {
                    navigate(`views/${event.item._cfg.id}`)
                }
            })
        }}
        data={data} />;
};

export default function () {
    const [open, setOpen] = useState(false)

    const items: TabsProps['items'] = [
        {
            key: 'diagram',
            label: 'Sơ đồ',
            children:
                <Space style={{ justifyContent: "center", width: "100%" }}>
                    <Card
                        style={{
                            width: 1000,
                            border: "3px #F9F5F6 dashed",
                            textAlign: "center"
                        }}
                    >
                        <DemoOrganizationGraph />
                    </Card></Space>,
        },
        {
            key: 'overall',
            label: "Thông tin tổng quát",
            children: <UnitTable />,
        },
        {
            key: 'requests',
            label: "Yêu cầu",
            children: <RequestTable />,
        },
    ];


    const closeAdd = () => {
        setOpen(false)
    }

    return <ProtectedRoute>
        <Layout.Content
            style={{
                minHeight: 280,
            }}
        >
            <Card title="Sơ đồ tổ chức"
                style={{
                    margin: 24,
                }}
                extra={
                    <Space>
                        <Button icon={<EyeOutlined />} onClick={() => {

                        }}>Yêu cầu truy cập</Button>
                        <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>Yêu cầu cấp đơn vị</Button>
                    </Space>
                }
            >
                <Tabs defaultActiveKey="diagram" items={items} />
            </Card>

            <AddUnitRequest open={open} close={closeAdd} />
        </Layout.Content>
    </ProtectedRoute>
}