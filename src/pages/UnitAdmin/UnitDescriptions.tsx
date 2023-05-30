import { Badge, Descriptions, Skeleton, Typography } from "antd"
import { useEffect, useState } from "react"
import { getBearerHeader, getUnit } from "../../utils"
import axios from "axios"
import API from "../../api"
import { PresetStatusColorType, PresetStatusColorTypes } from "antd/es/_util/colors"

interface IUnit {
    id: string
    manager_id: string
    display_name: string
    name: string
    description: string
    url: string
    parent_name: string
    superset_status: string
    manager: {
        email: string
        federation_link: string
        first_name: string
        id: string
        last_name: string
        username: string
    }
}

export default function () {
    const [unit, setUnit] = useState<IUnit>()

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Units.Get(getUnit()), config)
        }).then(res => {
            setUnit(res.data)
        })
    }, [])

    let superset_status: PresetStatusColorType = "success"
    let superset_label: string = "Đang chạy"

    if (unit && unit.superset_status && unit.superset_status != superset_status) {
        superset_status = unit.superset_status as PresetStatusColorType

        if (superset_status === "processing")
            superset_label = "Đang khởi tạo"
    }

    if (unit === undefined)
        return <Skeleton active loading={unit === undefined} style={{
            backgroundColor: "white",
            padding: 24
        }} />

    return <Descriptions column={2} title={unit.display_name} style={{
        backgroundColor: "white",
        padding: 24
    }}>
        <Descriptions.Item label="Mã đơn vị">
            <Typography.Text mark copyable>{unit.name}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Người quản lý">
            <Typography.Link href={`/users/${unit.manager_id}`}>{unit.manager.first_name + " " + unit.manager.last_name}</Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item label="Link truy cập">
            <Typography.Link href={unit.url} target="_blank" copyable>{unit.url}</Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái của superset">
            <Badge status={"processing"} text={superset_label} />
        </Descriptions.Item>

        <Descriptions.Item label="Mô tả">{unit.description}</Descriptions.Item>
    </Descriptions>
}