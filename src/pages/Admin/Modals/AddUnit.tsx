import { Col, Form, Input, Modal, Row, message } from "antd"
import axios from "axios"
import { getBearerHeader, getUnit, toSlug } from "../../../utils"
import { useState } from "react"

interface IProps {
    open: boolean
    close: () => void
}

export default function (props: IProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()

    const handleOk = () => {
        form.validateFields().then(values => {
            const data = {
                unit_name: values.name,
                display_name: values.display_name,
                description: values.description,
                parent_unit: getUnit()
            }

            setIsLoading(true)

            axios.post("http://localhost:5000/units", data, getBearerHeader()).then(res => {
                if (res.status === 201) {
                    message.success("Tạo đơn vị thành công")
                }

                setIsLoading(false)
                form.resetFields()
                props.close()
            }).catch(err => {
                setIsLoading(false)
                form.resetFields()
                props.close()

                message.error(err.message)                
            })

        })

    }

    const onDisplayChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue("name", toSlug(ele.target.value)) 
    }

    return <Modal title="Tạo đơn vị" open={props.open} onOk={handleOk} onCancel={props.close} confirmLoading={isLoading}>
        <Form
            style={{ maxWidth: 600 }}
            layout="vertical"
            form={form}
        >
            <Row gutter={16}>
                <Col span={14}>
                    <Form.Item
                        label="Tên đơn vị"
                        name="display_name"
                        rules={[{ required: true, message: 'Hãy điền tên đơn vị', max: 30 }]}>
                        <Input disabled={isLoading} onChange={onDisplayChange} />
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item
                        label="Mã đơn vị"
                        name="name"
                        rules={[{ required: true, message: 'Hãy điền tên của table' }]}>
                        <Input disabled={isLoading} />
                    </Form.Item>
                </Col>
            </Row>


            <Form.Item
                label="Mô tả"
                name="description"
            >
                <Input.TextArea disabled={isLoading} rows={4} />
            </Form.Item>

        </Form>
    </Modal>
}