import { Button, Divider, Empty, Layout, Steps, Typography, message, theme } from "antd"
import { useEffect, useState } from "react";
import DefineData from "./Steps/DefineData";
import { useLocation } from "react-router-dom";

export interface ITable {
    id: string
    type: "table"
    name: string
    description: string
    columns: Array<{
        id: string
        name: string
        data_type: string,
        description: string
    }>
}

export interface IFolder {
    type: "folder",
    name: "string"
}

interface IBlock {
    name: string
    description: string
    items: Array<ITable | IFolder>
}

export default function () {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const location = useLocation()
    const [blockData, setBlockData] = useState<IBlock | undefined>()

    useEffect(() => {
        if (location.state.block) {
            setBlockData(location.state.block)
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

    const items = [
        {
            title: 'Định nghĩa dữ liệu',
            content: <DefineData onDefineSuccess={onDefineSuccess} items={blockData === undefined ? [] : blockData.items} />,
        },
        {
            title: 'Khởi tạo dữ liệu',
            content: 'Last-content',
        },
    ];


    return <Layout.Content style={{ padding: '16px 50px' }}>
        <div style={{ padding: 24, minHeight: 500, background: "white" }}>
            <Typography.Title level={4}>Tạo tập dữ liệu mới</Typography.Title>
            <Divider />

            <Steps current={current} items={items} />
            <Layout.Content style={contentStyle}>
                {items[current].content}
            </Layout.Content>

            <div style={{ marginTop: 24 }}>
                {current < items.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === items.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    </Layout.Content >
}