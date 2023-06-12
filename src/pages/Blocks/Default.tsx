import { Avatar, Card, Col, Descriptions, Empty, Layout, Row, Skeleton, Space, Statistic, Tag, Typography } from "antd"
import { FolderOutlined, TableOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { getBearerHeader, toSlug } from "../../utils";
import axios from "axios";
import API from "../../api";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ITable } from './Layout'

interface IBlock {
    id: number
    name: string
    display_name: string
    description: string | null
    schema_size?: string
}

interface IManager {
    id: string
    email: string
    first_name: string
    last_name: string
}

export default function () {
    const { block_id } = useParams()

    const [block, setBlock] = useState<IBlock>()
    const [managers, setManagers] = useState<Array<IManager>>()

    const { tables, folders } = useOutletContext<{ tables: Array<ITable>; folders: Array<string> }>()
    const navigate = useNavigate()

    useEffect(() => {
        if (block_id)
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Get(block_id), config)
            }).then(res => {
                if (res.data) {
                    const { block, schema_size, managers } = res.data

                    if (block) {
                        setBlock({
                            id: block.id,
                            name: block.name,
                            display_name: block.display_name,
                            description: block.description,
                            schema_size: schema_size
                        })
                    }

                    if (managers) {
                        const mappedManagers = managers.map((manager: any) => ({
                            id: manager.id,
                            email: manager.email,
                            first_name: manager.first_name,
                            last_name: manager.last_name
                        }))

                        setManagers(mappedManagers)
                    }
                }
            })
    }, [block_id])

    return <Layout >
        <Layout.Content
            style={{
                minHeight: 280,
            }}
        >
            {block && managers ?
                <>
                    <Descriptions title={block.display_name} column={2} style={{
                        backgroundColor: "white",
                        padding: 24
                    }}>
                        <Descriptions.Item label="Mã tập dữ liệu"><Typography.Text mark copyable>{block.name}</Typography.Text></Descriptions.Item>
                        <Descriptions.Item label="Người quản lý">
                            <Space>
                                {managers && managers.map(manager => {
                                    return <Link key={manager.id} to={`/users/${manager}`}>
                                        {manager.first_name + " " + manager.last_name}
                                    </Link >
                                })}
                            </Space>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả">{block.description}</Descriptions.Item>
                    </Descriptions>

                    <div style={{ margin: 24 }}>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Số bảng dữ liệu"
                                        value={tables.length}
                                        prefix={<TableOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Số lượng thư mục"
                                        value={folders.length}
                                        prefix={<FolderOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Số tiêu chí"
                                        value={9}
                                        prefix={<OrderedListOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Dung lượng"
                                        value={block.schema_size ? block.schema_size : "0 kB"}
                                    />
                                </Card>
                            </Col>
                        </Row>

                        <Card title="Bảng dữ liệu" style={{ marginTop: 24 }}>
                            {tables.length > 0 ? tables.map(table => {
                                return <Card.Grid
                                    key={table.id}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate("tables/" + table.id)}
                                >
                                    <Card.Meta
                                        avatar={<Avatar size={"large"}
                                            style={{ backgroundColor: '#87d068' }}
                                            icon={<TableOutlined />} />}
                                        title={table.display_name}
                                        description={<Tag color="#108ee9">{table.name}</Tag>}
                                    />
                                </Card.Grid>
                            }) : <Empty />}
                        </Card>

                        <Card title="Thư mục" style={{ marginTop: 24 }}>
                            {
                                folders.length > 0 ? folders.map(folder => {
                                    const folder_name = folder.split("/").filter(Boolean).pop()
                                    return <Card.Grid key={folder} style={{ cursor: "pointer" }}>
                                        <Card.Meta
                                            avatar={<Avatar size={"large"}
                                                style={{ backgroundColor: '#87d068' }}
                                                icon={<FolderOutlined />} />}
                                            title={folder_name}
                                        />
                                    </Card.Grid>
                                }) : <Empty />
                            }
                        </Card>
                    </div>
                </> :
                <Card style={{ margin: 24 }}>
                    <Skeleton active />
                </Card>
            }
        </Layout.Content>
    </Layout>

}