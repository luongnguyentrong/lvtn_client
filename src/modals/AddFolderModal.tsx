import { Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"

interface IProps {
    open: boolean
    close: () => void
    addFolder: (name: string) => void
}

export default function (props: IProps) {
    const [form] = useForm()

    const handleOk = () => {
        form.validateFields().then(res => {
            props.addFolder(res.folderName)
            form.resetFields()
            props.close()
        })
    }

    const handleCancel = () => {
        form.resetFields()
        props.close()
    }

    return (
        <Modal title="Thêm folder" open={props.open} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Nhập tên folder"
                    name="folderName"
                    rules={[{ required: true, message: 'Hãy nhập tiêu chí!' }]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    )
}