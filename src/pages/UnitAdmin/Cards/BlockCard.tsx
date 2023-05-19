import { Avatar, Button, Card, Empty, Popconfirm, Space, Typography } from "antd"
import { PlusOutlined, LoadingOutlined, EditOutlined, DeleteOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom"
import AddBlockModal from "../Modals/AddBlockModal";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import API from "../../../api";
import { getBearerHeader } from "../../../utils";
import EditBlockModal from "../Modals/EditBlockModal";
import Loading from "../../Loading";

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

export interface IBlock {
    id: number
    name: string
    display_name: string
    description: string
    manager: string
}


export default function () {
    const [openModal, setOpenModal] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [blocks, setBlocks] = useState<Array<IBlock> | undefined>()
    const [curBlock, setCurBlock] = useState<IBlock | undefined>()

    const close = () => {
        setOpenModal(false)
    }

    const navigate = useNavigate()

    const showModal = () => {
        setOpenModal(true)
    }

    const showEdit = (current_block: IBlock) => {
        setCurBlock(current_block)
        setOpenEdit(true)
    }

    const closeEdit = () => {
        setOpenEdit(false)
    }

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Blocks.List, config)
        }).then(res => {
            if (res.data)
                setBlocks(res.data)
        })
    }, [])

    const handleDelete = (block_name: string) => {
        setConfirmLoading(true);

        setTimeout(() => {
            if (blocks) {
                const new_blocks = blocks.filter(block => block.name != block_name)

                setBlocks(new_blocks)
                setConfirmLoading(false);
            }
        }, 2000);
    }

    const GenerateCards = (props: { blocks: Array<IBlock> }) => {
        if (props.blocks === undefined || props.blocks.length === 0)
            return <Empty />

        return <Space size={"middle"} wrap>
            {props.blocks.map(block => {
                return <Card
                    key={block.name}
                    actions={[
                        <EditOutlined key="edit" onClick={() => {
                            showEdit(block)
                        }} />,

                        <Popconfirm
                            title="Xóa tập dữ liệu"
                            description="Bạn có muốn xóa tập dữ liệu này?"
                            onConfirm={() => handleDelete(block.name)}
                            okText="Xoá"
                            cancelText="Hủy"
                            okButtonProps={{ loading: confirmLoading }}
                        >
                            <DeleteOutlined key="ellipsis" />,
                        </Popconfirm>
                    ]}
                    style={{
                        minWidth: 300,
                    }}
                >
                    <Card.Meta
                        avatar={<Avatar style={{ backgroundColor: '#2A2F4F' }} icon={<DatabaseOutlined />} />}
                        title={<Typography>
                            <Link to={"/blocks/" + block.id}>
                                <Typography.Title level={5} style={{ marginBottom: 0 }}>{block.display_name}</Typography.Title>
                            </Link>
                            <Typography.Text type="secondary">Lương</Typography.Text>
                        </Typography>}
                        description={<Typography.Text>{block.description}&#x200b;</Typography.Text>}
                    />
                </Card>
            })} </Space>
    }

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
                    blocks !== undefined ? <GenerateCards blocks={blocks} /> : <Loading title="Đang lấy dữ liệu" />
                }
            </Card >

            <EditBlockModal initials={curBlock} isModalOpen={openEdit} close={closeEdit} />
            <AddBlockModal isModalOpen={openModal} close={close} />
        </>
    )
}