import { Avatar, Button, Card, Layout, List } from "antd";
import { CheckSquareOutlined, PlusOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Tiêu chí #1',
        description: 'Trường đại học có sử dụng chương trình chi tiết'
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
    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        <Card title="Tiêu chí" extra={<Button icon={<PlusOutlined />}>Thêm tiêu chí</Button>}>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar icon={<CheckSquareOutlined />} style={{ backgroundColor: "#f56a00" }} />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Card>
    </Layout.Content>
}