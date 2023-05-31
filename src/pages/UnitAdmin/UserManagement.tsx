import { Button, Card, Col, Divider, Row, Skeleton, Space, Tag, Typography } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import AddUserModal from "./Modals/AddUserModal";


export interface IUser {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    role: string
}


export default function () {
    const [users, setUsers] = useState<Array<IUser>>([])
    const [edited, setEdited] = useState<IUser>()

    const columns: ColumnsType<IUser> = [
        {
            title: 'Họ',
            dataIndex: 'firstName',
            key: "fname"
        },
        {
            title: 'Tên',
            dataIndex: 'lastName',
            key: "lname"
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: "username"
        },
        {
            title: "Quyền truy cập",
            dataIndex: "block_ids",
            render: (value) => {
                if (value && value.length > 0)
                    return value.map((id: string) => <Tag>{id}</Tag>)
            }
        },
        {
            title: 'Vai trò',
            key: "role",
            render: (_, record) => {
                if (record.role === "unit_admin")
                    return "Người quản lý đơn vị"

                return "Người dùng đơn vị"
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (value) => <Typography.Text copyable>{value}</Typography.Text>
        },
        {
            title: 'Hành động',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <a>Chỉnh sửa</a>
                    <a onClick={() => {
                        getBearerHeader().then(config => {
                            return axios.delete(API.Users.ID(record.id), config)
                        }).then(res => {
                            if (res.status === 200) {
                                const new_users = users.filter(user => user.id != record.id)

                                setUsers(new_users)
                            }
                        })
                    }}>Xóa</a>
                </Space>
            ),
        },
    ];


    const fetch_users = () => {
        getBearerHeader().then(config => {
            return axios.get(API.Users.List, config)
        }).then(res => {
            const raw = res.data

            let new_users: any = []
            if (raw.unit_admin) {
                new_users = new_users.concat(raw.unit_admin.map((user: any) => {
                    return {
                        ...user,
                        role: "unit_admin"
                    }
                }))
            }

            if (raw.normal) {
                new_users = new_users.concat(raw.normal.map((user: any) => {
                    return {
                        ...user,
                        role: "unit_normal"
                    }
                }))
            }

            setUsers(new_users)
        })
    }

    useEffect(() => {
        fetch_users()
    }, [])

    const [open, setOpen] = useState(false);


    const showModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    if (users === undefined || users.length === 0)
        return <Card
            style={{
                minHeight: 650,
                margin: '20px 24px 0px 24px',
            }}>
            <Skeleton />
        </Card >

    return (
        <>
            <Card
                title="Danh sách người dùng"
                style={{
                    minHeight: 650,
                    margin: '20px 24px 0px 24px',
                }}
                extra={<Button type="primary"
                    onClick={showModal}
                    icon={<PlusOutlined />}
                >Tạo người dùng</Button>}>

                <Table columns={columns} rowKey={"id"} dataSource={users} scroll={{ x: 1500, y: 400 }} bordered />
            </Card >

            {/* <EditUserModal /> */}
            <AddUserModal fetch_user={fetch_users} open={open} close={closeModal} />
        </>
    )
}