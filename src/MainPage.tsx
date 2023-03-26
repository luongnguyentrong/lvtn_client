// import React from 'react';
// import { Layout, Row, Col } from 'antd';
// import 'antd/dist/reset.css';
// const { Header, Footer, Content, Sider } = Layout;
// import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown } from 'antd';
// import type { MenuProps } from 'antd';
// import { BellOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import './index.css';
// const { Search } = Input;
// const onSearch = (value: string) => console.log(value);
// import 'reactjs-popup/dist/index.css';
// import { useState, useEffect } from "react";
// import { Modal } from 'antd';
// import CreateTable from './Create-table/CreateTable';
// import TableList from './tablelist/tablelist';

// const Main = () => {

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const items: MenuProps['items'] = [
//     {
//       key: '1',
//       label: (
//        <div>uploadfile</div>
//       ),
//     },
//     {
//       key: '2',
//       label: (
//         <div>Tạo văn bản</div>
//       ),
//     },
//     {
//       key: '3',
//       label: (
//         <>
//       <Button onClick={showModal}>
//         Tạo bảng dữ liệu
//       </Button>
//       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//         <CreateTable />
//       </Modal>
//     </>
//       ),
//     },
//   ];

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   return (<Layout>
//     <Header>
//       <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
//         <Col className='Logo' span={6}>
//           <img src="./QAS.svg" alt="logo" />
//         </Col>
//         <Col className='Search-bar' span={12}>
//           <Search className='Search' placeholder="input search text" onSearch={onSearch} style={{ width: 500 }} />
//         </Col>
//         <Col className='Bellout' span={6}>
//           <BellOutlined className='bell' />
//           <Avatar className='Avartar' size={40} icon={<UserOutlined />} />
//         </Col>
//       </Row>
//     </Header>
//     <Content style={{ width: '80%', height: '1000px', margin: '20px 0px' }}>
//       <Layout>
//         <Sider width={200} style={{ background: colorBgContainer }}>
//           <div>
//             <h1>Các dữ liệu quản lý</h1>
//             <Dropdown menu={{ items }} placement="bottomLeft" arrow trigger={['click']}>
//               <Button>+ Thêm mới</Button>
//             </Dropdown>
//           </div>
//           <TableList/>
//         </Sider>
//         <Content style={{ width: '80%', height: '1000px', margin: '0 0' }}>
//       <Layout>
//         <Layout style={{ padding: '0 24px 24px' }}>
//           <Content
//             style={{
//               width: 1290,
//               padding: 24,
//               margin: 0,
//               minHeight: 280,
//               background: colorBgContainer,
//             }}
//           >
//             <Button style={{ margin: '0px 10px 0px 1000px' }}>Phân tích</Button>
//             <br />
//           </Content>
//         </Layout>
//       </Layout>
//     </Content>
//       </Layout>
//     </Content>

//     <Footer >Footer</Footer>

//   </Layout>
//   );
// };

// export default Main;

import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm } from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './index.css';
import './App.css';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import Inside from './inside_folder/Inside';
import axios from 'axios';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import type { ColumnsType } from 'antd/es/table';
import { Modal } from 'antd';
import CreateTable from './Create-table/CreateTable';
interface TableRow {
  [key: string]: any;
}


const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>uploadfile</div>
      ),
    },
    {
      key: '2',
      label: (
        <div>Tạo văn bản</div>
      ),
    },
    {
      key: '3',
      label: (
        <>
          <Button onClick={showModal}>
            Tạo bảng dữ liệu
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <CreateTable />
          </Modal>
        </>
      ),
    },
  ];

  const [data, setData] = useState<ItemType[]>([])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [name, setTableName] = useState<string>("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const ref = useRef<TableRow[]>()
  ref.current = rows
  const ref1 = useRef<string>()
  ref1.current = name
  const [columns, setColumns] = useState<TableRow[]>([]);
  const [colName, setColName] = useState([]);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({});
  const [colName1, setColName1] = useState([]);
  const getMenuItems = async (e: any) => {
    e.preventDefault();
    let item: Array<string> = [];
    let items2: MenuProps['items'] = [];
    try {
      const response = await axios.get('http://localhost:5000/show');
      const data1 = response.data;
      item = data1["body"]
      items2 = item.map((key) => ({
        key,
        label: `${key}`,
      }));
      setData(items2)
    } catch (error) {
      console.error('Failed', error);
      return [];
    }
  }
  const handleAddData = async (e: any) => {
    e.preventDefault();
    const formValues = Object.values(formData);
    let k: any = {}
    let n: any = ref.current
    console.log(n[n.length - 1].id + 1)
    let kh: any = [n[n.length - 1].id + 1]
    console.log("kkkkk", k)
    k["name"] = name
    k["value"] = [...kh,...formValues]
    // formValues[0] = n[n.length-1]
   
    try {
      await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/add', k);
    } catch (error) {
      console.error('Error creating table:', error);
    }
    let x: any = rows
    let z: any = []
    let zz: any = []
    z = Object.keys(columns).map(k => columns[k])
    for (const element of z) {
      zz.push(element["title"])
    }
    zz.pop()
    let zzz: any = {}
    zzz["key"] = count + 1;
    let i = 0;
    // zzz["id"] = kh
    console.log(zz)
    let z1 = [...kh, ...formValues]
    for (const ele of zz) {
      zzz[ele] = z1[i]
      i++
    }
    
    x.push(zzz)
    setRows(x)
    let newCount: number = count + 1
    setCount(newCount);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleDelete = async (key: React.Key) => {
    let k: number = Number(key) - 1
    if (ref.current && ref.current.length > 0) {
      const newRows: any = [];
      const entries = Object.entries(ref.current[k]);
      for (const ele of ref.current) {
        if (ele["key"] != key) {
          newRows.push(ele)
        }
      }
      let i: number = 1;
      for (const ele of newRows) {
        ele["key"] = i
        i++
      }
      setRows(newRows);
      setCount(count - 1);
      // console.log("Entries", entries)
      // console.log('rewrwrwe:', newRows[k]);
      let request: any = {}
      console.log(ref1.current)
      request["name"] = ref1.current
      request["col"] = [entries[1][0], entries[1][1]]
      console.log(request)
      try {
        await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/delete', request);
        console.log('Delete successfully!');
      } catch (error) {
        console.error('Error creating table:', error);
      }
    }


  };

  

  const onClick: MenuProps['onClick'] = async (e) => {
    let column: TableRow[] = [];
    setTableName(e.key) 
    let row: TableRow[] = [];
    try {
      var request: any = {}
      request["name"] = e.key
      console.log(request)
      const response = await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/show_tables', request);
      const data = response.data; // extract the data from the response
      const arr = data["body"];
      column = arr[0]
      row = arr[1]
      let k: any = {
        title: 'operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 200,
        render: (_: any, record: { key: React.Key }) => (
          <>
            <Button type="primary" size="small" style={{ marginRight: '20px' }}>
              Edit
            </Button>
            {row.length >= 1 ? (
              <Popconfirm title="Bạn có chắc chắn xóa?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null}
          </>
        ),
      };
      column.push(k)
      setCount(row.length)
      setRows(row)
      setColumns(column)
      setColName(arr[2])
      arr[2].shift()
      setColName1(arr[2])
    } catch (error) {
      console.error('Failed', error);
    }
    console.log(count)
  };

  return (<Layout onLoad={getMenuItems}>
    <Header>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='Logo' span={6}>
          <img src="./QAS.svg" alt="logo" />
        </Col>
        <Col className='Search-bar' span={12}>
          <Search className='Search' placeholder="input search text" onSearch={onSearch} style={{ width: 500 }} />
        </Col>
        <Col className='Bellout' span={6}>
          <BellOutlined className='bell' />
          <Avatar className='Avartar' size={40} icon={<UserOutlined />} />
        </Col>
      </Row>
    </Header>

    <Content style={{ width: '80%', height: '1000px', margin: '20px 0px' }}>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <div>
            <h1>Các dữ liệu quản lý</h1>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow trigger={['click']}>
              <Button>+ Thêm mới</Button>
            </Dropdown>
          </div>
          <Menu
            onClick={onClick}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={data}
          />
        </Sider>
        <Content style={{ width: '80%', height: '1000px', margin: '0 0' }}>
          <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  width: 1290,
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                <Button style={{ margin: '0px 10px 0px 1100px' }}>Phân tích</Button>
                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  {colName1.map((field) => (
                    <div key={field} className="form-field">
                      <label htmlFor={field}><h4>{field}</h4></label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                  <button type="submit" className="add-row-button" onClick={handleAddData}>Add new row</button>
                </div>

                <Table columns={columns} dataSource={rows} key={count} />
                {/* <form onSubmit={handleSubmit}>
          {colName.map((field) => (
            <div key={field} className="form2">
              <label htmlFor={field}><h4>{field}</h4></label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className='btt2'>Add new row</button>
        </form> */}
              </Content>
            </Layout>
          </Layout>
        </Content>

        {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button> */}
      </Layout>
    </Content>

    <Footer >Footer</Footer>

  </Layout>
  );
};

export default Main;