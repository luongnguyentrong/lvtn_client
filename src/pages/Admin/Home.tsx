import { Avatar, TabsProps, Badge, Button, Card, Descriptions, Empty, Layout, Modal, Space, Tag, Typography, theme, Tabs } from "antd"
import { PlusOutlined, TableOutlined, PullRequestOutlined, UserOutlined, ClusterOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BlockInfo from "./Modals/BlockInfo";
import { useForm } from "antd/es/form/Form";
import { DemoOrganizationGraph } from "../Organizations/Default";
import AdminDescriptions from "./AdminDescriptions";
import Requests from './Requests'

export default function () {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalForm] = useForm()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        modalForm.validateFields().then(data => {
            data['items'] = []

            setIsModalOpen(false)
            navigate("/new", {
                state: {
                    block: data
                }
            })
        })
    };

    const items: TabsProps['items'] = [
        {
            key: 'organizations',
            label: <Space><ClusterOutlined /> Sơ đồ tổ chức</Space>,
            children: <Card extra={
                <Space>
                    <Button icon={<PlusOutlined />} onClick={() => { }}>Tạo đơn vị</Button>
                </Space>
            }>
                <DemoOrganizationGraph />
            </Card>
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
        },
        {
            key: 'overall',
            label: <Space><TableOutlined />Tổng quát</Space>,
            children: `Content of Tab Pane 3`,
        }
    ];


    const handleCancel = () => {
        setIsModalOpen(false);
    };

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

            <BlockInfo isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalForm={modalForm} />
        </Layout>
    )
}