import { Button, Divider, Empty, Layout, Steps, Typography, message, theme } from "antd"
import { useEffect, useState } from "react";
import DefineData from "./Steps/DefineData";
import AssignDataEntry from "./Steps/AssignDataEntry";
import { useLocation, useNavigate } from "react-router-dom";
import ProvisionBlock from "./Steps/ProvisionBlock";
import DefineCrit from "./Steps/DefineCrit";

export interface ITable {
    id: string
    type: "table"
    name: string
    display_name: string
    description: string
    data_entry: Array<string>
    columns: Array<{
        id: string
        name: string
        column_type: string,
        display_name: string
    }>
}

export interface IFolder {
    id: string
    type: "folder",
    name: string
    display_name: string
    data_entry: Array<string>
}

export interface IBlock {
    name: string
    display_name: string
    description: string
    criteria: Array<string>
    items: Array<ITable | IFolder>
}

export default function () {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const location = useLocation()
    const [blockData, setBlockData] = useState<IBlock | undefined>()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.state && location.state.block) {
            const new_block: IBlock = location.state.block.block

            new_block.items = []
            new_block.criteria = []

            setBlockData(new_block)
        } else {
            navigate("/")
        }
    }, [])

    const onDefineSuccess = (data: any) => {
        if (blockData !== undefined) {
            setBlockData({
                ...blockData,
                items: [
                    ...blockData.items,
                    data
                ]
            })
        }
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const addCrit = (crit: string) => {
        if (blockData)
            setBlockData({
                ...blockData,
                criteria: [
                    ...blockData.criteria,
                    crit
                ]
            })
    }

    const addDataEntry = (data_entry: Array<string>, item_id: string) => {
        if (blockData) {
            const new_block = {
                ...blockData,
                items: [
                    ...blockData.items
                ]
            }

            for (let i = 0; i < new_block.items.length; i++) {
                if (new_block.items[i].id === item_id)
                    new_block.items[i].data_entry = data_entry
            }

            setBlockData(new_block)
        }
    }


    const items = [
        {
            title: 'Định nghĩa dữ liệu',
            content: <DefineData onDefineSuccess={onDefineSuccess} items={blockData === undefined ? [] : blockData.items} />,
        },
        {
            title: "Nhập yêu cầu dữ liệu đầu ra",
            content: <DefineCrit criteria={blockData ? blockData.criteria : []} addCrit={addCrit} />
        },
        {
            title: "Gán người nhập",
            content: <AssignDataEntry addDataEntry={addDataEntry} items={blockData ? blockData.items : []} />
        },
        {
            title: 'Khởi tạo dữ liệu',
            content: <ProvisionBlock block={blockData} />,
        },
    ];


    return <Layout.Content style={{ padding: '16px 50px' }}>
        <div style={{ padding: 24, minHeight: 500, background: "white" }}>
            <Typography.Title level={4}>Tạo tập dữ liệu mới</Typography.Title>
            <Typography.Text code strong style={{ fontSize: 16 }}>{blockData && blockData.name}</Typography.Text>
            <Divider />

            <Steps current={current} items={items} />
            <Layout.Content style={contentStyle}>
                {items[current].content}
            </Layout.Content>

            <div style={{ marginTop: 24 }}>
                {current < items.length - 2 && (
                    <Button type="primary" onClick={() => next()}>
                        Tiếp theo
                    </Button>
                )}
                {current === items.length - 2 && (
                    <Button type="primary" onClick={() => next()}>
                        Tạo
                    </Button>
                )}
                {current > 0 && current < items.length - 1 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Quay lại
                    </Button>
                )}
            </div>
        </div>
    </Layout.Content >
}