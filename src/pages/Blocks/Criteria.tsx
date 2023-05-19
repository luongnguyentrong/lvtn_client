import { Avatar, Button, Card, Collapse, Divider, Empty, Layout, List } from "antd";
import { BookOutlined, FilePdfFilled, PlusOutlined, LineChartOutlined } from '@ant-design/icons';
import AddCriteriaModal from "./Modals/AddCriteriaModal";
import AddCritModal from "../../modals/AddCritModal";
import { useState } from "react";
import AddSource from "./Modals/AddSource";

const data = [
    {
        title: 'Tiêu chí #1',
        description: 'Trường đại học có sử dụng chương trình chi tiết',
        attachments: [
            {
                icon: <FilePdfFilled />,
                name: "Các phản hồi của các tổ chức, sinh viên"
            },
            {
                icon: <LineChartOutlined />,
                name: "Danh sách sinh viên thực hiện các đề tài khác nhau"
            },
            {
                icon: <BookOutlined />,
                name: "HK223 Đồ án chuyên ngành, LVTN"
            }
        ]
    },
    {
        title: 'Tiêu chí #2',
        description: 'Chương trình chi tiết nêu rõ kết quả học tập mong đợi và cách thức đạt được kết quả học tập mong đợi'
    },
    {
        title: 'Tiêu chí #3',
        description: 'Chương trình chi tiết cung cấp nhiều thông tin, được phổ biến và có sẵn cho các bên liên quan.'
    },
    {
        title: 'Tiêu chí #4',
        description: 'Trường đại học có sử dụng chương trình chi tiết'
    },
];


export default function () {
    const [open, setOpen] = useState(false)
    const [openSource, setOpenSource] = useState(false)

    const openModal = () => {
        setOpen(true)
    }

    const openSourceModal = () => {
        setOpenSource(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const closeSourceModal = () => {
        setOpenSource(false)
    }

    const addCriteria = (crit: string) => {

    }

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        <Card title="Tiêu chí" extra={<Button icon={<PlusOutlined />} onClick={openModal}>Thêm tiêu chí</Button>}>
            <Collapse>
                {data.map((item, idx) => {
                    return <Collapse.Panel key={idx} header={item.title + ": " + item.description}>
                        <Button icon={<PlusOutlined />} onClick={openSourceModal}>Thêm dẫn chứng</Button>
                        <Divider />

                        {item.attachments ? <List
                            itemLayout="horizontal"
                            dataSource={item.attachments}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar icon={item.icon} style={{ backgroundColor: "#f56a00" }} />}
                                        title={<a href="https://ant.design">{item.name}</a>}
                                    />
                                </List.Item>

                            )}
                        /> : <Empty />}

                    </Collapse.Panel>
                })}
            </Collapse>
        </Card>

        <AddCritModal open={open} close={closeModal} addCrit={addCriteria} />
        <AddSource open={openSource} close={closeSourceModal} />
    </Layout.Content >
}

