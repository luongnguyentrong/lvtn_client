import { Button, Card, Layout, Space } from "antd"
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { OrganizationGraph } from '@ant-design/graphs';
import { useNavigate } from "react-router-dom";
import AddUnitRequest from "./Modals/AddUnitRequest";
import { useState } from "react";

interface IBlock {
    id: number
    name: string
    display_name: string
    description: string | null
    schema_size?: string
}

interface IManager {
    id: string
    email: string
    first_name: string
    last_name: string
}

export const DemoOrganizationGraph = () => {
    const navigate = useNavigate()

    const data = {
        id: 'root',
        value: {
            name: 'Đại học Bách Khoa',
        },
        children: [
            {
                id: 'pck',
                value: {
                    name: 'Phòng của Khoa',
                },
            },
        ],
    };

    return <OrganizationGraph style={{
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

    const closeAdd = () => {
        setOpen(false)
    }

    return <Layout.Content
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
            <Space style={{ justifyContent: "center", width: "100%" }}>
                <Card
                    style={{
                        width: 1000,
                        border: "3px #F9F5F6 dashed",
                        textAlign: "center"
                    }}
                >
                    <DemoOrganizationGraph />
                </Card>
            </Space>
        </Card>

        <AddUnitRequest open={open} close={closeAdd} />
    </Layout.Content>

}