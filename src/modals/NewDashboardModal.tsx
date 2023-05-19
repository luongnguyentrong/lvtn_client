import { Button, Form, Input, Modal, message } from "antd"
import { useForm } from "antd/es/form/Form"
import axios from "axios"
import API from "../api"
import { getBearerHeader } from "../utils"

interface IProps {
    open: boolean
    close: () => void
}

export default function (props: IProps) {
    const [form] = useForm()

    const handleOk = () => {
        form.validateFields().then(data => {
            const config = getBearerHeader()

            console.log(config)
            axios.post(API.Dashboards.Create, data, config).then(res => {
                if (res.status === 201) {
                    message.success("Tạo phân tích thành công!")
                }

                form.resetFields()
                props.close()
            }).catch(err => {
                form.resetFields()
                props.close()
                message.error(err.message)
            })
        })
}

return <Modal title="Tạo phân tích mới" open={props.open} onOk={handleOk} onCancel={props.close}>
    <Form
        name="basic"
        layout="vertical"
        form={form}
    >
        <Form.Item
            label="Tên bảng dữ liệu"
            name="title"
            rules={[{ required: true, message: 'Hãy nhập tên bảng dữ liệu!' }]}
        >
            <Input />
        </Form.Item>

    </Form>
</Modal>
}