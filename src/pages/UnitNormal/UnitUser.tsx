import React, { useEffect, useState } from 'react';
import { Badge, Descriptions, Layout, Space, Typography } from 'antd';
const { Content } = Layout;
import './UnitUser.css';
import BlockCard from './Cards copy/BlockCard';
import AnalyzeCard from '../UnitNormal/Cards/AnalyzeCard';
import axios from 'axios';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import AdminDescriptions from '../Admin/AdminDescriptions';

const UnitAdmin = () => {
    const [superset, setSuperset] = useState<{
        state: PresetStatusColorType
        label: string
    }>({
        state: "success",
        label: "Đang chạy"
    })

    return (
        <Content style={{ width: '100%', height: '1000px' }}>
            {/* <Descriptions column={2} title="Phòng của Lương" style={{
                backgroundColor: "white",
                padding: 24
            }}>
                <Descriptions.Item label="Mã đơn vị">
                    <Typography.Text mark copyable>pck</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Người quản lý">
                    <Typography.Link href='/users/1'>Khoa Nguyễn</Typography.Link>
                </Descriptions.Item>
                <Descriptions.Item label="Link truy cập">
                    <Typography.Link copyable>https://pck.ducluong.monster</Typography.Link>
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái của superset">
                    <Badge status={superset.state} text={superset.label} />
                </Descriptions.Item>

                <Descriptions.Item label="Mô tả">empty</Descriptions.Item>
            </Descriptions> */}
            <AdminDescriptions/>
            <Layout style={{ padding: '0 24px 24px', marginTop: 20 }}>
                <Space direction='vertical' size={'middle'}>
                    <BlockCard />

                    <AnalyzeCard showModal={() => { }} />
                </Space>
            </Layout>
        </Content>

    )
};
export default UnitAdmin;