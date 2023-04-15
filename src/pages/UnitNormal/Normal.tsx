import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellFilled, UserOutlined, DatabaseTwoTone} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { Modal } from 'antd';
import CreateTable from '../../Create-table/CreateTable';
// import CreateBlock from './UnitAdmin/CreateBlock';
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
    nagative("/UnitUser/BlockNormal")
  }

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


  return (<Layout onLoad={handleShowBlock}>
  <Header style={{backgroundColor: '#6495ED', height: '80px'}}>
  <Row gutter={[16, 16]}>
    <Col className="Logo" xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 2 }} lg={{ span: 6 }} style={{color: 'white'}}>
      <img src="/logo.png" alt="logo" style={{ width: 50, marginTop: '5px' }}/>
    </Col>
    
    <Col className="Search-bar" xs={{ span: 16 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 8 }} style={{marginTop: '20px'}}>
      <Search className="Search" placeholder="input search text" onSearch={onSearch} />
    </Col>
    <Col className="Bellout" xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <BellFilled className="bell"style={{ marginRight: '20px', marginTop: '15px', color: 'black', fontSize: '28px'}} />
        <Avatar className="Avartar" size={50} icon={<UserOutlined />} style={{backgroundColor: '#FF00FF'}} />
        <h1 style={{margin:'-5px 5px 0px 20px', color:'white'}}>Unit-Admin</h1>
      </div>
    </Col>
  </Row>
</Header>

<Content style={{ width: '100%', height: '1000px', margin: '20px 0px' }}>
  <Layout>
    <Content style={{ width: '100%', height: '1000px', margin: '0 0' }}>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              width: '100%',
              maxWidth: '1400px',
              padding: '24px',
              margin: '0 auto',
              minHeight: '280px',
              background: colorBgContainer,
            }}
          >
            <div className='header'>
              <h1 style={{fontSize: '20px'}}>TẬP DỮ LIỆU</h1>
              <div className='btn-wrapper'>
              </div>
            </div>
            <Divider />
            <div>
              <Space>
                
               {virtualFolders.length > 0? ( virtualFolders.map((folder) => (
                 <Button 
                 className='btn' 
                 key={folder.name} 
                 onClick={handleClick} 
                 style={{ 
                   width: 'auto', 
                   height: '100px', 
                   display: 'flex', 
                   flexDirection: 'column', 
                   alignItems: 'center', 
                   justifyContent: 'center' 
                 }}> 
                 <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center' }}>

                   <DatabaseTwoTone style={{ fontSize: '60px', marginBottom: '8px' }} twoToneColor="#5b7a78"/> 
                   <span style={{ fontSize: '16px', textAlign: 'center' }}>{folder.name}Block Name</span> 

                 </div>

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