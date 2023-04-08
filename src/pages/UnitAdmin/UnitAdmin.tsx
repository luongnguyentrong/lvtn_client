import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { Modal } from 'antd';
import CreateTable from '../../Create-table/CreateTable';
import CreateBlock from './CreateBlock';
import Block from './Block';
import './Unitadmin.css'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

interface TableRow {
  [key: string]: any;
}
interface VirtualFolder {
  name: string;
}

const UnitAdmin = () => {
  const [virtualFolders, setVirtualFolders] = useState<VirtualFolder[]>([{name: ""}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const showModal = () => {setIsModalOpen(true);};
  const handleOk = () => {setIsModalOpen(false);};
  const handleCancel = () => {setIsModalOpen(false);};
  const cancel = () => {setEditingKey('');};
  const [data, setData] = useState<ItemType[]>([])
  const {token: { colorBgContainer },} = theme.useToken();
  const [name, setTableName] = useState<string>("");
  const [rows, setRows] = useState<TableRow[]>([]);
  const ref = useRef<TableRow[]>()
  ref.current = rows
  const ref1 = useRef<string>()
  ref1.current = name
  const [columns, setColumns] = useState<TableRow[]>([]);
  const ref2 = useRef<TableRow[]>()
  ref2.current = columns
  const [colName, setColName] = useState([]);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({});
  const [colName1, setColName1] = useState([]);
  const handleShowBlock = async () => {
    try {
      const response = await axios.get('http://localhost:5000/show_folders');
      const response1 = response.data["body"].map((str: string) => {
      return str.replace('hcmut_', '');
      });
      let folderList: VirtualFolder[] = []
      for (var ele of response1){
        var c: VirtualFolder={name:""};
        c.name = ele
        folderList.push(c)
      }
      setVirtualFolders(folderList)
     } catch (error) {
       console.error('Failed', error);
       return [];
     }
  }
  const handleAddFolder = (folder: VirtualFolder) => {
    setVirtualFolders([...virtualFolders, folder]);
  };

  interface AddFolderFormProps {
    onSubmit: (folder: VirtualFolder) => void;
  }
   const AddFolderForm: React.FC<AddFolderFormProps> = ({ onSubmit }) => {
    const [folderName, setFolderName] = useState("");
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({ name: folderName});
      setFolderName("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button type="submit">Add Folder</button>
      </form>
    );
  };

  // const getMenuItems = async (e: any) => {
  //   e.preventDefault();
  //   let item: Array<string> = [];
  //   let items2: MenuProps['items'] = [];
  //   try {
  //     const response = await axios.get('http://localhost:5000/show');
  //     const data1 = response.data;
  //     item = data1["body"]
  //     items2 = item.map((key) => ({
  //       key,
  //       label: `${key}`,
  //     }));
  //     setData(items2)
  //   } catch (error) {
  //     console.error('Failed', error);
  //     return [];
  //   }
  // }

  // const onClick: MenuProps['onClick'] = async (e) => {
  //   let column: TableRow[] = [];
  //   setTableName(e.key) 
  //   let row: TableRow[] = [];
  //   try {
  //     var request: any = {}
  //     request["name"] = e.key
  //     console.log(request)
  //     const response = await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/show_tables', request);
  //     const data = response.data; // extract the data from the response
  //     const arr = data["body"];
  //     column = arr[0]
  //     row = arr[1]
  
  //     setCount(row.length)
  //     setRows(row)
  //     setColumns(column)
  //     setColName(arr[2])
  //     arr[2].shift()
  //     setColName1(arr[2])
  //   } catch (error) {
  //     console.error('Failed', error);
  //   }
  // };
  const nagative = useNavigate();

  function handleClick(){
    nagative("/Unitadmin/block")
  }
  return (<Layout onLoad={handleShowBlock}>
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
        <Content style={{ width: '100%', height: '1000px', margin: '0 0' }}>
          <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  width: 1400,
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                <div className='header'>
                <h1>TẬP DỮ LIỆU</h1>
                <div className='btn-wrapper'>

                <Button onClick={showModal}>+ Thêm tập lưu trữ</Button>
                <Modal width={750} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <CreateBlock />
                  </Modal>
                </div>
                </div>
                <Divider />
                  <div>
      <Space>
        {virtualFolders.length > 0? ( virtualFolders.map((folder) => (
          <Button className='btn' key={folder.name} onClick={handleClick}> 
             <span className='btn-text'>{folder.name} </span>
          </Button>
        ))): null}
      </Space>
    </div>
                
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    </Content> 
          
    <Footer >Footer</Footer>

  </Layout>
  );
};

export default UnitAdmin;