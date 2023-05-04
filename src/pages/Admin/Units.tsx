import { Button, Card, Layout, Spin, Tabs } from "antd"
import { useEffect, useState } from "react";
import type { TabsProps } from 'antd'
import { getBearerHeader } from "../../utils";
import { ApartmentOutlined, TableOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import AddUnit from "./Modals/AddUnit";
import OrgChart from "./OrgChart";
import UnitTable from "./UnitTable";
import API from "../../api";
export interface IUnit {
    realm_id: string
    created_by: {
        id: string
        first_name: string
        last_name: string
        username: string
    }
    display_name: string
    name: string
    description: string
    url: string
}

export default function () {
    const [openAddUser, setOpenAddUser] = useState(false)
    const [units, setUnits] = useState<Array<IUnit> | undefined>()

    const handleClose = () => {
        setOpenAddUser(false)
    }

    const handleOpen = () => {
        setOpenAddUser(true)
    }

    useEffect(() => {
        axios.get(API.ListUnits.URL, getBearerHeader()).then(res => {
            setUnits(res.data)
        })
    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <span>
                <ApartmentOutlined />
                Sơ đồ tổ chức
            </span>,
            children: <OrgChart />,
        },
        {
            key: '2',
            label: <span>
                <TableOutlined />
                Tổng quát
            </span>,
            children:
                units === undefined ?
                    <div style={{
                        paddingTop: "20px",
                        minHeight: '200px',
                        textAlign: 'center'
                    }}>
                        <Spin />
                    </div> : <UnitTable units={units} />
            ,
        },
    ];

    return <Layout.Content>
        <div style={{ margin: 24, minHeight: 380 }}>
            <Card title="Đại học Bách Khoa" extra={<Button type="primary"
                onClick={handleOpen}
                icon={<PlusOutlined />}
            >Tạo đơn vị</Button>}>
                <Tabs defaultActiveKey="1" items={items} />
            </Card>
        </div>

        <AddUnit open={openAddUser} close={handleClose} />
    </Layout.Content >
}