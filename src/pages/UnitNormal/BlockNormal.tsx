import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, InputNumber, Form,} from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Tooltip , Menu, theme, Table } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, EditOutlined,UploadOutlined, DeleteOutlined,TableOutlined,ExclamationCircleFilled} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Modal } from 'antd';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { useLocation } from "react-router-dom";
import './Block-N.css'
import { red } from '@ant-design/colors';
interface TableRow {
  [key: string]: any;
  // key: string;
  // name: string;
  // age: number;
  // address: string;
}

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
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

const Main = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const cancel = () => {setEditingKey('');};
  const [isEditing1, setIsEditing1] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleOk2 = () => {setIsModalOpen2(false);};
  const handleCancel2 = () => {setIsModalOpen2(false);};
  const [NewRow, setNewRow] = useState(false);

  const edit = (record: TableRow) => {
    form.setFieldsValue({ id: '', col1: '', col2: '', ...record });
    setEditingKey(record.key);
    console.log(record)
    // console.log(record.key)
    // setEditable(true)
  };
  // console.log(editingKey);
  const location = useLocation();
  const value = location.state;
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
  // const [editable, setEditable] = useState(false);
  const showModal2 = () => { setIsModalOpen2(true); handleCriteria();};

  const [EditRecord, setEditRecord] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any>({});

  const [formData2, setFormData2] = useState({});

  const addrow = () =>{
    setNewRow(true);
  }
  const isEditing = (record: TableRow) => record.key === editingKey;
  
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as TableRow;

      const newRows = [...rows];
      const index = newRows.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newRows[index];
        newRows.splice(index, 1, {
          ...item,
          ...row,
        });
        setRows(newRows);
        setEditingKey('');
      } else {
        newRows.push(row);
        setRows(newRows);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
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
  const handleAddData = async () => {
    const formValues = Object.values(formData);
    let k: any = {}
    let n: any = ref.current
    let kh: any = [1]
    if (rows.length != 0) {
      kh = [n[n.length - 1].id + 1]
    }
    k["name"] = name
    k["value"] = [...kh, ...formValues]
    k["col"] = colName
    console.log("kkkkk", k)
    try {
      axios.post('http://localhost:5000/add_data?block=hcmut_' + value, k);
    } catch (error) {
      console.error('Failed', error);
      return [];
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
    let z1 = [...kh, ...formValues]
    for (const ele of zz) {
      zzz[ele] = z1[i]
      i++
    }
    x.push(zzz)
    setRows(x)
    let newCount: number = count + 1
    setCount(newCount);
    setFormData({})
    setNewRow(false)
  };
  const handleEditData = async () =>{
    const formValues = Object.values(formData2);
    let k: any = {}
    k["table"] = name
    k["cond"] = currentRecord["id"]
    k["change"] = formData2
    try {
      axios.post('http://localhost:5000/edit_row?block=hcmut_' + value,k);
    } catch (error) {
      console.error('Failed', error);
      return [];
    }
    let x: number = currentRecord["key"] - 1
    for (const key in formData2) {
      if (formData2.hasOwnProperty(key)) {
        rows[x][key] = (formData2 as any)[key];
      }
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
      let request: any = {}
      // console.log(ref1.current)
      request["name"] = ref1.current
      request["col"] = [entries[1][0], entries[1][1]]
      console.log(request)
      try {
        // await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/delete', request);
        console.log('Delete successfully!');
      } catch (error) {
        console.error('Error creating table:', error);
      }
    }
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
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
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
      const   transformedList = row.map(({ key, row }) => ({
        key,
        ...row
      }));
      // setColumns(column)
      let k: any = {
        title: 'Actions',
        dataIndex: 'Actions',
        width: 200,
        render: (_: any, record: TableRow) => (
          <>
        <Tooltip title='Edit' color='#646464'>
          <button
            onClick={() => showEditRecord(record)}
            className='ButtonEdit'
          >
              <EditOutlined style={{ fontSize: '20px', color: '#767676' }} />
          </button>
        </Tooltip>
        <Tooltip title='Delete' color='#646464'>
          <button 
            onClick={()=> DeleteRerord()}
            className='ButtonDelete'
          >
            <DeleteOutlined style={{ fontSize: '20px', color: '#767676' }} />
          </button>
        </Tooltip>
          </>
        )
      };
      column.push(k)
      column[0].width = 50;
      setCount(row.length)
      setColumns(column)
      setRows(transformedList)
      
      setColName(arr[2])
      arr[2].shift()
      setColName1(arr[2])
    } catch (error) {
      console.error('Failed', error);
    }
  };
  // const mergedColumns = ref2.current.map((col) => {
  //   // console.log(columns)
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record: TableRow) => ({
  //       record,
  //       inputType: col.dataIndex === 'col1' ? 'col2' : 'text',
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });
  const handleButtonClick = () => {
    window.open('http://167.172.70.223:8080/superset/dashboard/1/?native_filters_key=A-BM7FEk1wsmidor1E5yaSxBDY5gW25OPQTuE7VKfwQyPULmEfZ4oLq1lU9yOchh', '_blank');
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
  const arr1 = Object.keys(currentRecord);
  const arr2 = Object.keys(currentRecord).map(key => currentRecord[key]);
  const arr3 = arr1
  arr3.pop()
  arr3.shift()
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
          <Menu
            onClick={onClick}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '200px', borderRight: 0 }}
            items={data}
          />
          <div>
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
        <Content style={{ width: '100%', height: '720px', margin: '0 0',backgroundColor:'#E8E8E8' }}>
          <Layout>
            <Layout style={{ padding: '0 0px 0px',backgroundColor:'#E8E8E8' }}>
              <Content
                style={{
                  width: '100%',
                  maxWidth: '1200px',
                  padding: '24px',
                  margin: '0 0px 0px 25px',
                  minHeight: '700px',
                  background: colorBgContainer,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >

                <Form form={form} component={false}>
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
                  scroll={{x: 400, y : 550}}
                  bordered
                  style={{borderStyle:'groove'}}/>
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
                  <button
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
                {NewRow ? null : (<Button onClick={addrow} style={{ width: 'fit-content',  marginLeft: 'auto'}}>Add new row</Button>)}
                <Modal title="Basic Modal" open={EditRecord} onOk={()=> {setEditRecord(false), handleEditData()}} onCancel={()=>setEditRecord(false)}>
            <div>
                {
                arr3 && arr3.map((field:any) => (
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