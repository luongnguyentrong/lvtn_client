import { Button, Form, Input, Modal } from "antd"

interface IProps {
    open: boolean
    close: () => void
}

export default function (props: IProps) {
    const isModalOpen = false

    const handleOk = () => {

    }

    return <Modal title="Tạo phân tích mới" open={props.open} onOk={props.close} onCancel={props.close}>
        <Form
            name="basic"
            layout="vertical"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Modal>
}