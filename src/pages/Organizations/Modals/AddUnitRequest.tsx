import { Button, Col, Form, Input, Modal, Row, Steps, message } from "antd"
import axios from "axios"
import { getBearerHeader, getUnit, toSlug } from "../../../utils"
import { useState } from "react"
import API from "../../../api"
import UnitInfoForm from "../Forms/UnitInfoForm"
import UnitManagerForm from "../Forms/UnitManagerForm"
import { error } from "console"

interface IProps {
    open: boolean
    close: () => void
}

interface IUnitData {
    name: string
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
            // get unit manager data
            const user = await secondForm.validateFields()

            const data = {
                ...unitData,
                "manager": user
            }

            console.log(data)
            // const result = await axios.post(API.CreateUnits.URL, unitData, getBearerHeader())

            // if (result.status != 201) {
            //     throw new Error("Unexpected server response")
            // }

            // return unitData.unit_name
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
            const fields = await secondForm.validateFields()

            const user = {
                fname: fields.fname,
                lname: fields.lname,
                email: fields.email,
                username: fields.username,
                password: fields.password,
            }
            // create new unit
            getBearerHeader().then(config => {
                if (unitData) {
                    const data = {
                        ...unitData,
                        manager: user
                    }

                    axios.post(API.Requests.List, data, config).then(res => {
                        if (res.status === 201) {
                            message.success('Tạo yêu cầu thành công!')
                        }

                        props.close()
                        setIsLoading(false)
                        setUnitData(undefined)
                        firstForm.resetFields()
                        secondForm.resetFields()
                    })
                }
            })
        } catch (err: any) {
            message.error(err.message)
        }
    }

    return <Modal title="Yêu cầu cấp đơn vị" open={props.open} footer={null} onCancel={props.close} confirmLoading={isLoading}>
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
                            name: fields.name,
                            display_name: fields.display_name,
                            description: fields.description,
                            parent_unit: getUnit(),
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