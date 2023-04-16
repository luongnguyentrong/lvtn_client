import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellOutlined, BellFilled, DatabaseTwoTone, UserOutlined,EllipsisOutlined} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { Modal } from 'antd';
import CreateBlock from './CreateBlock';
import './Unitadmin.css';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div>chỉnh sửa</div>
    ),
  },
  {
    key: '2',
    label: (
      <div>Xóa</div>
    ),
  },
];

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
  const showModal = () => {setIsModalOpen(true);};
  const handleCancel = () => {setIsModalOpen(false);};
  const handleOk = () => {
    setIsModalOpen(false);

  };
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
  
  const handleShowBlock = async () => {
    try {
      const response = await axios.get('http://localhost:5000/show_folders');
      console.log(response);
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

  interface AddFolderFormProps {
    onSubmit: (folder: VirtualFolder) => void;
  }
   const AddFolderForm: React.FC<AddFolderFormProps> = ({ onSubmit }) => {
    const [folderName, setFolderName] = useState("");
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit({ name: folderName});
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

 
  const navigate = useNavigate();

  function handleClick(value: any){
    navigate("/Unitadmin/block", {state: value})
  }

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
        <BellFilled className="bell"style={{ marginRight: '20px', marginTop: '10px', color: 'black', fontSize: '28px'}} />
        <Avatar className="Avartar" size={50} icon={<UserOutlined />} style={{backgroundColor: '#FF00FF'}} />
        <h1 style={{margin:'-5px 5px 0px 20px', color:'white'}}>SuperUser</h1>
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
                <Button onClick={showModal} style={{backgroundColor: '#32CD32', color:'white', height:'40px'}}>+ Thêm tập lưu trữ</Button>
                <Modal width={750} title="Thêm mới tập dữ liệu" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel}
                  footer={[
                    <Button key="OK" type="primary" onClick={() => {
                      handleOk();
                      handleShowBlock();
                    }}>
                      OK
                    </Button>,
  ]}>
                  <CreateBlock />
                </Modal>
              </div>
            </div>
            <Divider />
            <div>
              <Space size="large">
                
               {virtualFolders.length > 0? ( virtualFolders.map((folder) => (
                 <div
                 className='btn'
                 key={folder.name}
                 style={{
                   width: 'auto',
                   height: '110px',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   justifyContent: 'center',
                   boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                   borderWidth: '2px',
                   minWidth: '100px',
                   borderStyle: 'ridge',
                   position: 'relative'
                 }}
               >
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                   <button style={{position: 'absolute', top: 0, right: 0, backgroundColor:'white', border:'none', cursor:'pointer'}}>
                    <h1 className='Edit' style={{ margin:'-1px -4px 0px 0px', color: '#71717a', fontSize:'22px',padding: '0px 2px'}}><EllipsisOutlined/></h1> 
                   </button>
                  </Dropdown>
                  <div className='BlockName' style={{display:'flex', flexDirection: 'column'}}>
                   <DatabaseTwoTone  style={{ fontSize: '60px', padding: '0px 0px 8px 0', marginTop: '18px' }} twoToneColor="#5b7a78" onClick={() => handleClick(folder.name)} />
                   <span  style={{ fontSize: '16px', textAlign: 'center', margin: '0px 5px', cursor: 'pointer'}} onClick={() => handleClick(folder.name)}>{folder.name}dsaaaaaaaaaaaa</span>
                </div> </div>
               </div>
               
               ))): (
                <div>Loading folders...</div>
              )}
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