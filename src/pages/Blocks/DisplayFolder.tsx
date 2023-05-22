import { Button, Card, Layout, Space, Table, TableColumnsType } from "antd"
import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";

interface DataType {
    key: React.Key;
    name: string;
    size: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Tên',
        dataIndex: 'name',
        render: (data) => {
            return <span><FilePdfOutlined />{data}</span>
        }
    },
    {
        title: 'Kích cỡ tệp',
        dataIndex: 'size',
    },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        size: `London, Park Lane no. ${i}`,
    });
}

export default function () {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [listTable,setListTable] = useState<DataType[]>([]);
    const { block_id, folder_name } = useParams()

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

    useEffect(() => {
        if (block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Folders.List(block_id) + folder_name, config)
            }).then(res => {
                let i = 0
                const data1: DataType[] = [];
                console.log(res.data)
                res.data.items.forEach((folder1:{name:string, size: string}) => {
                    let newData: DataType = {key: 0,name: "", size: ""}
                    newData.key = i
                    newData.name = folder1.name
                    newData.size = folder1.size
                    data1.push(newData)
                    i = i + 1
                });
                setListTable(data1)
            })
        }
    }, [folder_name])

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

            <Table rowSelection={rowSelection} columns={columns} dataSource={listTable} />

        </Card >
    </Layout.Content >
}