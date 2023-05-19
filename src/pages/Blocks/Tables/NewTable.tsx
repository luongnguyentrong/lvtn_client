import { Button, Card, Col, Divider, Form, Input, Layout, Row, Typography, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import DefineColumn, { Item } from "./DefineColumn"
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getBearerHeader, getCurrentUser } from "../../../utils";
import axios from "axios";
import API from "../../../api";
import { useParams } from "react-router-dom";

export default function () {
    const { block_id } = useParams()
    const [data, setData] = useState<Array<Item>>([])
    const [loading, setLoading] = useState(false)
    const [form] = useForm()

    const handleSubmit = () => {
        form.validateFields().then(table => {
            table.block.columns = data

            if (block_id) {
                getCurrentUser().then(user => {
                    if (user) {
                        table.block.created_by = user.sub

                        getBearerHeader().then(config => {
                            return axios.post(API.Blocks.Tables.Create(block_id), table.block, config)
                        }).then(res => {
                            if (res.status === 201) {
                                setData([])
                                form.resetFields()
                                message.success("Tạo bảng dữ liệu thành công!")
                            }
                        })
                    }
                })
            }
        })
    }

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        <Card title="Tạo bảng dữ liệu mới">
            <Form
                name="basic"
                layout="vertical"
                form={form}
            >
                <Row gutter={12} style={{ maxWidth: 600 }}>
                    <Col span={18}>
                        <Form.Item
                            label="Tên bảng dữ liệu"
                            name={["block", "display_name"]}
                            rules={[{ required: true, message: 'Hãy điền tên tập dữ liệu!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            label="Mã bảng"
                            name={["block", "name"]}
                            rules={[{ required: true, message: 'Hãy điền mã tập dữ liệu!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name={["block", "description"]}
                    label="Mô tả"
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>

            <Form.Item label="Định nghĩa cột">
                <DefineColumn data={data} setData={setData} />
            </Form.Item>

            <Form.Item >
                <Button
                    loading={loading}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        // setLoading(true)

                        handleSubmit()
                    }}
                >
                    Tạo bảng
                </Button>
            </Form.Item>
        </Card>
    </Layout.Content>
}