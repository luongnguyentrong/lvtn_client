import { Descriptions, Skeleton, Typography } from "antd"
import { useEffect, useState } from "react"
import { getBearerHeader, getUnit } from "../../utils"
import axios from "axios"
import API from "../../api"

interface IUnit {
    realm_id: string
    created_by: string
    display_name: string
    name: string
    description: string
    url: string
    parent_name: string | null
    manager: {
        email: string
        first_name: string
        id: string
        last_name: string
        realm_id: string
        username: string
    }
}
export default function () {
    const [unit, setUnit] = useState<IUnit>()

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Units.Get(getUnit()), config)
        }).then(res => {
            if (res.status === 200) {
                setUnit(res.data)
            }
        })
    }, [])

    if (unit === undefined)
        return <Skeleton active loading={unit === undefined} style={{
            backgroundColor: "white",
            padding: 24
        }} />

    return <Descriptions column={2} title={unit?.display_name} style={{
        backgroundColor: "white",
        padding: 24
    }} >
        <Descriptions.Item label="Mã đơn vị">
            <Typography.Text mark copyable>{unit?.name}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label="Người quản lý">
            <Typography.Link href={`/users/${unit.manager.id}`}>{unit?.manager.first_name + " " + unit?.manager.last_name}</Typography.Link>
        </Descriptions.Item>
        <Descriptions.Item label="Link truy cập">
            <Typography.Link copyable>{unit.url}</Typography.Link>
        </Descriptions.Item>

        <Descriptions.Item label="Mô tả">{unit.description}</Descriptions.Item>
    </Descriptions>
}