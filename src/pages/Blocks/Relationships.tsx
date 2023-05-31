import { Button, Card, Col, Descriptions, Empty, Form, Layout, Popconfirm, Row, Space, Typography, message } from "antd"
import { PlusOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import CreateRelationship from "./Modals/CreateRelationship";
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

export interface ITable {
    id: number
    name: string
    description: string
    display_name: string
}

interface IReference {
    id: number,
    table_name: string
    column_name: string
    ref_table_name: string
    ref_column_name: string
    constraint_name: string
    block_id: string
}

export default function () {
    const { block_id } = useParams()

    const [openModal, setOpenModal] = useState(false)
    const [tables, setTables] = useState<Array<ITable>>([])
    const [refs, setRefs] = useState<Array<IReference>>()

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

    useEffect(() => {
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.References.List(block_id), config)
            }).then(res => {
                setRefs(res.data)
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
            {refs === undefined ? <Loading /> :
                refs.length === 0 ? <Card><Empty /></Card> :
                    refs.map(ref => {
                        return <Card key={ref.id} title={"Liên kết #" + ref.id} extra={
                            <Popconfirm
                                title="Xóa liên kết"
                                description="Bạn có muốn xóa liên kết này ?"
                                onConfirm={() => {
                                    getBearerHeader().then(config => {
                                        if (block_id)
                                            axios.delete(API.Blocks.References.Delete(block_id, ref.id), config).then(res => {
                                                if (res.status === 200) {
                                                    message.success("Xoá liên kết thành công!")
                                                    setRefs(refs.filter(old_ref => old_ref.id != ref.id))
                                                }
                                            })
                                    })
                                }}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button icon={<DeleteOutlined />}>Xoá liên kết</Button>
                            </Popconfirm>}>
                            <Row>
                                <Col span={8}>
                                    <Row>
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="Bảng dữ liệu"><Typography.Text mark>{ref.table_name}</Typography.Text></Descriptions.Item>

                                            <Descriptions.Item label="Trường dữ liệu">{ref.column_name}</Descriptions.Item>
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
                                        <Descriptions.Item label="Bảng dữ liệu"><Typography.Text mark>{ref.ref_table_name}</Typography.Text></Descriptions.Item>

                                        <Descriptions.Item label="Trường dữ liệu">{ref.ref_column_name}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        </Card>
                    })
            }
        </Card>
        <CreateRelationship tables={tables} open={openModal} close={close} />
    </Layout.Content>
}
