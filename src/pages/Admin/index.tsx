import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../../Header';

interface IProps {
    children: React.ReactElement;
}

const AdminLayout: React.FC<IProps> = (props: IProps) => {
    return (
        <Layout style={{ minHeight: '100%' }}>
            <Layout>
                <Header />

                <Outlet />

                <Layout.Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;