import { Button, Card, Col, Row, Skeleton, Space, Typography } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Form, Input, Table, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import Units from "../Admin/Units";

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

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const showModal = () => {
        setOpen(true);
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

            <Modal
                open={open}
                title="Tạo người dùng"
                onCancel={handleCancel}
                footer={[
                    <Button key="Hủy" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Tạo
                    </Button>,
                ]}
            >
                <Form
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={14}>
                            <Form.Item name="fname" label="Họ" rules={[{ required: true, type: "string", max: 20, message: "Hãy nhập họ!" }]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={10}>
                            <Form.Item name="lname" label="Tên" rules={[{ required: true, type: "string", max: 20 }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Xác nhận mật khẩu"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Hãy xác nhận lại mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('Mật khẩu không giống nhau!'))
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}