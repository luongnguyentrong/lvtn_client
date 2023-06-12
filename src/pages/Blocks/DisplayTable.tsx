import { Card, Layout, Space, Button, Upload, message, Skeleton, Descriptions, Typography, Popconfirm } from "antd"
import { UploadOutlined, TableOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

interface ITable {
    id: string
    name: string
    display_name: string
    description: string
}


export default function () {
    const { block_id, table_id } = useParams()
    const [columns, setColumns] = useState<TableRow[]>([]);
    const [tableData, setTableData] = useState<Array<any>>([])
    const [table, setTable] = useState<ITable>()
    const [config, setConfig] = useState<any>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [uploadLoading, setUploadLoading] = useState(false)

    const fetch_data = () => {
        if (table_id && block_id) {
            setLoading(true)

            getBearerHeader().then(config => {
                return axios.get(API.Blocks.Tables.GET(block_id, table_id), config)
            }).then(res => {
                let { columns, data, table } = res.data

                if (columns && data && table) {
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
                    setTable(table)

                    setLoading(false)
                }
            }).catch(err => {
                message.error(err)
                setLoading(false)
            })

        }
    }

    useEffect(() => {
        fetch_data()
    }, [table_id])

    const excelColumns: IExcelColumn[] = columns.map(column => ({
        title: column.dataIndex,
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

    // set upload headers
    useEffect(() => {
        getBearerHeader().then(bearerConfig => setConfig(bearerConfig))
    }, [])

    return loading || table === undefined ?
        <Card style={{ minHeight: 250, margin: 24, textAlign: "center" }}>
            <Skeleton active />
        </Card>
        : <Layout.Content>
            <Descriptions title={<><TableOutlined /> {table.display_name}</>} style={{
                padding: 24,
                backgroundColor: "white"
            }}>
                <Descriptions.Item label="Mã bảng"><Typography.Text mark>{table.name}</Typography.Text></Descriptions.Item>
                <Descriptions.Item label="Mô tả">{table.description}</Descriptions.Item>
            </Descriptions>

            <Card style={
                {
                    margin: 24,
                    minHeight: 280,
                }
            } extra={<Space>
                <Upload
                    action={API.Blocks.Tables.UploadFromExcel(block_id, table_id)}
                    headers={config && config.headers}
                    accept="test/csv"
                    showUploadList={false}
                    onChange={(info) => {
                        if (info.file.status === "uploading")
                            setUploadLoading(true)
                        else if (info.file.status === "done") {
                            message.success("Upload dữ liệu thành công!")
                            setUploadLoading(false)
                            fetch_data()
                        } else if (info.file.status === "error") {
                            message.error("Upload dữ liệu thất bại!")
                            setUploadLoading(false)
                        }
                    }}
                >
                    <Button icon={<UploadOutlined />} loading={uploadLoading}>Nhập liệu từ Excel</Button>
                </Upload>

                <Button onClick={ExportExcel} icon={<DownloadOutlined />}>Tải dữ liệu</Button>

                <Popconfirm
                    title={`Xoá bảng ${table.display_name}`}
                    description="Bạn có chắc muốn xóa bảng này"
                    okText="Có"
                    cancelText="Không"
                    onConfirm={() => {
                        if (block_id && table_id)
                            getBearerHeader().then(config => {
                                return axios.delete(API.Blocks.Tables.GET(block_id, table_id), config)
                            }).then(res => {
                                if (res.status === 200) {
                                    navigate(`/blocks/${block_id}`)
                                }
                            })
                    }}
                >
                    <Button icon={<DeleteOutlined />}>Xóa bảng</Button>
                </Popconfirm>
            </Space>}>
                <DataTable data={tableData} setData={setTableData} columns={columns} />
            </Card>
        </Layout.Content>
}