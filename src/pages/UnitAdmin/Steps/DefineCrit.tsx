import { Button, List, Typography } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import AddCritModal from "../Modals/AddCritModal";
import { useState } from "react";

interface IProps {
    criteria: Array<string>
    addCrit: (crit: string) => void
}

export default function (props: IProps) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return <>
        <List
            header={<Typography.Title level={4}>Tiêu chí</Typography.Title>}
            footer={<Button icon={<PlusOutlined />} onClick={handleOpen}>Thêm tiêu chí</Button>}
            bordered
            style={{
                textAlign: "left"
            }}
            dataSource={props.criteria}
            renderItem={(item, idx) => (
                <List.Item>
                    <Typography.Text mark>[{idx}]</Typography.Text> {item}
                </List.Item>
            )}
        />

        <AddCritModal addCrit={props.addCrit} open={open} close={handleClose} />
    </>
}