import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Space } from 'antd';

const antIcon = <LoadingOutlined size={36} spin />;

const OutlineStyles = {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
}

const App: React.FC = () => <Space color='#e6f4ff' direction='vertical' style={OutlineStyles}><Spin size='large' tip="Loading" indicator={antIcon} /></Space>;

export default App;