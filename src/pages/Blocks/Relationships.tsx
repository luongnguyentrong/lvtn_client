import { Button, Card, Col, Descriptions, Form, Layout, Row, Space, Typography } from "antd"
import { PlusOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import CreateRelationship from "./Modals/CreateRelationship";
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import { useParams } from "react-router-dom";

export interface ITable {
    id: number
    name: string
    description: string
    display_name: string
}

export default function () {
    const { block_id } = useParams()

    const [openModal, setOpenModal] = useState(false)
    const [tables, setTables] = useState<Array<ITable>>([])

    const close = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        // fetch tables
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.List(block_id), config)
            }).then(res => {
                if (res.data) {
                    setTables(res.data)
                }
            })
        }
    }, [])

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        <Card title="Liên kết giữa các bảng dữ liệu" extra={<Button icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>Thêm liên kết</Button>}>
            <Card title="Liên kết #1" extra={<Button icon={<DeleteOutlined />}>Xoá liên kết</Button>}>
                <Row>
                    <Col span={8}>
                        <Row>
                            <Descriptions column={1}>
                                <Descriptions.Item label="Bảng dữ liệu"><Typography.Text mark>Sinh viên khóa 2019 (svk2)</Typography.Text></Descriptions.Item>

                                <Descriptions.Item label="Trường dữ liệu">Mã số sinh viên</Descriptions.Item>
                            </Descriptions>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row justify={"center"} align={"middle"} style={{ height: "100%" }}>
                            <Space><Typography.Text strong>Tham khảo</Typography.Text> <ArrowRightOutlined /></Space>
                        </Row>
                    </Col>

                    <Col span={8}>
                        <Descriptions column={1}>
                            <Descriptions.Item label="Bảng dữ liệu"><Typography.Text mark>Sinh viên khóa 2019 (svk2)</Typography.Text></Descriptions.Item>

                            <Descriptions.Item label="Trường dữ liệu">Mã số sinh viên</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </Card>
        </Card>

        <CreateRelationship tables={tables} open={openModal} close={close} />
    </Layout.Content>
}
