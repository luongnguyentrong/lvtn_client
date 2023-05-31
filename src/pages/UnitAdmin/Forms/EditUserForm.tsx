import { Col, Form, Input, Row } from "antd";
import { FormInstance } from "antd/lib/form"

interface IProps {
    form: FormInstance
}

export default function (props: IProps) {
    return (
        <Form
            style={{ maxWidth: 600 }}
            layout="vertical"
            form={props.form}
        >
            <Row gutter={16}>
                <Col span={14}>
                    <Form.Item name="fname" label="Họ" rules={[{ required: true, type: "string", max: 20, message: "Hãy nhập họ!" }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item name="lname" label="Tên" rules={[{ required: true, type: "string", max: 20 }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
            </Form.Item>
        </Form>
    )
}