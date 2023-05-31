import { Avatar, TabsProps, Badge, Button, Card, Descriptions, Empty, Layout, Modal, Space, Tag, Typography, theme, Tabs } from "antd"
import { PlusOutlined, TableOutlined, PullRequestOutlined, UserOutlined, ClusterOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BlockInfo from "./Modals/BlockInfo";
import { useForm } from "antd/es/form/Form";
import { DemoOrganizationGraph } from "../Organizations/Default";
import AdminDescriptions from "./AdminDescriptions";
import Requests from './Requests'
import AddUnit from "./Modals/AddUnit";
import UnitTable from "../Organizations/Tables/UnitTable";

export default function () {
    const [openAdd, setOpenAdd] = useState(false);

    const items: TabsProps['items'] = [
        {
            key: 'organizations',
            label: <Space><ClusterOutlined /> Sơ đồ tổ chức</Space>,
            children: <Card extra={
                <Space>
                    <Button icon={<PlusOutlined />} onClick={() => { setOpenAdd(true) }}>Tạo đơn vị</Button>
                </Space>
            }>
                <DemoOrganizationGraph />
            </Card>
        },
        {
            key: 'overall',
            label: <Space><TableOutlined />Tổng quát</Space>,
            children: <UnitTable />,
        },
        {
            key: 'user_management',
            label: <Space><UserOutlined /> Quản lý người dùng</Space>,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: <Space><PullRequestOutlined />Xử lý yêu cầu</Space>,
            children: <Requests />
        }];


    const closeAdd = () => {
        setOpenAdd(false)
    }

    return (
        <Layout>
            <Layout>
                <AdminDescriptions />

                <Layout.Content style={{ margin: "16px" }}>
                    <Card>
                        <Tabs defaultActiveKey="1" items={items} />
                    </Card>
                </Layout.Content>
            </Layout>

            <AddUnit open={openAdd} close={closeAdd} />
        </Layout>
    )
}