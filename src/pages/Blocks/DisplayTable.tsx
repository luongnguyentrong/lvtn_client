import { Card, Layout, Spin, TableProps, TableColumnsType, Table, Space, Button, Upload, message } from "antd"
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

import dayjs from 'dayjs';

function add_keys(data: Array<any>, primary_key: string) {
    return data.map(row => {
        return {
            ...row,
            key: row[primary_key],
        }
    })
}
 

function transform_date(data: { [k: string]: string }, dataIndex: string) {
    const dateString = data[dataIndex];
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    });

    data[dataIndex] = formattedDate

    return data
}

export default function () {
    const { block_id, table_id } = useParams()
    // const [columns, setColumns] = useState<TableColumnsType<any>>()
    const [columns, setColumns] = useState<TableRow[]>([]);
    const [tableData, setTableData] = useState<Array<any>>([])
    const [config, setConfig] = useState<any>()

    useEffect(() => {
        if (table_id && block_id) {
            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.GET(block_id, table_id), config)
            }).then(res => {
                let { columns, data } = res.data

                if (columns && data) {
                    columns.forEach((col: any) => {
                        if (col.column_type != 'serial')
                            col.editable = true

                        if (col.is_primary) {
                            data = add_keys(data, col.dataIndex)
                        }

                        if (col.column_type === "date") {
                            data = data.map((row: any) => {
                                return transform_date(row, col.dataIndex)
                            })
                        }
                    });

                    setColumns(columns)
                    setTableData(data)
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

    useEffect(() => {
        getBearerHeader().then(bearerConfig => setConfig(bearerConfig))
    }, [])

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
                <Upload action={API.Blocks.Tables.UploadFromExcel(block_id, table_id)} headers={config && config.headers} accept="test/csv" beforeUpload={(file) => {
                    if (file.type !== 'text/csv' && file.type !== 'text/xlsx') {
                        message.error(`${file.name} không hợp lệ`);
                        return Upload.LIST_IGNORE
                    }

                    return true
                }}>
                    <Button icon={<UploadOutlined />}>Nhập liệu từ Excel</Button>
                </Upload>

                <Button onClick={ExportExcel} icon={<DownloadOutlined />}>Tải dữ liệu</Button>
                <Button icon={<DeleteOutlined />}>Xóa bảng</Button>
            </Space>}>
                <DataTable data={tableData} setData={setTableData} columns={columns} />
            </Card>}
    </Layout.Content>
}