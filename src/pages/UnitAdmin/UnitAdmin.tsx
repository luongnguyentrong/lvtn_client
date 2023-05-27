import React from 'react';
import { Descriptions, Layout, Space, Typography } from 'antd';
const { Content } = Layout;
import './Unitadmin.css';
import BlockCard from './Cards/BlockCard';
import AnalyzeCard from '../UnitNormal/Cards/AnalyzeCard';

const UnitAdmin = () => {
    return (
        <Content style={{ width: '100%', height: '1000px' }}>
            <Descriptions column={2} title="Phòng của Khoa" style={{
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
                <Descriptions.Item label="Link superset">
                    <Typography.Link copyable>https://pck.superset.ducluong.monster</Typography.Link>
                </Descriptions.Item>

                <Descriptions.Item label="Mô tả">empty</Descriptions.Item>
            </Descriptions>

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