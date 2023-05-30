import React, { useEffect, useState } from 'react';
import { Badge, Descriptions, Layout, Space, Typography } from 'antd';
const { Content } = Layout;
import './UnitUser.css';
import BlockCard from './Cards copy/BlockCard';
import AnalyzeCard from '../UnitNormal/Cards/AnalyzeCard';
import axios from 'axios';
import { PresetStatusColorType } from 'antd/es/_util/colors';
import UserDescriptions from './UserDescriptions';

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
           {/* <UserDescriptions/> */}
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