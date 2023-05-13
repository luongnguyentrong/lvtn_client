import { Layout } from "antd"

export default function () {
    return <Layout style={{ margin: 24 }}>
        <Layout.Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "white",
            }}
        >
            Content
        </Layout.Content>
    </Layout>

}