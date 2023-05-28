import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { IOption } from './index'

const renderTitle = (title: string) => (
    <span>
        {title}
        <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
            more
        </a>
    </span>
);

const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
                <UserOutlined /> {count}
            </span>
        </div>
    ),
});

const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
];

interface IProps {
    options?: Array<IOption>
}

export default function (props: IProps) {
    return (
        <AutoComplete
            // options={props.options}
        >
            <Input.Search style={{ width: 400 }} size='middle' placeholder='Nhập tên tập dữ liệu...' />
        </AutoComplete>
    );
};