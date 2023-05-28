import { Col, Form, SelectProps, Input, Modal, Row, Select, message } from "antd"
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { getBearerHeader, toSlug } from "../../../utils";
import { IBlock } from "../Cards/BlockCard";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../api";

interface IProps {
    isModalOpen: boolean;
    initials: IBlock | undefined
    close: () => void
    update: () => void
}

export default function (props: IProps) {
    const [form] = useForm()
    const [users, setUsers] = useState<SelectProps['options']>([])
    const [loading, setLoading] = useState(false)

    const handleOk = () => {
        setLoading(true)

        form.validateFields().then(data => {
            getBearerHeader().then(config => {
                if (props.initials) {
                    axios.put(API.Blocks.Delete(props.initials.id), data.block, config).then(res => {
                        if (res.status === 200) {
                            setLoading(false)
                            props.close()

                            message.success("Cập nhật thành công!")
                            props.update()
                        }
                    }).catch(err => {
                        setLoading(false)
                        message.error(err.message)
                    })
                }
            })
        })
    }

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



    useEffect(() => {
        if (props.initials) {
            form.setFieldsValue({
                block: {
                    display_name: props.initials.display_name,
                    name: props.initials.name,
                    description: props.initials.description,
                    manager_ids: props.initials.manager_ids
                }
            })
        }
    }, [form, props.initials])

    return <Modal title="Chỉnh sửa tập dữ liệu" open={props.isModalOpen} confirmLoading={loading} onOk={handleOk} onCancel={props.close}>
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
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        label="Mã tập dữ liệu"
                        name={["block", "name"]}
                        rules={[{ required: true, message: 'Hãy điền mã tập dữ liệu!' }]}
                    >
                        <Input disabled />
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