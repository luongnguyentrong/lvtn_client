import { Button, Col, Form, Input, Modal, Row, Steps, message } from "antd"
import axios from "axios"
import { getBearerHeader, getUnit, toSlug } from "../../../utils"
import { useState } from "react"
import API from "../../../api"
import UnitInfoForm from "../forms/UnitInfoForm"
import UnitManagerForm from "../forms/UnitManagerForm"
import { error } from "console"

interface IProps {
    open: boolean
    close: () => void
}

interface IUnitData {
    unit_name: string
    display_name: string
    description: string
    parent_unit: string
}

export default function (props: IProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [current, setCurrent] = useState(0);

    const [firstForm] = Form.useForm()
    const [secondForm] = Form.useForm()

    const [unitData, setUnitData] = useState<IUnitData | undefined>()

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const createUnit = async () => {
        if (unitData) {
            const result = await axios.post(API.CreateUnits.URL, unitData, getBearerHeader())

            if (result.status != 201) {
                throw new Error("Unexpected server response")
            }

            return unitData.unit_name
        }
    }

    const createUser = async (unit_name: string) => {
        const fields = await secondForm.validateFields()

        const data = {
            fname: fields.fname,
            lname: fields.lname,
            email: fields.email,
            username: fields.username,
            password: fields.password,
            unit_name: unit_name,
            role: "unit_admin"
        }

        const result = await axios.post(API.CreateUsers.URL, data, getBearerHeader())

        if (result.status != 201) {
            throw new Error("Unexpected server response")
        }
    }

    const onDisplayChange = (ele: React.ChangeEvent<HTMLInputElement>) => {
        firstForm.setFieldValue("name", toSlug(ele.target.value))
    }

    const steps = [
        {
            key: "general_info",
            title: 'Thông tin',
            content: <UnitInfoForm onDisplayChange={onDisplayChange} form={firstForm} />,
        },
        {
            key: "manager",
            title: 'Người quản lý',
            content: <UnitManagerForm form={secondForm} />
        },
    ];

    const handleCreate = async () => {
        setIsLoading(true)

        try {
            // create new unit
            const unit_name = await createUnit()

            if (unit_name) {
                // create new user
                await createUser(unit_name)

                message.success('Tạo đơn vị thành công!')
            }
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
                <Button type="primary" onClick={() => {
                    firstForm.validateFields().then(fields => {
                        const data: IUnitData = {
                            unit_name: fields.name,
                            display_name: fields.display_name,
                            description: fields.description,
                            parent_unit: getUnit()
                        }

                        setUnitData(data)

                        next()
                    })

                }}>
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