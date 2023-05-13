import { Button, Card, Layout, Space, Table, TableColumnsType } from "antd"
import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useState } from "react";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Tên',
        dataIndex: 'name',
        render: (data) => {
            return <span><FilePdfOutlined /> {data}</span>
        }
    },
    {
        title: 'Người sở hữu',
        dataIndex: 'age',
    },
    {
        title: 'Kích cỡ tệp',
        dataIndex: 'address',
    },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export default function () {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);


    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}>
        <Card title="Thư mục Vật lý 1" extra={<Space>
            <Button icon={<UploadOutlined />}>Tải tệp lên</Button>
        </Space>}>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />

        </Card >
    </Layout.Content >
}