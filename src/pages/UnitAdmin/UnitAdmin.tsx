import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space, Card  } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellOutlined, DatabaseTwoTone, UserOutlined,EllipsisOutlined, ExclamationCircleFilled,DeleteOutlined,EditOutlined } from '@ant-design/icons';
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
//////////////////////////////////////////////////////////////////////////
const { confirm } = Modal;


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
  const [resetKey, setResetKey] = useState(0);
  const handleCancel = () => {setIsModalOpen(false); setResetKey(resetKey +1)};
  const {token: { colorBgContainer },} = theme.useToken();  
  const [deleteBlock,setDeleteBlock] = useState("")
  const [EditBlockName,setEditBlockName] = useState("");

  const [open, setOpen] = useState(false);

  const showEditBlock = () =>{
    setOpen(true);
  }

  // function BlockName(name: any){
  //   setEditBlockName(name);
  // }

  function handleDeleteBlock(name: any){
    setDeleteBlock(name)
  }

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
  let k = 1;
  const ChangeBlockName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditBlockName(event.target.value);
    // setDeleteBlock(event.target.value);
  };
  // const EditBlock = () => {
  //   confirm({
  //     title: 'Sửa tên tập dữ liệu',
  //     icon: <EditOutlined />,
  //     content: <Input type="text" placeholder={deleteBlock} onChange={ChangeBlockName} />,
  //      onOk() {
  //       try {
  //         // await axios.delete('http://localhost:5000/delete?block=hcmut_' + deleteBlock);
  //       }
  //       catch (error) {
  //         console.error('Failed', error);
  //       }
  //       console.log(deleteBlock);
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //   });
  // };

  const DeleteBLock = () => {
    confirm({
      title: 'Xóa tập dữ liệu',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn có chắc chắn muốn xóa tập dữ liệu này?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        console.log("asdad");
        try {
          // await axios.delete('http://localhost:5000/delete?block=hcmut_' + deleteBlock);
        }
        catch (error) {
          console.error('Failed', error);
        }
        handleShowBlock();
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
        <div>
        <div onClick={showEditBlock}>  <EditOutlined /> chỉnh sửa</div>
        <Modal    
          title='Sửa tên tập dữ liệu'
          open={open}
          onOk={async () => {setOpen(false);
            try {
              console.log(EditBlockName);
              // await axios.delete('http://localhost:5000/delete?block=hcmut_' + deleteBlock);
            }
            catch (error) {
              console.error('Failed', error);
            }
          }
        }
          onCancel={() => {setOpen(false);}}
          maskClosable={false}
          mask={false}
          wrapClassName="custom-modal"
          footer={[
              <Button key="Hủy" onClick={() => {setOpen(false)}}>Hủy</Button>,
              <Button key="Submit" type='primary' 
              onClick={async () => {setOpen(false);
                try {
                  console.log(EditBlockName);
                  // await axios.delete('http://localhost:5000/delete?block=hcmut_' + EditBlockName);
                }
                catch (error) {
                  console.error('Failed', error);
                }
              }}>
              Lưu</Button>
          ]}
        >
          Tên
          <Input type="text" placeholder={deleteBlock} onChange={ChangeBlockName} />
        </Modal>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ cursor: 'pointer' }} onClick={DeleteBLock}><DeleteOutlined />  Xóa</div>
      ),
    },
  ];
  const navigate = useNavigate();

  function handleClick(value: any){
    navigate("/Unitadmin/block", {state: value})
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

<Content style={{ width: '100%', height: '1000px', margin: '20px 0px'}}>
  <Layout>
    <Content style={{ width: '100%', height: '1000px',backgroundColor:'#E8E8E8' }}>
      <Layout>
        <Layout style={{ padding: '0 24px 24px', backgroundColor:'#E8E8E8' }}>
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
                  <CreateBlock folders={virtualFolders} Modal={isModalOpen} setModal={setIsModalOpen} key={resetKey }/>
                </Modal>
              </div>
            </div>
            <Divider />
            <div>
                <Card>
                  {virtualFolders.length > 0? ( virtualFolders.map((folder) => (
                 <Card.Grid style={{width:'25%', textAlign:'center', position:'relative'}}
                 key={folder.name}
              >
                 <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                        <button style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => handleDeleteBlock(folder.name)}>
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

  </Layout>
  );
};
export default UnitAdmin;