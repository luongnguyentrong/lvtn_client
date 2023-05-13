import { Avatar, Button, Card, Empty, Spin } from "antd"
import { PlusOutlined, BarChartOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../api";
import { getBearerHeader } from "../../../utils";

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
            <a href={"http://localhost:8080" + item.url} target="_blank">
                <Card.Meta avatar={<Avatar size={"large"} style={{ backgroundColor: '#87d068' }} icon={<BarChartOutlined />} />} title={item.dashboard_title} />
            </a>
        </Card.Grid>
    })
}

export default function (props: IProps) {
    const [dashboards, setDashboard] = useState<Array<IDashboard> | undefined>()

    const items: Array<IDashboard> = [{
        key: "1",
        dashboard_title: "Phân tích điểm sinh viên",
        url: "/to_no_where", 
    }, {
        key: "2",
        dashboard_title: "Phân tích đội ngũ",
        url: "/to_no_where", 
    }]

    useEffect(() => {
        // axios.get(API.Dashboards.List, getBearerHeader()).then(res => {
        //     const items = res.data.dashboards.map((raw: any) => {
        //         const item: IDashboard = {
        //             key: raw.id,
        //             dashboard_title: raw.dashboard_title,
        //             url: raw.url
        //         }

        //         return item
        //     })

        //     setDashboard(items)
        // })

        setDashboard(items)
    }, [])

    return <Card title="Phân tích" style={{ minHeight: 300 }}
        extra={<Button type="primary"
            onClick={props.showModal}
            icon={<PlusOutlined />}
        >Tạo phân tích mới</Button>}>
        {dashboards === undefined ? <Spin /> : generateDashboards(dashboards)}

    </Card>
}