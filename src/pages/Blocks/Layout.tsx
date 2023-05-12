import React, { useEffect, useState } from 'react';
import { LaptopOutlined, FolderOutlined, BarsOutlined, NotificationOutlined, UserOutlined, TableOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import API from '../../api';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getBearerHeader } from '../../utils';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

const App: React.FC = () => {
    const { block_name } = useParams()
    const [tables, setTables] = useState<MenuProps['items']>([])
    const navigate = useNavigate()

    useEffect(() => {
        if (block_name) {
            axios.get(API.Blocks.Tables.List(block_name), getBearerHeader()).then(res => {
                const items = res.data.map((table: any) => ({
                    key: table.ID,
                    label: table.display_name,
                    icon: <TableOutlined />
                }))

                setTables(items)
            })
        }

    }, [])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menuItems: MenuProps['items'] = [
        {
            key: "tables",
            label: "Dữ liệu dạng bảng",
            icon: <TableOutlined />,
            children: tables
        },
        {
            key: "folders",
            label: "Danh sách folders",
            icon: <FolderOutlined />
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
        <Layout>
            <Sider width={250} style={{ background: colorBgContainer }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['tables']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems}
                />
            </Sider>

            <Outlet />

        </Layout>
    );
};

export default App;