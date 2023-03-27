import { Card, Layout, Menu, Input, Space, Typography, Button, Row, Col, Table } from "antd"
import type { MenuProps } from 'antd';
import { LineChartOutlined, ApartmentOutlined, TeamOutlined, PlusOutlined, DeleteColumnOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const navs = [
    {
        label: "Dashboard",
        icon: LineChartOutlined,
    },
    {
        label: "Đơn vị",
        icon: ApartmentOutlined,
    },
    {
        label: "Quản lý người dùng",
        icon: TeamOutlined,
    }
]

const columns = [
    {
        title: "Thứ tự",
        dataIndex: "order",
        key: "order"
    },
    {
        title: "Tên đơn vị",
        dataIndex: "unit_name",
        key: "unit_name"
    },
    {
        title: "Hành động",
        dataIndex: "action",
        key: "action",
        render: (_: any, record: ITableData) => (
            <Button type="primary" icon={<DeleteColumnOutlined />}>Xóa</Button>
        )
    }
]

const sider_items: MenuProps['items'] = navs.map(
    (obj, index) => {
        return {
            key: `slider_items_${index}`,
            icon: React.createElement(obj.icon),
            label: obj.label,
        };
    },
);

interface ITableData {
    key: number
    order: number
    unit_name: string
}

export default function () {
    const [tableData, setTableData] = useState<Array<ITableData>>([])

    useEffect(() => {
        const cookies = new Cookies()

        const token = cookies.get("access_token")

        if (token) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${cookies}`,
                },
            };

            axios.get("https://sso.ducluong.monster/admin/realms?briefRepresentation=true", config).then(res => {
                if (res.status === 200) {
                    const data: Array<ITableData> = res.data.map((idx: number, realm: any) => ({
                        key: realm.id,
                        order: idx + 1,
                        unit_name: realm.realm
                    }))

                    setTableData(data)
                }
            })
        }
    }, [])

    return (
        <Layout>
            <Layout.Sider theme='light'>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    items={sider_items}
                />
            </Layout.Sider>

            <Layout style={{ margin: '24px 24px 0' }}>
                <Layout.Content style={{ paddingLeft: "10px" }}>
                    <Card bordered={false}>
                        <Row justify={"space-between"} align={"bottom"}>
                            <Col span={4}>
                                <Typography.Title level={3}>Danh sách đơn vị</Typography.Title>
                            </Col>

                            <Col>
                                <Space>
                                    <Input.Search placeholder="Enter unit name" />
                                    <Button type="primary" icon={<PlusOutlined />}>Tạo đơn vị</Button>
                                </Space>
                            </Col>
                        </Row>

                        <Table loading={tableData.length === 0 ? true : false} dataSource={tableData} columns={columns} />
                    </Card>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}