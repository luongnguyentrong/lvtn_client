import { Col, Form, SelectProps, Input, Modal, Row, Select, message } from "antd"
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { getBearerHeader, getCurrentUser, toSlug } from "../../../utils";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../api";

interface IProps {
    isModalOpen: boolean;
    close: () => void
    update: () => void
}

export default function (props: IProps) {
    const [users, setUsers] = useState<SelectProps['options']>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Users.List, config)
        }).then(res => {
            const data = res.data

            let new_users: SelectProps['options'] = []
            if (data.unit_admin) {
                new_users = new_users.concat(data.unit_admin.map((user: any) => {
                    return {
                        value: user.id,
                        label: user.firstName + " " + user.lastName
                    }
                }))
            }

            if (data.normal) {
                new_users = new_users.concat(data.normal.map((user: any) => {
                    return {
                        value: user.id,
                        label: user.firstName + " " + user.lastName
                    }
                }))
            }

            setUsers(new_users)
        })
    }, [])


    const [form] = useForm()

    const onDisplayChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue(["block", "name"], toSlug(ele.target.value))
    }

    const handleOk = () => {
        getCurrentUser().then(user => {
            if (user) {
                form.validateFields().then(data => {
                    setLoading(true)

                    data.block.created_by = user.sub

                    getBearerHeader().then(config => {
                        return axios.post(API.Blocks.Create, data.block, config)
                    }).then(res => {
                        if (res.status === 201) {
                            setLoading(false)
                            props.close()
                            message.success("Tạo tập dữ liệu thành công!")

                            props.update()
                        }
                    })
                })
            }
        })
    }

    return <Modal title="Tạo tập dữ liệu mới" confirmLoading={loading} open={props.isModalOpen} onOk={handleOk} onCancel={props.close}>
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
                name={["block", "manager_ids"]}
            >
                <Select
                    mode="multiple"
                    placeholder="Select a option and change input text above"
                    options={users}
                />
            </Form.Item>
        </Form>
    </Modal>
}