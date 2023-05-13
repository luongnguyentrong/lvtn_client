import { Card, Layout, Spin, TableProps, TableColumnsType, Table, Space, Button } from "antd"
import { PlusOutlined, UploadOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface DataType {
    key: React.Key;
    mssv: string;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

const columns: TableColumnsType<DataType> = [
    {
        title: "Mã số sinh viên",
        dataIndex: "mssv",
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
    },
    {
        title: 'Điểm toán',
        dataIndex: 'chinese',
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
    },
    {
        title: 'Điểm H',
        dataIndex: 'math',
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },
    {
        title: 'Điểm G',
        dataIndex: 'english',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
    {
        title: "Hành động",
        fixed: "right",
        width: 100,
        render: (_, record) => {
            return <Space> <Button icon={<EditOutlined />} /> <Button icon={<DeleteOutlined />} /></Space>
        }
    }
];

const data: DataType[] = [
    {
        key: '1',
        mssv: "1914079",
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        mssv: "1919448",
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        mssv: "1938384",
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        mssv: '2001122',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

export default function () {
    const { table_id } = useParams()
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        if (table_id) {

        }
    }, [table_id])

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        {tableData === undefined ?
            <Card style={{ minHeight: 250, paddingTop: 24, textAlign: "center" }}>
                <Spin />
            </Card>
            :
            <Card title="Danh sách sinh viên" extra={<Space>
                <Button icon={<PlusOutlined />}>Thêm mới</Button>
                <Button icon={<UploadOutlined />}>Nhập liệu từ Excel</Button>
                <Button icon={<DownloadOutlined />}>Tải dữ liệu</Button>
            </Space>}>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </Card>}
    </Layout.Content>
}