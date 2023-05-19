import { Button, Col, Form, Input, Modal, Row, Select, Space } from "antd"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from "antd/lib/form";

interface IProps {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    onDisplayChange: (ele: React.ChangeEvent<HTMLInputElement>) => void
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
            <Row gutter={12}>
                <Col span={18}>
                    <Form.Item
                        label="Tên table"
                        name={["table", "display_name"]}
                        rules={[{ required: true, message: 'Hãy điền tên của table' }]}>
                        <Input onChange={props.onDisplayChange} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Mã table"
                        name={["table", "name"]}
                        rules={[{ required: true, message: 'Hãy điền mã của table' }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


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
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'column_type']}
                                    >
                                        <Select
                                            style={{ width: 120 }}
                                            options={[
                                                { value: 'INT', label: 'Integer' },
                                                { value: 'NUMERIC', label: 'Float' },
                                                { value: 'TEXT', label: 'String' },
                                                { value: 'BOOLEAN', label: 'Boolean' },
                                                { value: 'DATE', label: 'Date' },
                                            ]}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'display_name']}
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