import { Button, Card, Layout, Space, Table, TableColumnsType, Tag } from "antd"
import { PlusOutlined } from '@ant-design/icons';


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


function UserTable() {
    return <Table columns={columns} dataSource={data} />
}

export default function () {
    const handleOpen = () => {

    }

    return (
        <Layout.Content>
            <div style={{ margin: 24, minHeight: 380 }}>
                <Card title="Quản lý người dùng" extra={<Button type="primary"
                    onClick={handleOpen}
                    icon={<PlusOutlined />}>Tạo người dùng</Button>} >

                    <UserTable />
                </Card>
            </div>
        </Layout.Content >
    )
}