import React from 'react';
import { Layout, Space } from 'antd';
const { Content } = Layout;
import './Unitadmin.css';
import BlockCard from './Cards/BlockCard';
import AnalyzeCard from '../UnitNormal/Cards/AnalyzeCard';

const UnitAdmin = () => {
    return (
        <Content style={{ width: '100%', height: '1000px', margin: '20px 0px' }}>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Space direction='vertical' size={'middle'}>
                    <BlockCard />

                    <AnalyzeCard showModal={() => { }} />
                </Space>
            </Layout>
        </Content>

    )
};
export default UnitAdmin;