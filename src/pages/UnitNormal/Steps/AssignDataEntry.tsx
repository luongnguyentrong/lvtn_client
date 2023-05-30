import React, { useEffect, useState } from 'react';
import { Select, Space, Table, TableColumnsType } from 'antd';
import { IFolder, ITable } from '../NewBlock';
import { TableOutlined, FolderAddOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd'
import axios from 'axios';
import API from '../../../api';
import { getBearerHeader } from '../../../utils';



interface IProps {
    items: Array<ITable | IFolder>
    addDataEntry: (data_entry: Array<string>, item_id: string) => void
}

export default function (props: IProps) {
    const [options, setOptions] = useState<SelectProps['options']>([])

    useEffect(() => {
        axios.get(API.Users.List, getBearerHeader()).then(res => {
            if (res.data) {
                const unit_admin: SelectProps['options'] = res.data.unit_admin.map((user: any) => ({
                    label: user.firstName + " " + user.lastName,
                    value: user.username,
                }))

                const normal_user: SelectProps['options'] = res.data.normal.map((user: any) => ({
                    label: user.firstName + " " + user.lastName,
                    value: user.username,
                }))

                if (unit_admin && normal_user)
                    setOptions(unit_admin.concat(normal_user))
            }
        })
    }, [])


    const columns: TableColumnsType<ITable | IFolder> = [
        {
            title: 'Tên dữ liệu',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                if (record.type === "table")
                    return <div><TableOutlined /> {record.display_name}</div>
                else
                    return <div><FolderAddOutlined /> {record.display_name}</div>
            }

        },
        {
            title: 'Người nhập',
            key: 'data_entry',
            width: "40%",
            render: (_, record) => (
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Chọn người nhập dữ liệu"
                    defaultValue={record.data_entry}
                    onChange={(values) => {
                        props.addDataEntry(values, record.id)
                    }}
                    options={options}
                />
            )
        },
    ];

    return <Table columns={columns} rowKey={"id"} dataSource={props.items} />
}