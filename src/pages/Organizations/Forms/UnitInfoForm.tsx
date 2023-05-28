import { Col, Form, Input, Row } from "antd"
import { FormInstance } from "antd/lib/form"

interface IProps {
    form: FormInstance
    onDisplayChange: (ele: React.ChangeEvent<HTMLInputElement>) => void
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
                    <Form.Item
                        label="Tên đơn vị"
                        name="display_name"
                        rules={[{ required: true, message: 'Hãy điền tên đơn vị', max: 30 }]}>
                        <Input onChange={props.onDisplayChange} />
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item
                        label="Mã đơn vị"
                        name="name"
                        rules={[{ required: true, message: 'Hãy điền tên của table' }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item
                label="Mô tả"
                name="description"
            >
                <Input.TextArea rows={4} />
            </Form.Item>
        </Form>

    )
}