import React, { useState } from 'react';
import { KeyOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Form, Input, InputNumber, Popconfirm, Select, Space, Switch, Table, Typography } from 'antd';
import { toSlug } from '../../../utils';
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

export interface Item {
    key: string;
    name: string;
    display_name: string;
    column_type: string;
    is_primary?: boolean
    is_indexed: boolean
    not_null: boolean
    order: number
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

const column_type_options = [
    { value: 'smallint', label: 'Số nguyên nhỏ' },
    { value: 'integer', label: 'Số nguyên' },
    { value: 'bigint', label: 'Số nguyên lớn' },
    { value: 'serial', label: 'Tuần tự' },
    { value: 'double precision', label: 'Số thực' },
    { value: 'varchar(255)', label: 'Chuỗi' },
    { value: 'date', label: 'Ngày / giờ' },
]

interface IProps {
    data: Array<Item>
    setData: (new_data: Array<Item>) => void
}

export default function (props: IProps) {
    const [form] = Form.useForm();

    const { data, setData } = props

    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        form.resetFields()

        const new_data = data.slice(0, -1)
        setData(new_data)
        setEditingKey('');
    };

    const addNewRow = async () => {
        if (editingKey != '') {
            await save(editingKey)
        }

        setData(data.concat({
            key: `row_${data.length}`,
            name: '',
            display_name: '',
            column_type: '',
            is_indexed: false,
            not_null: false,
            order: data.length
        }))

        setEditingKey(`row_${data.length}`)
    }

    const onDisplayChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
        let name = toSlug(ele.target.value)

        let cur_idx = 1
        while (data.find(col => col.name === name)) {
            name = name + cur_idx++
        }

        form.setFieldValue("name", name)
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
        let inputNode = null

        if (inputType === 'number')
            inputNode = <InputNumber />
        else if (inputType === 'select') {
            inputNode = <Select
                options={column_type_options}
            />
        } else {
            inputNode = <Input />
        }

        if (editing) {
            if (dataIndex === "display_name")
                return <td {...restProps}>
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                min: 2,
                                max: 30,
                                type: "string",
                                message: `Tên cột không hợp lệ!`,
                            },
                        ]}
                    >
                        <Input onChange={onDisplayChange} />
                    </Form.Item>
                </td>
            else if (dataIndex === 'name')
                return <td {...restProps}>
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                min: 2,
                                max: 10,
                                type: 'string',
                                pattern: new RegExp('^[a-zA-Z_][a-zA-Z0-9_]{0,62}$'),
                                message: `Mã cột không hợp lệ!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                </td>
            else if (dataIndex === 'column_type')
                return <td {...restProps}>
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Kiểu cột không hợp lệ!`,
                            },
                        ]}
                    >
                        <Select
                            options={column_type_options}
                        />
                    </Form.Item>
                </td>
            else if (dataIndex === "is_indexed") {
                return (
                    <td {...restProps}>
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            initialValue={record.is_indexed}
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </td>
                );
            }
            else if (dataIndex === "not_null") {
                return (
                    <td {...restProps}>
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            valuePropName="checked"
                            initialValue={record.not_null}
                        >
                            <Switch />
                        </Form.Item>
                    </td>
                );
            }
        }

        return (
            <td {...restProps}>
                {children}
            </td>
        );
    };


    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                if (key === "row_0") {
                    row.is_primary = true
                }

                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                setData(newData);
                setEditingKey('');
                form.resetFields()
            } else {

                newData.push(row);
                setData(newData);
                setEditingKey('');
                form.resetFields()
            }
        } catch (errInfo) {

        }
    };

    const columns = [
        {
            title: 'Tên cột',
            dataIndex: 'display_name',
            editable: true,
        },
        {
            title: 'Mã cột',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        {
            title: 'Kiểu',
            dataIndex: 'column_type',
            editable: true,
            render: (key: string) => {
                const row = column_type_options.find(col_type => col_type.value === key)

                if (row)
                    return row.label

                return ""
            }
        },
        {
            title: 'Bắt buộc',
            editable: true,
            width: 100,
            dataIndex: "not_null",
            render: (not_null: boolean) => {
                return <Switch disabled checked={not_null} />
            }
        },
        {
            title: 'Chỉ mục',
            editable: true,
            width: 100,
            dataIndex: "is_indexed",
            render: (is_indexed: boolean) => {
                return <Switch disabled checked={is_indexed} />
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'operation',
            width: "15%",
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button onClick={() => {
                            save(record.key)
                        }} icon={<SaveOutlined />} style={{
                            marginRight: 8
                        }}>Lưu</Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Typography.Link>Hủy</Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Chỉnh sửa
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} layout='vertical'>
            <Table
                rowSelection={{
                    columnTitle: <KeyOutlined />,
                    type: "radio",
                    defaultSelectedRowKeys: ["row_0"],
                    onChange: (keys: React.Key[], rows: Item[]) => {
                        if (keys.length === 1) {
                            const new_data = data.map(col => {
                                if (col.key === keys[0]) {
                                    col.is_primary = true

                                    return col
                                }

                                col.is_primary = false
                                return col
                            })

                            setData(new_data)
                        }
                    }
                }}
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
                footer={() => <Button icon={<PlusOutlined />} onClick={addNewRow}> Thêm cột mới </Button>}
            />
        </Form>
    );
};