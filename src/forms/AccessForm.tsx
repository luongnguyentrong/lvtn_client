import { Checkbox, Col, Divider, Form, Row } from "antd"
import { FormInstance } from "antd/lib/form"
import { useEffect, useState } from "react"
import { getBearerHeader } from "../utils"
import axios from "axios"
import API from "../api"
import Loading from "../pages/Loading"

interface IProps {
    form: FormInstance
}

interface IBlock {
    id: number
    name: string
    display_name: string
    description: string
    created_by: string
    unit_name: string
}

export default function (props: IProps) {
    const [blocks, setBlocks] = useState<Array<IBlock>>([])

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Blocks.List, config)
        }).then(res => {
            setBlocks(res.data)
        })
    }, [])

    if (blocks.length === 0)
        return <Loading />

    return <Form
        style={{ maxWidth: 600 }}
        layout="vertical"
        form={props.form}
    >
        <Form.Item name="access" label="Tập dữ liệu" rules={[{ required: true }]}>
            <Checkbox.Group>
                <Row>
                    {blocks.map(block => {
                        return <Col span={12} key={block.id}>
                            <Checkbox value={block.name}>{block.display_name}</Checkbox>
                        </Col>
                    })}
                </Row>
            </Checkbox.Group>
        </Form.Item>
    </Form>

}