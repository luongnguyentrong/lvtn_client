import { Button, Card, Empty, Form, Space, Table, TableProps } from "antd";
import { TableOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from "react";
import uniqid from 'uniqid';


import { ITable, IFolder } from '../NewBlock'
import DefineSheet from "../Modals/DefineSheet";
import { TableColumnsType } from 'antd'
import DefineFolder from "../Modals/DefineFolder";


interface IProps {
    onDefineSuccess: (data: any) => void
    items: Array<IFolder | ITable>
}

const columns: TableColumnsType<IFolder | ITable> = [
    {
        title: 'Tên dữ liệu',
        dataIndex: 'name',
        key: "id",
        render: (_, record) => {
            if (record.type === "table")
                return <div><TableOutlined /> {record.display_name}</div>
            else
                return <div><FolderAddOutlined /> {record.display_name}</div>
        }
    },
    {
        title: 'Hành động',
        dataIndex: 'action',
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <Button icon={<EditOutlined />} />
                <Button icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];


function DisplayItems(props: { items: Array<IFolder | ITable> }) {
    return <Table columns={columns} rowKey={(record) => record.id} dataSource={props.items} />;
}

export default function (props: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
    const [form] = Form.useForm();
    const [folderForm] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showFolderModal = () => {
        setIsModalFolderOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((res: any) => {
            if (res && res.hasOwnProperty("table")) {
                const table: ITable = res.table

                if (table.id === undefined) {
                    table.id = uniqid()
                }

                table.type = "table"

                props.onDefineSuccess(table)
            }

            setIsModalOpen(false);
        }).catch(err => {

        })
    };

    const handleFolderOk = () => {
        folderForm.validateFields().then((res: IFolder) => {
            res.type = "folder"
            res.id = uniqid()

            props.onDefineSuccess(res)
            setIsModalFolderOpen(false);
        })
    };

    const handleFolderCancel = () => {
        setIsModalFolderOpen(false);
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
                <Button icon={<FolderAddOutlined />} onClick={showFolderModal}>
                    Tạo Folder chứa file
                </Button>
            </Space>}>

            {props.items.length === 0 ? <Empty /> : <DisplayItems items={props.items} />}

        </Card>

        <DefineSheet form={form} isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
        <DefineFolder form={folderForm} isOpen={isModalFolderOpen} handleOk={handleFolderOk} handleCancel={handleFolderCancel} />
    </div >
}