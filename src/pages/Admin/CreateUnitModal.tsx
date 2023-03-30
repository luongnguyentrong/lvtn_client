import { Form, Input, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { getAPIHost } from '../../utils'

interface IProps {
    open: boolean;
    onCancel: () => void;
    onCreate: (values: any) => void
}
export default function (props: IProps) {
    const [form] = Form.useForm();
    const cookies = new Cookies()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <Modal
            open={props.open}
            title="Tạo đơn vị"
            okText="Create"
            cancelText="Cancel"
            confirmLoading={isLoading}
            onCancel={props.onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields()
                        // setIsLoading(true)
                        props.onCreate(values)
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="create_unit_form"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="unit_name"
                    label="Tên đơn vị"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input disabled={isLoading ? true : false} />
                </Form.Item>

                <Form.Item
                    name="admin_username"
                    label="Username của unit admin"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input disabled={isLoading ? true : false} />
                </Form.Item>

                <Form.Item
                    name="admin_password"
                    label="Password của unit admin"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input.Password disabled={isLoading ? true : false} />
                </Form.Item>
            </Form>
        </Modal>
    )
}