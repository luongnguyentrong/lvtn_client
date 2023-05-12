import { Col, Form, Input, Modal, Row } from "antd"
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/lib/form";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../../utils";

interface IProps {
    isModalOpen: boolean;
    close: () => void
}

export default function (props: IProps) {
    const navigate = useNavigate()
    const [form] = useForm()

    const onDisplayChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue(["block", "name"], toSlug(ele.target.value))
    }

    const handleOk = () => {
        form.validateFields().then(data => {
            data['items'] = []

            props.close()
            navigate("/unit_admin/blocks/new", {
                state: {
                    block: data
                }
            })
        })
    }

    return <Modal title="Tạo tập dữ liệu mới" open={props.isModalOpen} onOk={handleOk} onCancel={props.close}>
        <Form
            name="basic"
            layout="vertical"
            form={form}
            style={{ maxWidth: 500 }}
        >
            <Row gutter={12}>
                <Col span={18}>
                    <Form.Item
                        label="Tên tập dữ liệu"
                        name={["block", "display_name"]}
                        rules={[{ required: true, message: 'Hãy điền tên tập dữ liệu!' }]}
                    >
                        <Input onChange={onDisplayChange} />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Mã tập dữ liệu"
                        name={["block", "name"]}
                        rules={[{ required: true, message: 'Hãy điền mã tập dữ liệu!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Mô tả"
                name={["block", "description"]}
            >
                <Input />
            </Form.Item>
        </Form>
    </Modal>
}