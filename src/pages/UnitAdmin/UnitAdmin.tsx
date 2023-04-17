import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space, Card  } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellFilled, DatabaseTwoTone, UserOutlined,EllipsisOutlined, ExclamationCircleFilled,DeleteOutlined,EditOutlined } from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { Modal } from 'antd';
import './Unitadmin.css';
import CreateBlock from './CreateBlock';
import { getUnit } from '../../utils';
import CreateTable from '../../Create-table/CreateTable';

interface Table {
  name: string;
  cols: string[];
}

interface User{
  value: string;
  label: string;
}

interface Table {
  name: string;
  cols: string[];
  des: string[];
}

interface VirtualFolder {
  name: string;
}

interface IProps {
  folders: VirtualFolder[]
}
const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};
//////////////////////////////////////////////////////////////////////////
const { confirm } = Modal;

const DeleteBLock = () => {
  confirm({
    title: 'Xóa tập dữ liệu',
    icon: <ExclamationCircleFilled />,
    content: 'Bạn có chắc chắn muốn xóa tập dữ liệu này?',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div><EditOutlined /> chỉnh sửa</div>
    ),
  },
  {
    key: '2',
    label: (
      <div style={{cursor:'pointer'}} onClick={DeleteBLock}><DeleteOutlined />  Xóa</div>
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
  const showModal = () => {setIsModalOpen(true);};
  const handleCancel = () => {setIsModalOpen(false);};
  const {token: { colorBgContainer },} = theme.useToken();  

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
        <BellFilled className="bell" style={{ marginRight: '20px', marginTop: '10px', color: '#FF4500', fontSize: '28px'}} />
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
                <Button onClick={showModal} style={{backgroundColor: '#32CD32', color:'white', height:'40px'}}> Thêm tập lưu trữ</Button>
                <Modal width={750} title="Thêm mới tập dữ liệu" open={isModalOpen} onCancel={handleCancel}
                  footer={[
                    ]}>
                  <CreateBlock folders={virtualFolders} Modal={isModalOpen} setModal={setIsModalOpen}/>
                </Modal>
              </div>
            </div>
            <Divider />
            <div>
                <Card>
                  {virtualFolders.length > 0? ( virtualFolders.map((folder) => (
                 <Card.Grid style={{width:'25%', textAlign:'center', position:'relative'}}
                 key={folder.name}
                  // style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                 <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                   <button style={{position: 'absolute', top: 0, right: 0, backgroundColor:'transparent', border:'none', cursor:'pointer'}}>
                    <h1 className='Edit' style={{ margin:'-1px -6px 0px 0px', color: '#71717a', fontSize:'22px',padding: '0px 2px'}}><EllipsisOutlined/></h1> 
                   </button>
                  </Dropdown>
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

    <Footer >Footer</Footer>

  </Layout>
  );
};
export default UnitAdmin;