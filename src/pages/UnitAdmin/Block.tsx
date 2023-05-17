import React, { useEffect, useRef, useState } from 'react';
import { Layout, Row, Col, InputNumber, Form, Select } from 'antd';
const { Header, Content, Sider } = Layout;
import { Input, Button, Avatar, Menu, theme, Table, Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, ExclamationCircleFilled, PlusCircleOutlined, ExportOutlined, EditOutlined, DeleteOutlined, TableOutlined } from '@ant-design/icons';
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
import CreateTable from '../../Create-table/CreateTable';
import { create } from 'domain';
import Cookies from 'universal-cookie';
import { getBearerHeader, getUnit } from '../../utils';

interface IExcelColumn {
  title: string;
  dataIndex: string;
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
interface User {
  value: string;
  label: string;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    //console.log('http://localhost:5000/upload?block=' + curUnit + '_' + value + '&table=' + name)
    try {
      const response = await fetch('http://localhost:5000/import?block=' + curUnit + '_' + value + '&table=' + name, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        // Handle success case
      } else {
        console.error('File upload failed');
        // Handle error case
      }
    } catch (error) {
      console.error('An error occurred during file upload:', error);
    }
  };
  const location = useLocation();
  const value = location.state;
  const [form] = Form.useForm();
  interface Table {
    name: string;
    cols: string[];
    des: string[];
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => { setIsModalOpen(false); };
  const handleCancel = () => { setIsModalOpen(false); };
  const handleUserChange = (value: string) => {
    setAddUser(value)
  }
  const [curUnit, setCurUnit] = useState<string>("cs")
  const [addUser, setAddUser] = useState<string>("")
  const [Users, setUsers] = useState<User[]>([])
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => { 
    setIsModalOpen2(true); 
    handleCriteria(); 
  };
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowAddModal1, setShowAddModal1] = useState(false);
  const handleCancel2 = () => { setIsModalOpen2(false); };
  const [data, setData] = useState<ItemType[]>([])
  const { token: { colorBgContainer }, } = theme.useToken();
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

  const [EditRecord, setEditRecord] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any>({});
  const [createtable, setcreatetable] = useState<Table[]>([]);
  const [function_table, setfunction_table] = useState(false);
  const handleOk2 = async () => {
    setIsModalOpen2(false);
    try {
      await axios.post('http://localhost:5000/edit_criteria?block=cs_' + value + '&new=' + encodeURIComponent(inputValue));
    } catch (error) {
      console.error('Failed', error);
    }
    setIsEditing1(false)
  };

  const handleCriteria = async () => {
    try {
      const response = await axios.get('http://localhost:5000/show_criteria?block=cs_' + value);
      let crit: any = decodeURIComponent(response.data["body"])
      setCriteria(crit)
    } catch (error) {
      console.error('Failed', error);
      return [];
    }
  }
  const getTable = async (e: any) => {
    e.preventDefault();
    let item: Array<string> = [];
    let items2: MenuProps['items'] = [];
    try {
      const response = await axios.get('http://localhost:5000/show_tables?block_name=' + curUnit + '_' + value);
      const data1 = response.data;
      item = data1["body"]
      items2 = item.map((key) => ({
        key,
        label: `${key}`,
        icon: <TableOutlined />
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

  const ShowTable: MenuProps['onClick'] = async (e) => {
    let column: TableRow[] = [];
    setTableName(e.key)
    let row: TableRow[] = [];
    try {
      let url: any = "http://localhost:5000/show_inside?block_name=" + curUnit + "_" + value + "&table_name=" + e.key
      const response = await axios.get(url);
      const data1 = response.data; // extract the data from the response
      const arr = data1["body"];
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
    setfunction_table(true)
  };

  const handleButtonClick = () => {
    if (isEditing1 == true) {
      setCriteria(inputValue)
    }
    else {
      setInputValue(criteria)
    }

    setIsEditing1(!isEditing1);
    // setInputValue(criteria);
  };
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  async function getUsers() {
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
  const handleAddTable = async () => {
    let sql: any = "http://localhost:5000/create_tables?name=" + curUnit + "_" + value;
    let request: any = []
    for (var i in createtable) {
      let k: Table = {
        name: '',
        cols: [],
        des: []
      }
      k.name = createtable[i].name
      k.cols = createtable[i].cols
      k.des = createtable[i].des
      request.push(k)
    }
    try {
      await axios.post(sql, request);
    }
    catch (error) {
      console.error('Failed', error);
    }

    const newTable: ItemType = {
      "key": createtable[0].name,
      "label": createtable[0].name,
      "icon": <TableOutlined />
    }
    const sup: ItemType[] = [...data];
    sup.push(newTable)
    setData(sup)
    setcreatetable([])
  }
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
          await axios.delete("http://localhost:5000/delete_table?block=hcmut_" + value + "&table=" + name)
        }
        catch (error) {
          console.error('Failed', error);
        }
        const filteredArr = data.filter((obj) => obj.label !== name);
        setData(filteredArr)
        setRows([])
        setColumns([])
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const handleAddUser = async () => {
    try {
      let url: any = "http://localhost:5000/add_users?block=" + curUnit + "_" + value
      let body: string[] = []
      body.push(addUser)
      await axios.post(url, body);
      setAddUser("")
    } catch (error) {
      console.error('Error', error);
    }
  }
  const [NewRow, setNewRow] = useState(false);
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
  
  const menuItems2 = [
    <Menu.Item key="0" onClick={() => {
      const logoutEndpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/logout`

      const config = getBearerHeader()

      if (config !== undefined) {
        const cookies = new Cookies()
        const params = new URLSearchParams()
        params.append("client_id", "console")
        params.append("refresh_token", cookies.get("refresh_token"))

        axios.post(logoutEndpoint, params, config).then(res => {
          if (res.status === 204) {
            cookies.remove("access_token")
            cookies.remove("refresh_token")

            location.reload()
          }
        })
      }
    }}
      style={{ color: 'red' }}>
      Log out
    </Menu.Item>,
  ];
  return (<Layout onLoad={getTable} style={{ backgroundColor: '#E8E8E8' }}>
    <Header style={{ backgroundColor: '#020547', height: '50px' }}>
      <Row gutter={[16, 16]}>
        <Col className="Logo" xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 2 }} lg={{ span: 6 }} style={{ display: 'flex' }}>
          <img src="/logo.png" alt="logo" style={{ width: '35px', height: '35px', marginTop: '8px', marginLeft: '-25px' }} />
          <h1 style={{ color: 'white', marginLeft: '10px', marginTop: '-5px' }}>Quality Assurance</h1>
        </Col>

        <Col className="Search-bar" xs={{ span: 16 }} sm={{ span: 14 }} md={{ span: 14 }} lg={{ span: 8 }} style={{ marginTop: '10px' }}>
          <Search className="Search" placeholder="input search text" onSearch={onSearch} />
        </Col>
        <Col className="Bellout" xs={{ span: 2 }} sm={{ span: 2 }} md={{ span: 4 }} lg={{ span: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <BellOutlined className="bell" style={{ marginRight: '20px', color: 'white', fontSize: '28px' }} />
            <Avatar className="Avartar" size={30} icon={<UserOutlined />} style={{ backgroundColor: '#FF00FF' }} />
            <h1 style={{ margin: '-17px 5px 0px 20px', color: 'white' }}>
              <Dropdown overlay={<Menu>{menuItems2}</Menu>} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Unit-Manager
                </a>
              </Dropdown>
            </h1>
          </div>
        </Col>
      </Row>
    </Header>

    <Content style={{ width: '100%', maxHeight: '1200px', margin: '20px 0px 0px 0px', backgroundColor: '#E8E8E8' }}>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer, maxHeight: '720px' }}>
          <div>
            <h1 style={{ textAlign: 'center', fontSize: '20px', paddingTop: '10px' }}>Các dữ liệu quản lý</h1>
          </div>
          <Button style={{ marginLeft: '35px', backgroundColor: '#4BAE16', color: 'white' }} onClick={() => setShowAddModal(true)}><PlusCircleOutlined />
            Thêm bảng
          </Button>
          <Button style={{ marginLeft: '0px', backgroundColor: '#4BAE16', color: 'white' }} onClick={() => setShowAddModal1(true)}><PlusCircleOutlined />
            Thêm người nhập dữ liệu
          </Button>
          <Modal
            title="Thêm bảng"
            open={ShowAddModal}
            onOk={() => { setShowAddModal(false), handleAddTable() }}
            onCancel={() => setShowAddModal(false)}>
            <CreateTable tablesInfo={createtable} setTablesInfo={setcreatetable} />
          </Modal>
          <Modal
            title="Thêm relationship giữa các bảng"
            open={ShowAddModal1}
            onOk={() => { setShowAddModal1(false), handleAddUser() }}
            onCancel={() => setShowAddModal1(false)}>
            <div>
              {/* <TextArea rows={4} placeholder='Nhập tiêu chí đầu ra dữ liệu' value={InputDes} onChange={handleInputDes} /> */}
              <p>Chọn bảng một</p>
              <Select
                style={{ width: "200px", marginTop: "10px", marginBottom: "100px" }}
                onChange={handleUserChange}
                options={Users} />
              <Select
                style={{ width: "200px", marginTop: "10px", marginLeft: "50px" }}
                onChange={handleUserChange}
                options={Users} />
            </div>
          </Modal>
          <Menu
            onClick={ShowTable}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '200px', borderRight: 0 }}
            items={data}
          />
          <div>
            <Divider />
            <h1 style={{ textAlign: 'center', fontSize: '20px' }}>Dữ liệu đính kèm</h1>
            <button onClick={showModal2} className='button-25'>Tiêu chí dữ liệu đầu ra</button>
            <Modal width={750} title="Tiều chí dữ liệu đầu ra" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}
              footer={[
                <Button key="OK" type="primary" onClick={handleOk2}>
                  OK
                </Button>,
              ]}>
              <Button onClick={handleButtonClick}><EditOutlined />Chỉnh sửa</Button>
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
        <Content style={{ width: '100%', height: '720px', backgroundColor: '#E8E8E8' }}>
          <Layout>
            <Layout style={{ padding: '0 0px 0px', backgroundColor: '#E8E8E8' }}>
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
                {function_table ? (<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
                  <Button onClick={ExportExcel} style={{ marginRight: '10px' }}><ExportOutlined />Export</Button>
                  <Button style={{ color: 'red' }} onClick={DeleteTable}><DeleteOutlined />Xóa</Button>                    {/*Xoa Table */}
                </div>) : null}
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
                    scroll={{ y: 500 }} // enable horizontal scrolling
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
                    <div style={{ marginTop: '23px' }}>
                      <button type='submit'
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "#fff",
                          margin: '0 7px',
                          border: "none",
                          borderRadius: "5px",
                          height: '32px',
                          width: '60px',
                          cursor: 'pointer'
                        }} >
                        Add
                      </button>
                      <Button onClick={() => setNewRow(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : null
                }
                {/* {NewRow ? null : (
                <button onClick={addrow} className='addrow'>
                     <h1 style={{fontSize:'17px', color:'white', padding:'6px 10px 2px 10px'}}>ADD NEW ROW</h1> 
                </button>)} */}

                <Modal title="Basic Modal" open={EditRecord} onOk={() => { setEditRecord(false), console.log(formData2) }} onCancel={() => setEditRecord(false)}>
                  <div>
                    {
                      arr1 && arr1.map((field: any) => (
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