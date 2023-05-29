
import { Button, Col, Descriptions, Divider, Form, Input, Modal, Row, Steps, message } from "antd"
import { IUnitRequest } from "../Requests"

interface IProps {
    open: boolean
    close: () => void
    unit: IUnitRequest | undefined
}


export default function (props: IProps) {
    return <Modal title="Yêu cầu cấp đơn vị" style={{ minWidth: 800 }} open={props.open} footer={null} onCancel={props.close}>
        <Divider />
        {
            props.unit && <>
                <Descriptions title="Thông tin" column={2}>
                    <Descriptions.Item label="Tên đơn vị">{props.unit.display_name}</Descriptions.Item>
                    <Descriptions.Item label="Mã đơn vị">{props.unit.name}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả">{props.unit.description}</Descriptions.Item>
                </Descriptions>

                <Divider />

                <Descriptions title="Người quản lý" column={2}>
                    <Descriptions.Item label="Họ">{props.unit.manager.fname}</Descriptions.Item>
                    <Descriptions.Item label="Tên">{props.unit.manager.lname}</Descriptions.Item>
                    <Descriptions.Item label="Email">{props.unit.manager.email}</Descriptions.Item>
                    <Descriptions.Item label="Username">{props.unit.manager.username}</Descriptions.Item>
                </Descriptions>
            </>
        }
    </Modal>
}