import { Descriptions, Typography } from "antd"

export default function () {
    return <Descriptions column={2} title="Đại học Bách Khoa" style={{
        backgroundColor: "white",
        padding: 24
    }}>
        <Descriptions.Item label="Mã đơn vị">
            <Typography.Text mark copyable>master</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Người quản lý">
            <Typography.Link href='/users/1'>Lương Nguyễn</Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item label="Link truy cập">
            <Typography.Link copyable>https://ducluong.monster</Typography.Link>
        </Descriptions.Item>

        <Descriptions.Item label="Mô tả">empty</Descriptions.Item>
    </Descriptions>
}