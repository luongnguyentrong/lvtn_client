import { Form, Input, Modal, Select, Space, Spin } from "antd"
import { FileAddOutlined, LoadingOutlined, LinkOutlined, LineChartOutlined } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form"
import { useState } from "react";

const { Option } = Select;

interface IProps {
    open: boolean
    close: () => void
}

export default function (props: IProps) {
    const [form] = useForm()
    const [loading, setLoading] = useState(false)

    const handleOk = () => {
        form.validateFields().then(res => {
            form.resetFields()
            props.close()
        })
    }

    const handleCancel = () => {
        form.resetFields()
        props.close()
    }

    return (
        <Modal title="Thêm dẫn chứng" open={props.open} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Hãy nhập mô tả!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dữ liệu đính kèm"
                    name="criteria"
                    rules={[{ required: true, message: 'Hãy chọn dữ kiểu để đính kèm!' }]}
                >
                    <Select
                        placeholder="Chọn kiểu của dẫn chứng"
                        allowClear
                    >
                        <Option value="file">
                            <Space>
                                <FileAddOutlined /> Tệp
                            </Space>
                        </Option>
                        <Option value="dashboard">
                            <Space>
                                <LineChartOutlined /> Phân tích
                            </Space>
                        </Option>

                        <Option value="link">
                            <Space>
                                <LinkOutlined /> Đường dẫn
                            </Space>
                        </Option>
                    </Select>

                </Form.Item>

                {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : null}

            </Form>
        </Modal>
    )
}