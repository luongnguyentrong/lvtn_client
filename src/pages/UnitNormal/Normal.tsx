import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space,Card } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, DatabaseTwoTone} from '@ant-design/icons';
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

interface IProps {
  name : string;
}

const Normal = (props: IProps) => {
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
      const response = await axios.get('http://localhost:5000/show_folders_normal?user='+props.name);
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
 
  const navigate = useNavigate();

  function handleClick(value: any){
    navigate("/UnitUser/BlockNormal", {state: value})
  }

  return (<Layout onLoad={handleShowBlock} style={{backgroundColor: '#E8E8E8'}}>
  <Header style={{backgroundColor: '#020547', height: '50px'}}>
  <Row gutter={[16, 16]}>
    <Col className="Logo" xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 6 }} style={{display: 'flex'}}>
      <img src="/logo.png" alt="logo" style={{ width: '35px', height:'35px',marginTop:'8px', marginLeft: '-25px'}}/>
      <h1 style={{color:'white', marginLeft:'10px', marginTop:'-5px'}}>Quality Assurance</h1>
    </Col>
    
    <Col className="Search-bar" xs={{ span: 16 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 8 }} style={{marginTop: '10px'}}>
      <Search className="Search" placeholder="input search text" onSearch={onSearch} />
    </Col>
    <Col className="Bellout" xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <BellOutlined className="bell" style={{ marginRight: '20px', color: 'white', fontSize: '28px'}} />
        <Avatar className="Avartar" size={30} icon={<UserOutlined />} style={{backgroundColor: '#FF00FF'}} />
        <h1 style={{margin:'-17px 5px 0px 20px', color:'white'}}>SuperUser</h1>
      </div>
    </Col>
  </Row>
</Header>

<Content style={{ width: '100%', height: '1000px', margin: '20px 0px',backgroundColor: '#E8E8E8' }}>
  <Layout>
    <Content style={{ width: '100%', height: '1000px', margin: '0 0',backgroundColor: '#E8E8E8' }}>
      <Layout>
        <Layout style={{ padding: '0 24px 24px',backgroundColor: '#E8E8E8' }}>
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
                <Card>
                  {virtualFolders.length > 0? ( virtualFolders.map((folder) => (
                 <Card.Grid style={{width:'25%', textAlign:'center', position:'relative'}}
                 key={folder.name}
              >

                  <div className='BlockName' style={{display:'flex', flexDirection: 'column'}}>
                   <DatabaseTwoTone className='anticon'  style={{ fontSize: '60px', padding: '0px 0px 8px 0', marginTop: '18px' }} twoToneColor="#5b7a78" onClick={() => handleClick(folder.name)} />
                   <span  style={{ fontSize: '16px', textAlign: 'center', margin: '0px 5px', cursor: 'pointer'}} onClick={() => handleClick(folder.name)}>{folder.name}</span>
                </div> 
                </Card.Grid>
               
               ))): (
                <div>Loading folders...</div>
              )}
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Content>
  </Layout>
</Content>

  </Layout>
  );
};

export default Normal;