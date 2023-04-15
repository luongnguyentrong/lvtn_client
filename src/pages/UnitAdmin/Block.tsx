import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Layout, Row, Col, Popconfirm, InputNumber, Form, Typography } from 'antd';
const { Header, Footer, Content, Sider } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table } from 'antd';
import type { MenuProps } from 'antd';
import { BellFilled, UserOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Modal } from 'antd';
import CreateBlock from './CreateBlock';
import EditBlock from './EditBlock';
import { FaFileExcel } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import './block.css'
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

const Main = () => {
  const location = useLocation();
  const value = location.state;
 
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(''); 
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {setIsModalOpen(true);};
  const handleOk = () => {setIsModalOpen(false);};
  const handleCancel = () => {setIsModalOpen(false);};

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {setIsModalOpen2(true);};
  const handleOk2 = () => {setIsModalOpen2(false);};
  const handleCancel2 = () => {setIsModalOpen2(false);};

  const cancel = () => {setEditingKey('');};

  const edit = (record: Partial<TableRow> & { key: React.Key }) => {
    form.setFieldsValue({ id: '', col1: '', col2: '', ...record });
  };
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
      console.log(ref1.current)
      request["name"] = ref1.current
      request["col"] = [entries[1][0], entries[1][1]]
      console.log(request)
      try {
        await axios.post('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/delete', request);
        console.log('Delete successfully!');
      } catch (error) {
        console.error('Error creating table:', error);
      }
    }
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
  const mergedColumns = ref2.current.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TableRow) => ({
        record,
        inputType: col.dataIndex === 'col1' ? 'col2' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  // const FileName = ({ name:string }) => <span>{name}.xlsx</span>;
  return (<Layout onLoad={getMenuItems}>
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
        <h1 style={{margin:'-5px 5px 0px 20px', color:'white'}}>SuperUser</h1>
      </div>
    </Col>
  </Row>
</Header>

    <Content style={{ width: '100%', height: '1000px', margin: '20px 0px 0px 0px' }}>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
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
              <div>Làm t báo cáo</div> 
                </Modal>
          </div>
        </Sider>
        <Content style={{ width: '100%', height: '1000px', margin: '0 0' }}>
          <Layout>
            <Layout style={{ padding: '0 0px 0px' }}>
              <Content
                style={{
                  width: '100%',
                  maxWidth: '1280px',
                  padding: '24px',
                  margin: '0 0px 0px 25px',
                  minHeight: '280px',
                  background: colorBgContainer,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button style={{ marginRight: '10px', color: 'red' }}><DeleteOutlined />Xóa</Button>                    {/*Xoa block */}
  <Button onClick={showModal}><EditOutlined />Chỉnh sửa</Button>         {/* Chỉnh sửa block (table hoặc người được phân quyền) */}
</div>
<Modal width={750} title="Chỉnh sửa tập dữ liệu" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <EditBlock />
</Modal>

                <br />
                <br />
                <div style={{ display: "flex", alignItems: "center" }}>
                  {colName1.map((field) => (
                    <div key={field} className="form-field">
                      <label htmlFor={field}><h4>{field}</h4></label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              {rows.length === 0 ? null : (
                <Table dataSource={rows} columns={columns}/>
                )}
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

export default Main;