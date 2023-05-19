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

interface IProps {
    title?: string
}

export default function (props: IProps) {
    return <Space color='#e6f4ff' direction='vertical' style={OutlineStyles}>
        <Spin size='large' tip={props.title ? props.title : "Loading"} indicator={antIcon} />
    </Space>
}
