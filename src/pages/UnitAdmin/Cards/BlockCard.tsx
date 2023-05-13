import { Avatar, Button, Card, Empty, Space, Typography } from "antd"
import { PlusOutlined, DatabaseOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import AddBlockModal from "../Modals/AddBlockModal";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import API from "../../../api";
import { getBearerHeader } from "../../../utils";

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

interface IBlock {
    name: string
    display_name: string
    description: string
}

export default function () {
    const [openModal, setOpenModal] = useState(false)
    const [blocks, setBlocks] = useState<Array<IBlock> | undefined>()

    const close = () => {
        setOpenModal(false)
    }

    const navigate = useNavigate()

    const showModal = () => {
        setOpenModal(true)
    }

    useEffect(() => {
        axios.get(API.Blocks.List, getBearerHeader()).then(res => {
            if (res.data)
                setBlocks(res.data)
        })
    }, [])

    return (
        <>
            <Card
                title="Tập dữ liệu"
                style={{
                    minHeight: 300
                }}
                extra={<Button type="primary"
                    onClick={showModal}
                    icon={<PlusOutlined />}
                >Tạo dữ liệu mới</Button>}>

                {
                    blocks !== undefined ? blocks.map(block => {
                        return <Card.Grid key={block.name} style={gridStyle} onClick={() => {
                            navigate("blocks/" + block.name)
                        }}>
                            <Card bordered={false} style={{ boxShadow: "none", fontSize: "16px", textAlign: "left" }}>
                                <Card.Meta
                                    title={
                                        <Space>
                                            <Avatar style={{ backgroundColor: '#2A2F4F' }} icon={<DatabaseOutlined />} />
                                            <Typography.Title level={4}>{block.display_name}</Typography.Title>
                                        </Space>
                                    }
                                    description={block.description}
                                />
                            </Card>
                        </Card.Grid>
                    }) : <Empty />
                }
            </Card>

            <AddBlockModal isModalOpen={openModal} close={close} />
        </>
    )
}