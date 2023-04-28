import { Avatar, Button, Card, Layout, Modal, Space, Tag, Typography, theme } from "antd"
import { HomeOutlined, CrownFilled, TeamOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BlockInfo from "../Modals/BlockInfo";
import { useForm } from "antd/es/form/Form";

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

export default function () {
    const { token } = theme.useToken()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalForm] = useForm()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        modalForm.validateFields().then(data => {
            data['items'] = []

            setIsModalOpen(false)
            navigate("/new", {
                state: {
                    block: data
                }
            })
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout>
            <Layout.Header style={{
                backgroundColor: token.colorBgContainer,
                height: "auto",
                paddingBottom: "16px"
            }}>
                <Layout>
                    <Layout.Content style={{
                        backgroundColor: token.colorBgContainer,
                    }}>
                        <Typography.Title level={4} style={{
                            marginTop: "16px"
                        }}>Môi trường làm việc</Typography.Title>

                        <Space size={"middle"}>
                            <Avatar
                                style={{ backgroundColor: '#0096FF' }}
                                icon={<HomeOutlined />}
                                size={48}
                            />
                            <Space.Compact direction="vertical" size={"middle"}>
                                <Typography.Title level={3} style={{ fontWeight: "normal" }} >Đại học Bách Khoa</Typography.Title>
                                <Space.Compact>
                                    <Tag color="#FF6464" style={{ fontWeight: "bold" }}>HCMUT</Tag>
                                </Space.Compact>
                            </Space.Compact>
                        </Space>
                    </Layout.Content>
                </Layout>
            </Layout.Header>

            <Layout>
                <Layout.Content style={{ margin: "16px" }}>
                    <Card title="Tập dữ liệu" extra={<Button type="primary" onClick={showModal} icon={<PlusOutlined />}>Tạo dữ liệu mới</Button>}>
                        <Card.Grid style={gridStyle} onClick={() => {
                            navigate("/blocks/1")
                        }}>
                            <Card bordered={false} style={{ boxShadow: "none", fontSize: "16px", textAlign: "left" }}>
                                <Card.Meta
                                    title={
                                        <Space>
                                            <Avatar style={{ backgroundColor: '#2A2F4F' }} icon={<TeamOutlined />} />
                                            <Typography.Title level={4}>Đội ngũ</Typography.Title>
                                        </Space>
                                    }
                                    description="Danh sách đội ngũ"
                                />
                            </Card>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                            <Card bordered={false} style={{ boxShadow: "none", fontSize: "16px", textAlign: "left" }}>
                                <Card.Meta
                                    title={
                                        <Space>
                                            <Avatar style={{ backgroundColor: '#2A2F4F' }} icon={<CrownFilled />} />
                                            <Typography.Title level={4}>Ngành đào tạo</Typography.Title>
                                        </Space>
                                    }
                                    description="Thông tin ngành đào tạo tính từ khóa k19"
                                />
                            </Card>
                        </Card.Grid>
                    </Card>
                </Layout.Content>
            </Layout>

            <BlockInfo isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalForm={modalForm} />
        </Layout>
    )
}