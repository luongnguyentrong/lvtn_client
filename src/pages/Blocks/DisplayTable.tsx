import { Card, Layout, Spin, TableProps, TableColumnsType, Table, Space, Button } from "antd"
import { PlusOutlined, UploadOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBearerHeader } from "../../utils";
import axios from "axios";
import API from "../../api";
import DataTable from "./DataTable";
import { Excel } from "antd-table-saveas-excel";

interface IExcelColumn {
    title: string;
    dataIndex: string;
}
interface TableRow {
    [key: string]: any;
}

function add_keys(data: Array<any>) {
    return data.map(row => {
        const primary_key = Object.keys(row)[0]

        return {
            ...row,
            key: row[primary_key],
        }
    })
}
 

const DisplayTable = () => {
    const { block_id, table_id } = useParams()
    // const [columns, setColumns] = useState<TableColumnsType<any>>()
    const [columns, setColumns] = useState<TableRow[]>([]);
    const [tableData, setTableData] = useState<Array<any>>([])

    useEffect(() => {
        if (table_id && block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.GET(block_id, table_id), config)
            }).then(res => {
                const { columns, data } = res.data

                if (columns && data) {
                    setColumns(columns.map((col: any) => {
                        if (col.column_type != 'serial')
                            col.editable = true

                        return col
                    }))

                    setTableData(add_keys(data))
                }
            })
            
        }
    }, [table_id])

    const excelColumns: IExcelColumn[] = columns.map(column => ({
        title: column.title,
        dataIndex: column.dataIndex
    }));
    const ExportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(excelColumns)
            .addDataSource(tableData, {
                str2Percent: true
            })
            .saveAs(`Export.xlsx`);
    };

    return <Layout.Content
        style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        {tableData === undefined || columns === undefined ?
            <Card style={{ minHeight: 250, paddingTop: 24, textAlign: "center" }}>
                <Spin />
            </Card>
            :
            <Card title="Danh sách sinh viên" extra={<Space>
                <Button icon={<UploadOutlined />}>Nhập liệu từ Excel</Button>
                <Button onClick={ExportExcel} icon={<DownloadOutlined />}>Tải dữ liệu</Button>
            </Space>}>
                <DataTable data={tableData} setData={setTableData} columns={columns} />
            </Card>}
    </Layout.Content>
}
export default DisplayTable