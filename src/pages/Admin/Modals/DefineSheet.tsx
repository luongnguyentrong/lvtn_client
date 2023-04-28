import { Button, Form, Input, Modal, Select, Space } from "antd"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from "antd/lib/form";

interface IProps {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    form: FormInstance<any>
}

export default function (props: IProps) {
    return <Modal title="Định nghĩa table" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
        <Form
            name="dynamic_form_item"
            form={props.form}
            style={{ maxWidth: 600 }}
            layout="vertical"
        >
            <Form.Item
                label="Tên table"
                name={["table", "display_name"]}
                rules={[{ required: true, message: 'Hãy điền tên của table' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Mã table"
                name={["table", "name"]}
                rules={[{ required: true, message: 'Hãy điền mã của table' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label='Định nghĩa column'
            >
                <Form.List name={["table", "columns"]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex' }} align="baseline">
                                    <Form.Item
                                        {...restField}

                                        name={[name, 'name']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="First Name" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'data_type']}
                                    >
                                        <Select
                                            style={{ width: 120 }}
                                            options={[
                                                { value: 'int', label: 'Integer' },
                                                { value: 'float', label: 'Float' },
                                                { value: 'string', label: 'String' },
                                            ]}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'description']}
                                    >
                                        <Input placeholder="Last Name" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm cột
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
        </Form>
    </Modal >
}