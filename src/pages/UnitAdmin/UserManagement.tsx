import { Button, Card, Col, Divider, Row, Skeleton, Space, Typography } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import AddUserModal from "./Modals/AddUserModal";
import AddUnit from "../Admin/Modals/AddUnit";

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
        render: (_, record) => (
            <Space size="middle">
                <a>Chỉnh sửa</a>
                <a>Khóa</a>
                <a>Xóa</a>
            </Space>
        ),
    },
];

interface IUser {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    role: string
}


export default function () {
    const [users, setUsers] = useState<Array<IUser>>([])

    useEffect(() => {
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

                <Table columns={columns} rowKey={"id"} dataSource={users} bordered />
            </Card >

            <AddUserModal open={open} close={closeModal} />
        </>
    )
}