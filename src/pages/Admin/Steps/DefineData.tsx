import { Button, Card, Empty, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { TableOutlined, PlusOutlined, FolderAddOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
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

            <Empty />
        </Card>

        <Modal title="Định nghĩa table" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="dynamic_form_item"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                layout="vertical"
            >
                <Form.Item
                    label="Tên table"
                    name="table_display_name"
                    rules={[{ required: true, message: 'Hãy điền tên của table' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mã table"
                    name="table_name"
                    rules={[{ required: true, message: 'Hãy điền mã của table' }]}>
                    <Input />
                </Form.Item>


                <Form.List
                    name="columns"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 2) {
                                    return Promise.reject(new Error('Table phải có ít nhất một column!'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'Định nghĩa column' : ''}
                                    required={false}
                                    key={field.key}

                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                >
                                    <Space>
                                        <Form.Item
                                            name={['column', 'name']}
                                            noStyle
                                            rules={[{ required: true, message: 'Hãy điền tên cột!' }]}
                                        >
                                            <Input placeholder="Tên cột" />
                                        </Form.Item>

                                        <Form.Item
                                            name={['column', 'type']}
                                            noStyle
                                            rules={[{ required: true, message: 'Hãy điền tên cột!' }]}
                                        >
                                            <Select placeholder="Select province">
                                                <Select.Option value="Zhejiang">Zhejiang</Select.Option>
                                                <Select.Option value="Jiangsu">Jiangsu</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name={['column', 'description']}
                                            noStyle
                                        >
                                            <Input placeholder="Mô tả" />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    </Space>
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                >
                                    Add field
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}