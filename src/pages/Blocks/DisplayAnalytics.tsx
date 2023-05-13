import { Layout } from "antd"
import AnalyzeCard from "../UnitNormal/Cards/AnalyzeCard"

export default function () {
    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}>
        <AnalyzeCard showModal={() => { }} />
    </Layout.Content>

}