import { Button, Card, Empty, Form, Space, Table, TableProps } from "antd";
import { TableOutlined, FolderAddOutlined } from '@ant-design/icons';
import { useState } from "react";
import uniqid from 'uniqid';


import { ITable, IFolder } from '../NewBlock'
import DefineSheet from "../Modals/DefineSheet";
import { TableColumnsType } from 'antd'


interface IProps {
    onDefineSuccess: (data: any) => void
    items: Array<IFolder | ITable>
}

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
                children: [
                    {
                        text: 'Yellow',
                        value: 'Yellow',
                    },
                    {
                        text: 'Pink',
                        value: 'Pink',
                    },
                ],
            },
            {
                text: 'Category 2',
                value: 'Category 2',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value: string, record) => record.name.includes(value),
        width: '30%',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value: string, record: DataType) => record.address.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

function DisplayItems(props: { items: Array<IFolder | ITable> }) {
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return <Table columns={columns} dataSource={data} onChange={onChange} />;
}

export default function (props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((res: ITable | IFolder | undefined) => {
            if (res && res.type === "table") {
                if (res.id === undefined) {
                    res.id = uniqid()
                }
            }

            props.onDefineSuccess(res)
            setIsModalOpen(false);
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return <div style={{ padding: "16px" }}>
        <Card extra={
            <Space>
                <Button type="primary" icon={<TableOutlined />} onClick={showModal}>
                    Tạo bảng dữ liệu
                </Button>
                <Button icon={<FolderAddOutlined />}>
                    Tạo Folder chứa file
                </Button>
            </Space>}>

            {props.items.length === 0 ? <Empty /> : <DisplayItems items={props.items} />}

        </Card>

        <DefineSheet form={form} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
    </div >
}