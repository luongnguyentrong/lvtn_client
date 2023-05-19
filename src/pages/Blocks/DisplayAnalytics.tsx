import { Layout } from "antd"
import AnalyzeCard from "../UnitNormal/Cards/AnalyzeCard"
import NewDashboardModal from "../../modals/NewDashboardModal"
import { useState } from "react"

export default function () {
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}>
        <AnalyzeCard showModal={openModal} />

        <NewDashboardModal open={open} close={closeModal} />
    </Layout.Content>

}