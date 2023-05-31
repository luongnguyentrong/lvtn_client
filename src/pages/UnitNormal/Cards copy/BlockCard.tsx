import { Avatar, Button, Card, Divider, Empty, Popconfirm, Space, Typography, message } from "antd"
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
    manager_ids: Array<string>
    managers: Array<{
        id: string
        email: string
        first_name: string
        last_name: string
        username: string
    }>
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

    const fetch_blocks = async () => {
        const config = await getBearerHeader()

        const res = await axios.get(API.Blocks.List, config)

        return res.data
    }

    const update_blocks = () => {
        fetch_blocks().then(blocks => {
            if (blocks)
                setBlocks(blocks)
        })
    }

    useEffect(() => {
        update_blocks()
    }, [])

    const handleDelete = (block_id: number) => {
        setConfirmLoading(true);

        getBearerHeader().then(config => {
            return axios.delete(API.Blocks.Delete(block_id), config)
        }).then(res => {
            if (res.status === 200) {
                if (blocks) {
                    const new_blocks = blocks.filter(block => block.id != block_id)

                    setBlocks(new_blocks)
                    setConfirmLoading(false);
                }
            }
        }).catch(err => {
            message.error(err.message)
            setConfirmLoading(false);
        })
    }

    const GenerateCards = (props: { blocks: Array<IBlock> }) => {
        if (props.blocks === undefined || props.blocks.length === 0)
            return <Empty />

        return <>
            {props.blocks.map(block => {
                return <Card.Grid key={block.name}>
                    <Card.Meta
                        avatar={<Avatar style={{ backgroundColor: '#2A2F4F' }} icon={<DatabaseOutlined />} />}
                        title={<Typography>
                            <Link to={"/blocks/" + block.id}>
                                <Typography.Title level={5} style={{ marginBottom: 0 }}>{block.display_name}</Typography.Title>
                            </Link>
                            <Typography.Text type="secondary">{block.managers.map(block => block.last_name).join(", ")} </Typography.Text>
                        </Typography>}
                        description={<div>
                            <Typography.Text>{block.description}&#x200b;</Typography.Text>

                        </div>}
                    />
                </Card.Grid>
            })} </>
    }

    return (
        <>
            <Card
                title="Tập dữ liệu"
                style={{
                    minHeight: 300,

                }}
                bodyStyle={blocks ?
                    {
                        display: "flex",
                        flexWrap: "wrap"
                    } : undefined
                }
>
                {
                    blocks !== undefined ? <GenerateCards blocks={blocks} /> : <Loading title="Đang lấy dữ liệu" />
                }
            </Card >

            <EditBlockModal update={update_blocks} initials={curBlock} isModalOpen={openEdit} close={closeEdit} />
            <AddBlockModal update={update_blocks} isModalOpen={openModal} close={close} />
        </>
    )
}