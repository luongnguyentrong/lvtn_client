import React, { useState } from 'react';
import { Modal, FormInstance, Form, Input } from 'antd';

import { IFolder } from '../NewBlock'

interface IProps {
    isOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    form: FormInstance<any>
}

const DefineFolder: React.FC<IProps> = (props: IProps) => {
    return (
        <Modal title="Tạo folder mới" open={props.isOpen} onOk={props.handleOk} onCancel={props.handleCancel}>
            <Form
                name="basic"
                form={props.form}
                layout='vertical'
                autoComplete="off"
            >
                <Form.Item
                    label="Tên thư mục"
                    name="display_name"
                    rules={[{ required: true, message: 'Hãy điền tên thư mục!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mã thư mục"
                    name="name"
                    rules={[{ required: true, message: 'Hãy điền mã thư mục!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default DefineFolder;