import { Button, Form, Input, Modal } from "antd"
import { FormInstance } from "antd/lib/form";

interface IProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void
    modalForm: FormInstance<any>
}

export default function (props: IProps) {
    return <Modal title="Tạo tập dữ liệu mới" open={props.isModalOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
        <Form
            name="basic"
            layout="vertical"
            form={props.modalForm}
            style={{ maxWidth: 500 }}
        >
            <Form.Item
                label="Tên tập dữ liệu"
                name={["block", "name"]}
                rules={[{ required: true, message: 'Hãy điền tên tập dữ liệu!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mô tả"
                name={["block", "description"]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}