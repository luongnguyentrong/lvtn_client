import { Col, Form, SelectProps, Input, Modal, Row, Select } from "antd"
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../../utils";
import { IBlock } from "../Cards/BlockCard";
import { useEffect } from "react";

interface IProps {
    isModalOpen: boolean;
    initials: IBlock | undefined
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

    const options: SelectProps['options'] = [
        {
            label: "Nguyễn Trọng Đức Lương",
            value: "38383833",
        },
        {
            label: "Nguyễn Văn Khoa",
            value: "383892891"
        },
        {
            label: "Nguyễn Văn Mạnh",
            value: "383892895"
        }
    ]

    useEffect(() => {
        if (props.initials) {
            form.setFieldsValue({
                block: {
                    display_name: props.initials.display_name,
                    name: props.initials.name,
                    description: props.initials.description,
                    manager: props.initials.manager
                }
            })
        }
    }, [form, props.initials])

    return <Modal title="Chỉnh sửa tập dữ liệu" open={props.isModalOpen} onOk={handleOk} onCancel={props.close}>
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

            <Form.Item
                label="Chọn người quản lý"
                rules={[{ required: true, message: 'Hãy chọn người quản lý tập dữ liệu!' }]}
                name={["block", "manager"]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    options={options}
                />
            </Form.Item>
        </Form>
    </Modal>
}