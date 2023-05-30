import React, { useEffect, useState } from 'react';
import { Badge, Descriptions, Layout, Space, Typography } from 'antd';
const { Content } = Layout;
import './Unitadmin.css';
import BlockCard from './Cards/BlockCard';
import AnalyzeCard from '../UnitNormal/Cards/AnalyzeCard';
import axios from 'axios';
import UnitDescriptions from './UnitDescriptions';

const UnitAdmin = () => {
    return (
        <Content style={{ width: '100%', height: '1000px' }}>
            <UnitDescriptions />

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