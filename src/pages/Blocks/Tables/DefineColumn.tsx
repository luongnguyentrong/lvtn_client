import React, { useState } from 'react';
import { KeyOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Table, Typography } from 'antd';
import { toSlug } from '../../../utils';

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

const column_type_options = [
    { value: 'smallint', label: 'Số nguyên nhỏ' },
    { value: 'integer', label: 'Số nguyên' },
    { value: 'bigint', label: 'Số nguyên lớn' },
    { value: 'serial', label: 'Tuần tự' },
    { value: 'double precision', label: 'Số thực' },
    { value: 'varchar(25)', label: 'Chuỗi' },
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
        form.validateFields().then(() => {
            setEditingKey('');
        })
    };

    const addNewRow = () => {
        setData(data.concat({
            key: `row_${data.length}`,
            name: '',
            display_name: '',
            column_type: '',
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

        }

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Hãy nhập ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
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
            title: 'Hành động',
            dataIndex: 'operation',
            width: "15%",
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Lưu
                        </Typography.Link>
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

        let inputType = 'text'
        if (col.dataIndex === 'age')
            inputType = 'number'
        else if (col.dataIndex === 'column_type')
            inputType = 'select'

        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: inputType,
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
                    selectedRowKeys: ["row_0"],
                    onChange: (keys: React.Key[], rows: Item[]) => {
                        if (keys.length === 1) {
                            const new_data = data.map(col => {
                                if (col.key === keys[0]) {
                                    col.is_primary = true

                                    return col
                                }

                                return col
                            })

                            console.log(new_data)
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
                footer={() => <Button onClick={addNewRow}> Thêm cột mới </Button>}
            />

        </Form>
    );
};