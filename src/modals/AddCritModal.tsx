import { Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"

interface IProps {
    open: boolean
    close: () => void
    addCrit: (crit: string) => void
}

export default function (props: IProps) {
    const [form] = useForm()

    const handleOk = () => {
        form.validateFields().then(res => {
            props.addCrit(res.criteria)

            form.resetFields()
            props.close()
        })
    }

    const handleCancel = () => {
        form.resetFields()
        props.close()
    }

    return (
        <Modal title="Thêm tiêu chí" open={props.open} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Nhập nội dung tiêu chí"
                    name="criteria"
                    rules={[{ required: true, message: 'Hãy nhập tiêu chí!' }]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    )
}