import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Loading from '../../Loading';
import { getBearerHeader } from '../../../utils';
import axios from 'axios';
import API from '../../../api';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<IUnit> = [
    {
        title: 'Tên đơn vị',
        dataIndex: 'display_name',
        key: 'name',
    },
    {
        title: 'Mã đơn vị',
        dataIndex: 'name',
        render: (value) => {
            return <Tag>{value}</Tag>
        }
    },
    {
        title: 'Đường dẫn',
        dataIndex: 'url',
        key: "url",
        render: (value) => {
            return <Typography.Link href={value} target='_blank' copyable>{value}</Typography.Link>
        }
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'desc',
    },
    {
        title: 'Người quản lý',
        key: 'manager',
        render(_, record, index) {
            return record.manager.first_name + " " + record.manager.last_name 
        },
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

interface IProps {
    admin?: boolean
}

export interface IUnit {
    id: string
    manager_id: string
    display_name: string
    name: string
    description: string
    url: string
    parent_name: string
    superset_status: string
    manager: {
        email: string
        federation_link: string
        first_name: string
        id: string
        last_name: string
        username: string
    }
}

export default function (props: IProps) {
    const [units, setUnits] = useState<Array<IUnit>>([])

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.ListUnits.URL, config)
        }).then(res => {
            setUnits(res.data)
        })
    }, [])

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

    return units.length === 0 ? <Loading /> : <Table columns={columns} dataSource={units} />
}