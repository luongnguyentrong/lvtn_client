import { Avatar, Button, Card, Empty, Spin } from "antd"
import { PlusOutlined, BarChartOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import API, { BASE_URL } from "../../../api";
import { getBearerHeader, getUnit } from "../../../utils";

interface IProps {
    showModal: () => void
}

interface IDashboard {
    key: string
    dashboard_title: string
    url: string
}

function generateDashboards(dashboards: Array<IDashboard>) {
    return dashboards.map(item => {
        return <Card.Grid key={item.key}>
            <a href={item.url} target="_blank">
                <Card.Meta avatar={<Avatar size={"large"} style={{ backgroundColor: '#87d068' }} icon={<BarChartOutlined />} />} title={item.dashboard_title} />
            </a>
        </Card.Grid>
    })
}

export default function (props: IProps) {
    const [dashboards, setDashboard] = useState<Array<IDashboard> | undefined>()

    const cur_unit = getUnit()

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Dashboards.List, config)
        }).then(res => {
            const items = res.data.map((raw: any) => {
                const item: IDashboard = {
                    key: raw.id,
                    dashboard_title: raw.dashboard_title,
                    url: `https://${cur_unit}.superset.${BASE_URL}/superset/dashboard/${raw.id}`
                }

                return item
            })

            setDashboard(items)
        })
    }, [])

    return <Card title="Phân tích" style={{ minHeight: 300 }}>
        {dashboards === undefined ? <Spin /> : generateDashboards(dashboards)}
    </Card>
}