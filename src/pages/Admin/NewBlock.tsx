import { Button, Divider, Empty, Layout, Steps, Typography, message, theme } from "antd"
import { useState } from "react";
import Define from "./Steps/Define";
import DefineData from "./Steps/DefineData";

export default function () {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

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
            title: 'Thông tin chung',
            content: <Define />,
        },
        {
            title: 'Định nghĩa dữ liệu',
            content: <DefineData />,
        },
        {
            title: 'Last',
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