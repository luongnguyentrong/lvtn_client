import React, { useRef, useState } from 'react';
import { Layout, Row, Col, InputNumber, Form } from 'antd';
const { Header, Content, Sider } = Layout;
import { Input, Button, Avatar, Menu, theme, Table,Divider } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined,ExclamationCircleFilled,PlusCircleOutlined,ExportOutlined ,EditOutlined, DeleteOutlined,TableOutlined} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Modal } from 'antd';
import CreateBlock from './CreateBlock';
import EditBlock from './EditBlock';
import { useLocation } from "react-router-dom";
import './block.css'
import { Excel } from "antd-table-saveas-excel";

interface IExcelColumn{
  title: string;
  dataIndex:string;
}

interface TableRow {
  [key: string]: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: TableRow;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Main: React.FC = () => {
  const location = useLocation();
  const value = location.state;
 
  const [form] = Form.useForm();
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {setIsModalOpen(true);};
  const handleOk = () => {setIsModalOpen(false);};
  const handleCancel = () => {setIsModalOpen(false);};

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => { setIsModalOpen2(true); handleCriteria();};
 

  const handleCancel2 = () => {setIsModalOpen2(false);};

  // const cancel = () => {setEditingKey('');};
  
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
  const [formData2, setFormData2] = useState({});
  const [colName1, setColName1] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [isEditing1, setIsEditing1] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [ValueEdit, setValueEdit] = useState<any>();

  const [EditRecord, setEditRecord] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any>({});

  const handleOk2 = async () => {
    setIsModalOpen2(false);
    try {
      await axios.post('http://localhost:5000/edit_criteria?block=hcmut_' + value+'&new=' +encodeURIComponent(inputValue));
    } catch (error) {
      console.error('Failed', error);
    }
    setIsEditing1(false)
  };

  const handleCriteria = async ()=>{
    try {
      const response = await axios.get('http://localhost:5000/show_criteria?block=hcmut_' + value);
      console.log(response)
      let crit: any = decodeURIComponent(response.data["body"])
      setCriteria(crit)
    } catch (error) {
      console.error('Failed', error);
      return [];
    }
  }
  const getMenuItems = async (e: any) => {
    e.preventDefault();
    let item: Array<string> = [];
    let items2: MenuProps['items'] = [];
    try {
      const response = await axios.get('http://localhost:5000/show_tables?block_name=hcmut_'+value);
      const data1 = response.data;
      item = data1["body"]
      items2 = item.map((key) => ({ 
        key,
        label: `${key}`,
        icon: <TableOutlined/>
      }));
      setData(items2)
    } catch (error) {
      console.error('Failed', error);
      return [];
    }
  }
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange2 = (e: any) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };
  
  const DeleteRerord = () => {
    Modal.confirm({
      title: 'Xóa dòng',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu này?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        try {
          // await axios.delete('http://localhost:5000/delete?block=hcmut_' + deleteBlock);
        }
        catch (error) {
          console.error('Failed', error);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showEditRecord = (record: TableRow) => {
    setCurrentRecord(record);
    setEditRecord(true);
};
  const onClick: MenuProps['onClick'] = async (e) => {
    let column: TableRow[] = [];
    setTableName(e.key) 
    let row: TableRow[] = [];
    try {
      let url: any = "http://localhost:5000/show_inside?block_name=hcmut_" + value + "&table_name="+e.key
      const response = await axios.get(url);
      const data = response.data; // extract the data from the response
      const arr = data["body"];
      column = arr[0]
      row = arr[1]
      const transformedList = row.map(({ key, row }) => ({
        key,
        ...row
      }));
      column[0].width = 50;
      setCount(row.length)
      setRows(transformedList)
      setColumns(column)
      setColName(arr[2])
      arr[2].shift()
      setColName1(arr[2])
    } catch (error) {
      console.error('Failed', error);
    }
  };

  const handleButtonClick = () => {
    if (isEditing1 == true){
        setCriteria(inputValue)
    }
    else{
      setInputValue(criteria)
    }
    
    setIsEditing1(!isEditing1);
    // setInputValue(criteria);
  };
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  
  const handleAddData = async (e: any) => {
    // e.preventDefault();
    // const formValues = Object.values(formData);
    // let k: any = {}
    // let n: any = ref.current
    // let kh: any = [1]
    // if (rows.length != 0) {
    //   kh = [n[n.length - 1].id + 1]
    // }
    // console.log("kkkkk", k)
    // k["name"] = name
    // k["value"] = [...kh, ...formValues]
    // try {
    //   // await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/add', k);
    // } catch (error) {
    //   console.error('Error creating table:', error);
    // }
    // let x: any = rows
    // let z: any = []
    // let zz: any = []
    // z = Object.keys(columns).map(k => columns[k])
    // for (const element of z) {
    //   zz.push(element["title"])
    // }
    // zz.pop()
    // let zzz: any = {}
    // zzz["key"] = count + 1;
    // let i = 0;
    // let z1 = [...kh, ...formValues]
    // for (const ele of zz) {
    //   zzz[ele] = z1[i]
    //   i++
    // }

    // x.push(zzz)
    // setRows(x)
    // let newCount: number = count + 1
    // setCount(newCount);
  };

  const DeleteTable = () => {
    Modal.confirm({
      title: 'Xóa bảng dữ liệu',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn có chắc chắn muốn xóa bảng dữ liệu này?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        try {
          //console.log("http://localhost:5000/delete_table?block=hcmut_" + value + "&table=" + name)
          //await axios.delete("http://localhost:5000/delete_table?block=hcmut_" + value + "&table=" + name)
        }
        catch (error) {
          console.error('Failed', error);
        }
        // console.log(data)
        // console.log(name)
        const filteredArr = data.filter((obj) => obj.label !== name);
        setData(filteredArr)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const [NewRow, setNewRow] = useState(false);
  const addrow = () =>{
    setNewRow(true);
  }
   const arr1 = Object.keys(currentRecord);
   const arr2 = Object.keys(currentRecord).map(key => currentRecord[key]);
   
   const excelColumns: IExcelColumn[] = columns.map(column => ({
    title: column.title,
    dataIndex: column.dataIndex
  }));
   const ExportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(excelColumns)
      .addDataSource(rows, {
        str2Percent: true
      })
      .saveAs(`${name}.xlsx`);
  };
return (<Layout onLoad={getMenuItems} style={{backgroundColor: '#E8E8E8'}}>
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

    <Content style={{ width: '100%', maxHeight: '1200px', margin: '20px 0px 0px 0px',backgroundColor:'#E8E8E8' }}>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer ,maxHeight:'720px' }}>
          <div>
            <h1 style={{textAlign: 'center', fontSize:'20px', paddingTop: '10px'}}>Các dữ liệu quản lý</h1>
          </div>
          <Button style={{marginLeft:'35px', backgroundColor:'#4BAE16', color:'white'}}><PlusCircleOutlined />Thêm bảng</Button>
          <Menu
            onClick={onClick}
            mode="inline"
            defaultSelectedKeys={['table3']}
            defaultOpenKeys={['table3']}
            style={{ height: '200px', borderRight: 0 }}
            items={data}
          />
          <div>
          <Divider />
            <h1 style={{textAlign: 'center', fontSize:'20px'}}>Dữ liệu đính kèm</h1>
            <button onClick={showModal2} className='button-25'>Tiêu chí dữ liệu đầu ra</button>
            <Modal width={750} title="Tiều chí dữ liệu đầu ra" open={isModalOpen2} onOk={handleOk2}  onCancel={handleCancel2}
                  footer={[
                    <Button key="OK" type="primary" onClick={handleOk2}>
                      OK
                    </Button>,
                  ]}>
                    <Button onClick={handleButtonClick}><EditOutlined/>Chỉnh sửa</Button> 
                  {isEditing1 ? (
                    <Input
                      placeholder={criteria}
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <div>{criteria}</div>
                  )}
                </Modal>
          </div>
        </Sider>
        <Content style={{ width: '100%', height: '720px',backgroundColor:'#E8E8E8' }}>
          <Layout>
            <Layout style={{ padding: '0 0px 0px',backgroundColor:'#E8E8E8' }}>
              <Content
                style={{
                  width: '100%',
                  maxWidth: '1230px',
                  padding: '24px',
                  margin: '0 0px 0px 25px',
                  minHeight: '700px',
                  background: colorBgContainer,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'25px' }}>
            <Button onClick={ExportExcel} style={{ marginRight: '10px'}}><ExportOutlined />Export</Button>
            <Button style={{ color: 'red'}} onClick={DeleteTable}><DeleteOutlined />Xóa</Button>                    {/*Xoa Table */}
          </div>
<Modal width={750} title="Chỉnh sửa tập dữ liệu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <EditBlock />
</Modal>

              <Form form={form} component={false} style={{ width: '100%', overflowX: 'auto' }} >
                 <Table 
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    columns={columns} 
                    dataSource={rows} 
                    key={count}
                    pagination={false}
                    bordered 
                    size="small"
                    scroll={{ y: 500}} // enable horizontal scrolling
                  />
              </Form>
                {NewRow ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {colName1.map((field) => (
                    <div key={field} className="form-field">
                      <label htmlFor={field}><h4>{field}</h4></label>
                      <Input
                        type="text"
                        id={field}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                  <div style={{marginTop: '23px'}}>
                  <button type='submit'
                  style={{backgroundColor: "#4CAF50", 
                  color: "#fff", 
                  margin:'0 7px', 
                  border: "none", 
                  borderRadius: "5px",
                  height: '32px',
                  width: '60px',
                  cursor: 'pointer'
                  }} 
                  onClick={handleAddData}>
                    Add
                  </button>
                  <Button onClick={ ()=> setNewRow(false) }>Cancel</Button>
                  </div>
                </div>
                ) : null
                } 
                {/* {NewRow ? null : (
                <button onClick={addrow} className='addrow'>
                     <h1 style={{fontSize:'17px', color:'white', padding:'6px 10px 2px 10px'}}>ADD NEW ROW</h1> 
                </button>)} */}
                
          <Modal title="Basic Modal" open={EditRecord} onOk={()=> {setEditRecord(false), console.log(formData2)}} onCancel={()=>setEditRecord(false)}>
            <div>
                {
                arr1 && arr1.map((field:any) => (
                    <div key={field} className="form-field">
                        <label htmlFor={field}><h4>{field}</h4></label>
                        <Input
                            type="text"
                            id={field}
                            name={field}
                            onChange={handleChange2}
                        />
                    </div>
                ))}
            </div>
          </Modal>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    </Content>

  </Layout>
  );
};

export default Main;