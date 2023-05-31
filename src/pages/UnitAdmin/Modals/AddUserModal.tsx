import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Steps, message } from "antd"
import axios from "axios"
import { getBearerHeader, getUnit, toSlug } from "../../../utils"
import { useState } from "react"
import UnitManagerForm from "../../Admin/forms/UnitManagerForm"
import AccessForm from "../../../forms/AccessForm"
import API from "../../../api"
import { } from '../UserManagement'

interface IUser {
    fname: string
    lname: string
    email: string
    username: string
    password: string
    unit_name: string
    role: string
}

interface IProps {
    open: boolean
    close: () => void
    fetch_user: () => void
}

export default function (props: IProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [current, setCurrent] = useState(0);

    const [firstForm] = Form.useForm()
    const [secondForm] = Form.useForm()

    const [user, setUser] = useState<IUser>()


    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const createUser = async () => {
        const fields = await firstForm.validateFields()

        const data = {
            fname: fields.fname,
            lname: fields.lname,
            email: fields.email,
            username: fields.username,
            password: fields.password,
            unit_name: getUnit(),
            role: "unit_normal"
        }

        setUser(data)
        next()
    }
    const steps = [
        {
            key: "general_info",
            title: 'Thông tin người dùng',
            content: <UnitManagerForm form={firstForm} />
        },
        {
            key: "access",
            title: 'Quyền truy cập',
            content: <AccessForm form={secondForm} />
        },
    ];

    const handleCreate = async () => {
        setIsLoading(true)

        const accessfields = await secondForm.validateFields()

        try {
            // create user
            getBearerHeader().then(config => {
                const data = {
                    ...user,
                    access: accessfields.access
                }

                return axios.post(API.Users.List, data, config)
            }).then(res => {
                if (res.status === 201) {
                    message.success('Tạo người dùng thành công!')
                    props.fetch_user()
                }
            })
        } catch (err: any) {
            message.error(err.message)
        }

        props.close()
        setIsLoading(false)
        firstForm.resetFields()
        secondForm.resetFields()
    }

    return <Modal title="Tạo đơn vị" open={props.open} footer={null} onCancel={props.close} confirmLoading={isLoading}>
        <div style={{
            marginTop: 24
        }}>
            <Steps current={current} items={steps} />
            <div style={{
                marginTop: 24
            }}>{steps[current].content}</div>
        </div>
        <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
                <Button type="primary" onClick={createUser}>
                    Tiếp theo
                </Button>
            )}
            {current === steps.length - 1 && (
                <Button loading={isLoading} type="primary" onClick={handleCreate}>
                    Tạo
                </Button>
            )}
            {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Quay lại
                </Button>
            )}
        </div>
    </Modal>
}