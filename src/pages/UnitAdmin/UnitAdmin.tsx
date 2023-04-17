import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space } from 'antd';
import { message, Steps, Select } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { BellOutlined, BellFilled, DatabaseTwoTone, UserOutlined,EllipsisOutlined, ExclamationCircleFilled,DeleteOutlined,EditOutlined } from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { Modal } from 'antd';
import './Unitadmin.css';
// import CreateBlock from './CreateBlock';
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

const showConfirm = () => {
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
      <div style={{cursor:'pointer'}} onClick={showConfirm}><DeleteOutlined />  Xóa</div>
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

  const warning = () => {
    Modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };
  
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
  
  const CreateBlock: React.FC<IProps> = (props: IProps) => {
    const [TypeFile, setTypeFile] = useState<string>("");
    const { TextArea } = Input;
    const [tablesInfo, setTablesInfo] = useState<Table[]>([])
    const [Nameblock, setNameblock] = useState<string>("");
    const [InputDes,setInputDes] = useState<string>("");
    const [Users,setUsers] = useState<User[]>([])
    const [addUser,setAddUser] = useState<string>("")
    const handleNameBlockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameblock(event.target.value);
  };
    const handleUserChange = (value: string) => {
      setAddUser(value) 
    }
    const handleInputDes = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputDes(event.target.value);
  };
  const handleChange = (value: string) => {
    setTypeFile(value);
    console.log(`selected ${value}`);
  };
  async function handleDone(){
    let nameBlock = getUnit()
    nameBlock = nameBlock + "_"+Nameblock
      try {
        let sql: any = "http://localhost:5000/create_block?name=" + encodeURIComponent(nameBlock);
        await axios.post(sql);
      } catch (error) {
      console.error('Error creating database:', error);
      }
      try {
        console.log(nameBlock)
        let sql: any = "http://localhost:5000/create_tables?name=" + encodeURIComponent(nameBlock);
        let request : any=[]
        for (var i in tablesInfo){
          let k: Table ={
            name: '',
            cols: [],
            des: []
          }
          k.name = tablesInfo[i].name
          k.cols = tablesInfo[i].cols
          k.des = tablesInfo[i].des
          request.push(k)
        }
        console.log(request)
        await axios.post(sql,request);
      } catch (error) {
      console.error('Error', error);
      }
      try {
        let sql: any = "http://localhost:5000/add_des"
        let k: any = {
          "name": nameBlock,
          "display":"",
          "descript": encodeURIComponent(InputDes)
        }
        await axios.post(sql,k);
      } catch (error) {
      console.error('Error', error);
      }
      message.success('Processing complete!');
      try {
        let url: any = "http://localhost:5000/add_users?block=" + nameBlock
        let body: string[] = []
        body.push(addUser)
        await axios.post(url,body);
      } catch (error) {
      console.error('Error', error);
      }
      
  }

  async function getUsers(){
    try {
        let sql: any = "http://localhost:5000/show_user?name=hcmut";
        const response = await axios.post(sql);
        return response.data["body"]
    } catch (error) {
      console.error('Error creating database:', error);
    }
  }
  useEffect(() => {
    async function fetchOptions() {
      const options = await getUsers();
      setUsers(options);
    }
    fetchOptions();
  }, []);
  const steps = [ 
    {
      title: 'First',
      content: <Input style={{width: "50%"}} type='text' placeholder='Nhập tên vùng dữ liệu' value={Nameblock} onChange={handleNameBlockChange} />
    },
    {
      title: 'Second',
      content: <>
          Chọn cách nhập dữ liệu
      <Select
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'table', label: 'table' },
        { value: 'docx', label: 'docx' },
        { value: 'pdf', label: 'pdf' }
      ]}
    />
      {TypeFile === 'table' && <CreateTable tablesInfo={tablesInfo} setTablesInfo={setTablesInfo}/>}
    </> ,
    },
    {
      title: 'Last',
      content: 
    <div>
      Nhập tiêu chí đầu ra dữ liệu
      <TextArea rows={4} placeholder='Nhập tiêu chí đầu ra dữ liệu' value={InputDes} onChange={handleInputDes}/>
      Chọn người nhập dữ liệu
      <Select
      style={{ width: "200px", marginTop: "10px" }}
      onChange={handleUserChange}
      options={Users}
    />
      </div> 
    },
  ];
    
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const error = (message: any) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  
  const next = () => {
    if (current == 0){
      let flag :any = 0;
      for (var x of props.folders){
          if (x.name == Nameblock){
              error("Tên tập dữ liệu đã tồn tại")
              flag = 1
          }
      }
      if(Nameblock ==""){
        error("Tên tập dữ liệu không được để trống")
        flag = 1
      }
      if (flag == 0) {setCurrent(current + 1);}
    }
    else {setCurrent(current + 1);}
  };

  
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorderBg}`,
    padding:20,
    marginTop:30,
  };
  return (
    <>{contextHolder} <div style={{width: "700px"}}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{ steps[current].content}</div>
      <div style={{ marginTop: 10 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {
            handleOk();
            handleShowBlock();
            handleDone();
          }}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
      </div>
    </>
  );
};

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
        <BellFilled className="bell"style={{ marginRight: '20px', marginTop: '10px', color: '#FF4500', fontSize: '28px'}} />
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
                  footer={[]}
  >
                  <CreateBlock folders={virtualFolders}/>
                </Modal>
              </div>
            </div>
            <Divider />
            <div>
              <Space size="large" wrap>
                
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
                   <button style={{position: 'absolute', top: 0, right: 0, backgroundColor:'transparent', border:'none', cursor:'pointer'}}>
                    <h1 className='Edit' style={{ margin:'-1px -6px 0px 0px', color: '#71717a', fontSize:'22px',padding: '0px 2px'}}><EllipsisOutlined/></h1> 
                   </button>
                  </Dropdown>
                  <div className='BlockName' style={{display:'flex', flexDirection: 'column'}}>
                   <DatabaseTwoTone  style={{ fontSize: '60px', padding: '0px 0px 8px 0', marginTop: '18px' }} twoToneColor="#5b7a78" onClick={() => handleClick(folder.name)} />
                   <span  style={{ fontSize: '16px', textAlign: 'center', margin: '0px 5px', cursor: 'pointer'}} onClick={() => handleClick(folder.name)}>{folder.name}</span>
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