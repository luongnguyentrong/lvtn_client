import React, { useEffect, useState } from 'react';
import { LineChartOutlined, FolderAddOutlined, FileAddOutlined, FolderOutlined, BarsOutlined, PlusOutlined, TableOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import API from '../../api';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getBearerHeader } from '../../utils';
import Header from '../../Header';
import DisplayTable from './DisplayTable';

const { Sider } = Layout;

export default function () {
    const { block_id } = useParams()
    const [tables, setTables] = useState<MenuProps['items']>([])
    const navigate = useNavigate()
    const [tableName, setTableName] = useState("")

    useEffect(() => {
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.List(block_id), config)
            }).then(res => {
                const items = res.data.map((table: any) => ({
                    key: table.ID,
                    label: table.display_name,
                    icon: <TableOutlined />,
                    onClick: () => {
                        navigate("tables/" + table.id)
                    }

                }))

                setTables(items)
            })
        }

    }, [])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items: MenuProps['items'] = [
        {
            key: 'add_table',
            label: "Tạo bảng mới",
            icon: <FileAddOutlined />,
            onClick: () => {
                navigate("new_table")
            }
        },
        {
            key: 'add_folder',
            label: "Tạo folder mới",
            icon: <FolderAddOutlined />,
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            key: "tables",
            label: "Danh sách dữ liệu",
            icon: <TableOutlined />,
            children: tables
        },
        {
            key: "folders",
            label: "Danh sách folders",
            icon: <FolderOutlined />,
            children: [
                {
                    key: "dsn",
                    label: "Vật lý 1",
                    icon: <FolderOutlined />,
                    onClick: () => {
                        navigate("folders/dsn")
                    }
                }
            ]
        },
        {
            key: "analyze",
            label: "Phân tích",
            icon: <LineChartOutlined />,
            onClick: () => {
                navigate("analytics")
            }
        },
        {
            key: "criteria",
            label: "Tiêu chí",
            icon: <BarsOutlined />,
            onClick: () => {
                navigate("criteria")
            }
        }
    ]


    return (
        <Layout style={{ minHeight: "100%" }}>
            <Header />
            <Layout>
                <Sider width={250} style={{ background: colorBgContainer, paddingTop: 24 }}>
                    <Dropdown menu={{ items }} trigger={['click']} >
                        <Button style={{ marginLeft: 28, marginBottom: 12 }} type='primary' icon={<PlusOutlined />}>Mới</Button>
                    </Dropdown>

                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['tables']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuItems}
                    />
                </Sider>

                <Layout>
                    <Outlet />
                    <Layout.Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Layout.Footer>
                </Layout>
            </Layout>

        </Layout>
    );
};