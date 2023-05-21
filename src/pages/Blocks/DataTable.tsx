import React, { useState } from 'react';
import { PlusOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Table, TableColumnsType, Typography, message } from 'antd';
import { getBearerHeader, toSlug } from '../../utils';
import axios from 'axios';
import API from '../../api';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export interface Item {
    key: string;
    name: string;
    display_name: string;
    column_type: string;
    is_primary?: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | "select";
    record: Item;
    index: number;
    children: React.ReactNode;
}


const DATE_FORMAT = 'YYYY-MM-DD'

interface IProps {
    data: Array<Item>
    setData: (new_data: Array<Item>) => void
    columns: Array<any>
}

function BuildInput(props: { name: string; column_type: string; old_value: any }) {
    if (props.column_type.includes("int"))
        return <Form.Item
            name={props.name}
            style={{ margin: 0 }}
            initialValue={props.old_value}
        >
            <InputNumber style={{ width: "100%" }} />
        </Form.Item>
    else if (props.column_type.toLowerCase().includes("varchar"))
        return <Form.Item
            name={props.name}
            style={{ margin: 0 }}
            rules={[
                {
                    type: "string",
                    message: `Giá trị không hợp lệ!`,
                },
            ]}
            initialValue={props.old_value}
        >
            <Input />
        </Form.Item>
    else if (props.column_type.includes("double"))
        return <Form.Item
            name={props.name}
            style={{ margin: 0 }}
            rules={[
                {
                    type: "float",
                    message: `Giá trị không hợp lệ!`,
                },
            ]}
            initialValue={props.old_value}
        >
            <Input />
        </Form.Item>
    else if (props.column_type.includes("date")) {
        return <Form.Item
            name={props.name}
            style={{ margin: 0 }}
            rules={[
                {
                    type: "date",
                    message: `Giá trị không hợp lệ!`,
                },
            ]}
            initialValue={props.old_value && dayjs(props.old_value, 'M/D/YYYY')}
        >
            <DatePicker format={DATE_FORMAT} />
        </Form.Item>

    }

    return <Form.Item>
        <Input />
    </Form.Item>
}

export default function (props: IProps) {
    const [form] = Form.useForm();

    const { data, setData } = props
    const { block_id, table_id } = useParams()

    const [editingKey, setEditingKey] = useState('');
    const [isSaving, setIsSaving] = useState(false)

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        setEditingKey(record.key);
    };

    const cancel = () => {
        form.validateFields().then(() => {
            setEditingKey('');
        })
    };

    const addNewRow = () => {
        var emptyRow: any = {}

        props.columns.map(col => {
            emptyRow[col.name] = null
        })

        emptyRow['key'] = `draft_${data.length}`

        setData(data.concat(emptyRow))
        setEditingKey(emptyRow['key'])
        form.resetFields()
    }

    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        if (editing) {
            const row = data.find((row: Item) => row.key === editingKey) as { [k: string]: any }

            return <td {...restProps}>
                <BuildInput old_value={row && row[dataIndex]} name={dataIndex} column_type={inputType} />
            </td>
        }

        return (
            <td {...restProps}>
                {children}
            </td>
        );
    };


    const save = async (key: React.Key) => {
        if (block_id && table_id) {
            try {
                const row = (await form.validateFields());

                for (const col in row) {
                    if (typeof row[col] === 'object') {
                        row[col] = row[col].format(DATE_FORMAT)
                    }
                }

                const newData = [...data];
                const index = newData.findIndex((item) => key === item.key);

                if (index > -1) {
                    // send post requests to upsert new data
                    const config = await getBearerHeader()
                    const res = await axios.post(API.Blocks.Tables.Upsert(block_id, table_id), row, config)

                    if (res.status === 200) {
                        const item = newData[index];
                        newData.splice(index, 1, {
                            ...item,
                            ...row,
                        });
                        setData(newData);
                        setEditingKey('');
                        form.resetFields()

                        message.success("Lưu thành công!")
                        setIsSaving(false)
                    } else {
                        message.error("Lưu thất bại!")
                    }
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                    form.resetFields()
                }
            } catch (errInfo) {

            }
        }
    };

    const columns = props.columns.concat({
        title: 'Hành động',
        dataIndex: 'operation',
        width: "15%",
        render: (_: any, record: Item) => {
            const editable = isEditing(record);

            return editable ? (
                <span>
                    <Button loading={isSaving} onClick={() => {
                        setIsSaving(true)

                        save(record.key)
                    }} icon={<SaveOutlined />} style={{
                        marginRight: 8
                    }}>Lưu</Button>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <Typography.Link>Hủy</Typography.Link>
                    </Popconfirm>
                </span>
            ) : (
                <Button icon={<EditOutlined />} onClick={() => edit(record)}>
                    Chỉnh sửa
                </Button>
            );
        },
    })

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.column_type,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} layout='vertical'>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                scroll={{ y: 500 }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
                footer={() => <Button onClick={addNewRow} icon={<PlusOutlined />}>Thêm dữ liệu mới</Button>}
            />

        </Form>
    );
};