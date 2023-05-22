import { Col, Form, Input, Modal, Row, Select, SelectProps, Space, message } from "antd"
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { ITable } from '../Relationships'
import { getBearerHeader } from "../../../utils";
import axios, { AxiosError } from "axios";
import API from "../../../api";
import { useParams } from "react-router-dom";

interface IProps {
    open: boolean
    close: () => void
    tables: Array<ITable>
}

interface IColumn {
    id: number
    name: string
    display_name: string
    column_type: string
}

interface IOption {
    value: string
    label: string
}

export default function (props: IProps) {
    const { block_id } = useParams()

    const [form] = useForm()
    const [loading, setLoading] = useState(false)

    const [colA, setColA] = useState<Array<IOption>>([])
    const [colB, setColB] = useState<Array<IOption>>([])

    const handleOk = () => {
        form.validateFields().then(res => {
            const tableA = props.tables.find(table => table.id === res.table_id)
            const tableB = props.tables.find(table => table.id === res.ref_table_id)

            if (tableA && tableB && block_id) {
                const data = {
                    table_name: tableA.name,
                    column_name: res.col_name,
                    ref_table_name: tableB.name,
                    ref_column_name: res.ref_col_name
                }

                getBearerHeader().then(config => {
                    return axios.post(API.Blocks.References.Create(block_id), data, config)
                }).then(res => {
                    if (res.status === 201) {
                        message.success("Tạo liên kết thành công!")
                    }
                }).catch((err: AxiosError) => {
                    message.error(err.message)
                    console.log(err)
                }
                )

            } else {
                message.error("Giá trị nhập vào không hợp lệ!")
            }

            form.resetFields()

            props.close()
        })
    }

    const handleCancel = () => {
        if (!loading) {
            form.resetFields()
            props.close()
        }
    }

    const table_options = props.tables.map(table => {
        return {
            value: table.id,
            label: table.display_name
        }
    })

    const fetchColumns = (table_id: number, is_a: boolean) => {
        if (block_id)
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.Columns.List(block_id, table_id), config)
            }).then(res => {
                if (res.data) {
                    const cols = res.data as Array<IColumn>
                    const options: Array<IOption> = cols.map(col => ({
                        label: col.display_name,
                        value: col.name
                    }))


                    if (is_a)
                        setColA(options)
                    else setColB(options)
                }
            })
    }

    return (
        <Modal confirmLoading={loading} title="Tạo liên kết" open={props.open} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                layout="vertical"
                form={form}
            >
                <Row gutter={16}>
                    <Col span={14}>
                        <Form.Item
                            label="Bảng A"
                            name="table_id"
                            rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn bảng"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').includes(input)
                                }
                                onChange={(value, option) => {
                                    fetchColumns(value, true)
                                }}
                                options={table_options}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={10}>
                        <Form.Item
                            label="Cột làm khóa ngoại"
                            name="col_name"
                            rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}
                        >
                            <Select
                                disabled={colA.length === 0}
                                showSearch
                                placeholder="Chọn cột"
                                optionFilterProp="children"
                                filterOption={(input: string, option) =>
                                    (option?.label ?? '').includes(input)
                                }
                                options={colA}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={14}>
                        <Form.Item
                            label="Bảng B"
                            name="ref_table_id"
                            rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn bảng"
                                optionFilterProp="children"
                                onChange={(value, option) => {
                                    fetchColumns(value, false)
                                }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').includes(input)
                                }
                                options={table_options}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={10}>
                        <Form.Item
                            label="Cột được tham khảo"
                            name="ref_col_name"
                            rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}
                        >
                            <Select
                                disabled={colA.length === 0}
                                showSearch
                                placeholder="Chọn cột"
                                optionFilterProp="children"
                                filterOption={(input: string, option) =>
                                    (option?.label ?? '').includes(input)
                                }
                                options={colB}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}