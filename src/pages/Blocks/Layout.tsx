import React, { useEffect, useState } from 'react';
import { PartitionOutlined, FolderAddOutlined, FileAddOutlined, FolderOutlined, BarsOutlined, PlusOutlined, TableOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import API from '../../api';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getBearerHeader } from '../../utils';
import Header from '../../Header';
import DisplayTable from './DisplayTable';
import { table } from 'console';
import AddFolderModal from '../../modals/AddFolderModal';

const { Sider } = Layout;

export interface ITable {
    id: number
    name: string
    description: string | null
    display_name: string
}

export default function () {
    const { block_id } = useParams()
    const [tables, setTables] = useState<Array<ITable>>([])
    const navigate = useNavigate()
    const [folders, setFolders] = useState<Array<string>>([])
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const addFolder = (name: string) => {
        // if (block_id) {
        //     console.log(API.Folders.Add(block_id) + "/"+encodeURIComponent(name))
        // }
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Folders.Add(block_id) + "/" + encodeURIComponent(name), config)
            }).then(res => {
                const { response } = res.data
                console.log(response)
            })
        }
        folders.push(name)
    }

    useEffect(() => {
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Folders.List(block_id) + "", config)
            }).then(res => {
                const { folders } = res.data

                if (folders && folders.length > 0) {
                    const new_folders = folders.map((folder: any) => {
                        return folder.Prefix
                    })

                    setFolders(new_folders)
                }
            })
        }
    }, [])

    useEffect(() => {
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.List(block_id), config)
            }).then(res => {
                if (res.data && res.data.length > 0)
                    setTables(res.data)
            })
        }

    }, [])

    const {
        token: { colorBgContainer }, } = theme.useToken();

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
            label: "Tạo thư mục mới",
            icon: <FolderAddOutlined />,
            onClick: () =>{
                openModal()
            }
        },
    ];

    const menuItems: MenuProps['items'] = [
        {
            key: "tables",
            label: "Danh sách dữ liệu",
            icon: <TableOutlined />,
            children: tables.map(table => {
                return {
                    key: table.id,
                    label: table.display_name,
                    icon: <TableOutlined />,
                    onClick: () => {
                        navigate("tables/" + table.id)
                    }
                }
            })
        },
        {
            key: "folders",
            label: "Danh sách folders",
            icon: <FolderOutlined />,
            children: folders.map(folder => {
                const folder_name = folder.split("/").filter(Boolean).pop()

                return {
                    key: folder,
                    label: folder_name,
                    icon: < FolderOutlined />,
                    onClick: () => {
                        navigate("folders/" + folder_name)
                    }
                }
            })
        },
        {
            key: "relationships",
            label: "Liên kết",
            icon: <PartitionOutlined />,
            onClick: () => {
                navigate("relationships")
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

    const searchOptions = [
        {
            label: "Bảng dữ liệu",
            options: tables.map(table => ({
                value: table.id,
                label: <Space><TableOutlined />{table.display_name}</Space>
            }))
        },
        {
            label: "Thư mục",
            options: folders.map(folder => ({
                value: folder,
                label: <Space><FolderOutlined />{folder.split("/").filter(Boolean).pop()}</Space>
            }))
        }
    ]

    return (
        <Layout style={{ minHeight: "100%" }}>
            <Header searchOptions={searchOptions} />
            <Layout>
                <Sider width={250} style={{ background: colorBgContainer, paddingTop: 24 }}>
                    <Dropdown menu={{ items }} trigger={['click']} >
                        <Button style={{ marginLeft: 28, marginBottom: 12 }} type='primary' icon={<PlusOutlined />}>Mới</Button>
                    </Dropdown>

                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['tables']}
                        items={menuItems}
                    />
                </Sider>

                <Layout>
                    <Outlet context={{ folders, tables }} />
                    <Layout.Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Layout.Footer>
                </Layout>
            </Layout>
            <AddFolderModal open={open} close={closeModal} addFolder={addFolder}/>
        </Layout>
    );
};