import React, { useState } from 'react';
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
interface TableRow {
  [key: string]: any;
}

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const Main = () => {
  const [data, setData] = useState<ItemType[]>([])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [name, setTableName] = useState<string>("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const [columns, setColumns] = useState<TableRow[]>([]);
  const [colName, setColName] = useState([]);
  const [count, setCount] = useState(2);
  const [formData, setFormData] = useState({});
  const getMenuItems = async (e: any) => {
    e.preventDefault();
    let item: Array<string> = [];
    let items2: MenuProps['items'] = [];
    try {
      const response = await axios.get('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/show');
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formValues = Object.values(formData);
    let k: any = {}
    k["name"] = name
    k["value"] = formValues
    let z: any = []
    let zz: any = []
    z = Object.keys(columns).map(b => columns[b])
    for (const element of z) {
      zz.push(element["title"])
    }
    zz.pop()
    let zzz: any = {}
    zzz["key"] = count + 1;
    let i = 0;
    for (const ele of zz) {
      zzz[ele] = formValues[i]
      i++
    }
    setRows([...rows, zzz])
    setCount(count + 1);
    try {
      await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/add', k);
      
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAdd = () => {
    const newData: TableRow = rows[0];
    setRows([...rows, newData]);
    setCount(count + 1);
  };
  const handleDelete = async (key: React.Key) => {
    const newRows: any = [];
    for(const ele of rows){
      if(ele["key"] != key){
        newRows.push(ele)
      }
    }
    let i: number = 1;
    for(const ele of newRows){
      ele["key"] = i
      i++
    }
    setRows(newRows);
    setCount(count - 1);
    key = key + ''
    let k: number = Number(key)
    const entries = Object.entries(rows[k - 1]);
    let request: any = {}
    request["name"] = name
    request["col"] = [entries[1][0], entries[1][1]]
    try {
      await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/delete', request);
      console.log('Delete successfully!');
    } catch (error) {
      console.error('Error creating table:', error);
    }

  };

  const onClick: MenuProps['onClick'] = async (e) => {
    let column: TableRow[] = [];
    setTableName(e.key)
    let row: TableRow[] = [];
    try {
      var request: any = {}
      request["name"] = e.key
      const response = await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/show_tables', request);
      const data = response.data; // extract the data from the response
      const arr = data["body"];
      column = arr[0]
      row = arr[1]
      let k: any = {
        title: 'operation',
        dataIndex: 'operation',
        render: (_: any, record: { key: React.Key }) =>
          rows.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      }
      column.push(k)
      setCount(row.length)
      setRows(row)
      setColumns(column)
      setColName(arr[2])
    } catch (error) {
      console.error('Failed', error);
    }
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

        <Table columns={columns} dataSource={rows} className="table1" />
        <form onSubmit={handleSubmit}>
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
        </form>
        <Inside />
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