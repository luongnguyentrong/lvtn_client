import { Avatar, Button, Card, Col, Empty, Popconfirm, Row, Space, Typography } from "antd"
import { PlusOutlined, LoadingOutlined, EditOutlined, DeleteOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Form, Input, InputNumber, Table,Tag,Modal  } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'center',
};

interface DataType {
    key: string;
    name: string;
    email: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      width: '400px',
      title: 'Tên đăng nhập',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
        width: '300px',
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a>{text}</a>,
      },
    {
      width:'100px',
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Disable</a>
        </Space>
      ),
    },
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      email: 'trinhducmanh71@gmail.com'
    },
    {
      key: '2',
      name: 'Jim Green',
      email: 'khoa12@gmail.com'
    },
    {
      key: '3',
      name: 'Joe Black',
      email: 'luongnguyen@gmail.com'
    },
  ];
  

export default function () {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const [openModal, setOpenModal] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const showModal = () => {
        setOpen(true);
    }


    return (
        <>
            <Card
                title="Danh sách người dùng"
                style={{
                    minHeight: 650,
                    margin: '20px 24px 0px 24px',
                }}
                extra={<Button type="primary"
                    onClick={showModal}
                    icon={<PlusOutlined />}
                >Tạo người dùng</Button>}>
               <Table columns={columns} dataSource={data} bordered pagination={false} />;
            </Card >
    
    <Modal
        open={open}
        title="Tạo người dùng"
        onCancel={handleCancel}
        footer={[
          <Button key="Hủy" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Tạo
          </Button>,
        ]}
      >
         <Form
            style={{ maxWidth: 600 }}
            layout="vertical"
        >
            <Row gutter={16}>
                <Col span={14}>
                    <Form.Item name="fname" label="Họ" rules={[{ required: true, type: "string", max: 20, message: "Hãy nhập họ!" }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={10}>
                    <Form.Item name="lname" label="Tên" rules={[{ required: true, type: "string", max: 20 }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                <Input />
            </Form.Item>
            <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Hãy xác nhận lại mật khẩu!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không giống nhau!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        </Form>

      </Modal>
        </>
    )
}