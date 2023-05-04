import { TableColumnsType, Typography, Table, Tooltip, Space, Avatar, Button } from 'antd'
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import type { IUnit } from './Units'
import { Link } from 'react-router-dom';

export default function (props: { units: Array<IUnit> }) {
    const columns: TableColumnsType<IUnit> = [
        {
            title: 'Tên đơn vị',
            dataIndex: 'display_name',
            key: 'display_name',
            render: (text: string, record: any) => {
                return <a href={`https://${record.url}`} target="_blank">{text}</a>
            },
        },
        {
            title: 'Mô tả',
            width: 300,
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => {
                return <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                    {description}
                </Typography.Paragraph>
            }
        },
        {
            title: 'Người quản lý',
            dataIndex: 'address',
            key: 'manager',
        },
        {
            title: 'Người tạo',
            dataIndex: ["created_by", "username"],
            key: 'creator',
            render: (username: string) => {
                return <Space>
                    <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/323455858_1672322863162786_3713949282425593143_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Fnevu6BcCe8AX-Zsjzq&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfB7COif51-Wr_9CNhT9ouxWk11r7zf5Eqk3SmIhFLTy3w&oe=64550DA0" />
                    <Typography.Text>{username}</Typography.Text>
                </Space>
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: () => (
                <Space >
                    <Tooltip title="Chỉnh sửa thông tin đơn vị">
                        <Button icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Xoá đơn vị">
                        <Button icon={<DeleteFilled />} />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const tableData = props.units.map((data, i) => ({
        key: i,
        ...data
    }))

    return <Table columns={columns} dataSource={tableData} />;

}