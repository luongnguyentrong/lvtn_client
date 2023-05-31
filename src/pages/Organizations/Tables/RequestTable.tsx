import React, { useEffect, useState } from 'react';
import { Badge, Button, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Loading from '../../Loading';
import { getBearerHeader } from '../../../utils';
import axios from 'axios';
import API from '../../../api';
import UnitRequest from '../../Admin/Modals/UnitRequest';


interface IProps {
    admin?: boolean
}

interface IBody {
    description: string
    display_name: string
    manager: {
        email: string
        fname: string
        lname: string
        password: string
        username: string
    },
    name: string
    parent_unit: string
}

interface IRequest {
    id: 1,
    created_by: string
    status: string
    request_type: string
    body: IBody,
    creator: {
        email: string
        first_name: string
        id: string
        last_name: string
        username: string
    }
}

export default function (props: IProps) {
    const [requests, setRequests] = useState<Array<IRequest>>([])

    const [open, setOpen] = useState(false)
    const [body, setBody] = useState<IBody>()

    const close = () => {
        setOpen(false)
    }

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Requests.List, config)
        }).then(res => {
            setRequests(res.data)
        })
    }, [])

    const columns: ColumnsType<IRequest> = [
        {
            title: 'Mã yêu cầu',
            dataIndex: 'id',
            key: 'id',
            render: (value) => <Typography.Text mark>#{value}</Typography.Text>
        },
        {
            title: 'Loại yêu cầu',
            render: (_, record) => {
                return "Yêu cầu cấp đơn vị"
            }
        },
        {
            title: 'Nội dung',
            dataIndex: 'body',
            key: "body",
            render: (value, record) => {
                return <Button onClick={() => {
                    setOpen(true)
                    setBody(record.body)
                }}>Xem thông tin</Button>
            }
        },
        {
            title: 'Người tạo',
            key: 'creator',
            render(_, record, index) {
                return record.creator.first_name + " " + record.creator.last_name
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: "status",
            key: 'status',
            render: (value) => {
                if (value === "init")
                    return <Badge status='processing' text='Đang đợi...' />
            }
        },
    ];

    if (props.admin) {
        columns.push(
            {
                title: 'Hành động',
                key: 'action',
                width: 150,
                render: (_, record) => (
                    <Space size="middle">
                        <a>Invite </a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        )
    }

    return requests.length === 0 ? <Loading /> : <>
        <Table rowKey={'id'} columns={columns} dataSource={requests} />

        <UnitRequest unit={body} open={open} close={close} />
    </>
}