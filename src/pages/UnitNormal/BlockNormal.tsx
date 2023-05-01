import React, {useRef, useState } from 'react';
import { Layout, Row, Col, InputNumber, Form,} from 'antd';
const { Header,Content, Sider } = Layout;
import { Input, Button, Avatar, Tooltip, Menu, theme, Table, Divider} from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, EditOutlined,UploadOutlined,ExportOutlined, DeleteOutlined,TableOutlined,ExclamationCircleFilled} from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Modal } from 'antd';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { useLocation } from "react-router-dom";
import { Excel } from "antd-table-saveas-excel";
import './Block-N.css'
import DownloadLink from "react-download-link";
import { test } from 'node:test';
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

const Main = () => {
  const [form] = Form.useForm();
  const [isEditing1, setIsEditing1] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleOk2 = () => {setIsModalOpen2(false);};
  const handleCancel2 = () => {setIsModalOpen2(false);};
  const [NewRow, setNewRow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
  const showModal2 = () => { setIsModalOpen2(true); handleCriteria();};
  const [messageApi, contextHolder] = message.useMessage();
  const [EditRecord, setEditRecord] = useState(false);
  const [curUnit, setCurUnit] = useState<string>("cs")
  const [currentRecord, setCurrentRecord] = useState<any>({});
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      //const response = await fetch('http://localhost:5000/import?block=' + curUnit + '_' + value + '&table=' + name, {
      const response = await fetch('http://localhost:5000/import_with_excel?block=' + curUnit + '_' + value + '&table=' + name, {
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
  const [formData2, setFormData2] = useState({});
  const [function_table,setfunction_table] = useState(false);
  const [ListFile, setListFile] = useState([]);
  const addrow = () =>{
    setNewRow(true);
  }
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const getMenuItems = async (e: any) => {
    e.preventDefault();
    let item: Array<string> = [];
    let items2: MenuProps['items'] = [];
    try {
      const response = await axios.get('http://localhost:5000/show_tables?block_name=cs_'+value);
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
    console.log(x);
    setRows(x)
    let newCount: number = count + 1
    setCount(newCount);
    setFormData({})
    setNewRow(false)
  };
  const handleEditData = async () =>{
    // const formValues = Object.values(formData2);
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

  const DeleteRerord = async (record: TableRow) => {
    Modal.confirm({
      title: 'Xóa dòng',
      icon: <ExclamationCircleFilled />,
      content: 'Bạn có chắc chắn muốn xóa dòng dữ liệu này?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      async onOk() {
        try {
          let url: any = 'http://localhost:5000/delete_row?block=hcmut_' + value +'&table=' + ref1.current + '&id=' + record.id;
          await axios.delete(url);
        }
        catch (error) {
          console.error('Failed', error);
        }
        let sup: TableRow[] = ref.current?.filter(row => row.id !== 10000000) || [];
        if (record) {
          sup.splice(sup.indexOf(record), 1);
          sup.forEach((obj: TableRow, index: number) => {
            obj.key = index + 1;
          });
        }
        setRows(sup)
        console.log(sup)
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
  const success = (message1: any) => {
    messageApi.open({
      type: 'success',
      content: message1,
    });
  };
  const uploadFile = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:5000/upload_files?block='+value, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        //console.log('File uploaded successfully');
        success("Upload file thành công");
        form.reset();
      } else {
        console.error('File upload failed');
        // Handle the failed response
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error
    }
  };
  const onClick: MenuProps['onClick'] = async (e) => {
    let column: TableRow[] = [];
    setTableName(e.key)
    let row: TableRow[] = [];
    try {
      let url: any = "http://localhost:5000/show_inside?block_name=cs_" + value + "&table_name="+e.key
      const response = await axios.get(url);
      const data = response.data; // extract the data from the response
      const arr = data["body"];
      column = arr[0]
      row = arr[1]
      const   transformedList = row.map(({ key, row }) => ({
        key,
        ...row
      }));
      let k: any = {
        title: 'Actions',
        dataIndex: 'Actions',
        width: 110,
        render: (_: any, record: TableRow) => (
          <>
        <Tooltip title='Edit' placement="left" color='#646464'>
          <button
            onClick={() => {showEditRecord(record), console.log(record)}}
            className='ButtonEdit'
          >
              <EditOutlined />
          </button>
        </Tooltip>
        <Tooltip title='Delete' placement="right" color='#646464'>
          <button 
            onClick={()=> DeleteRerord(record)}
            className='ButtonDelete'
          >
            <DeleteOutlined/>
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
    setfunction_table(true)
  };
  const handleButtonClick = () => {
    window.open('http://167.172.70.223:8080/superset/dashboard/1/?native_filters_key=A-BM7FEk1wsmidor1E5yaSxBDY5gW25OPQTuE7VKfwQyPULmEfZ4oLq1lU9yOchh', '_blank');
  };
  const handleCriteria = async ()=>{
    try {
      const response = await axios.get('http://localhost:5000/show_criteria?block=hcmut_' + value);
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
  const index = arr3.indexOf('key')
  if (index > -1){
    arr3.splice(index,1)
  }
  const index2 = arr3.indexOf('id')
  if (index > -1){
    arr3.splice(index2,1)
  }
  const handleDownload = async () => {
    const response = await fetch(testUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fileName.txt";
    link.click();
  };
  const newColumns = columns.slice(0, -1);
  const excelColumns: IExcelColumn[] = newColumns.map(column => ({
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
  const testUrl = "https://lvtnstorage.s3.ap-southeast-1.amazonaws.com/code.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVQKWVG6WAUWPSHWR%2F20230428%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230428T093239Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=64a8b6fc24bf3df9eb549b76ff146a7b774a30019a14f9a903d2d7c344c829e0"
  const fileName = "fileName.txt";
  return (
    <> <div>
      <button onClick={handleDownload}>Download</button>
    </div>
{contextHolder}<Layout onLoad={getMenuItems} style={{backgroundColor: '#E8E8E8'}}>
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
  
            <form onSubmit={uploadFile} encType="multipart/form-data" className="upload-form">
              <label htmlFor="upload" className="file-label">
                 {selectedFile ? selectedFile.name : 'Choose a file'}
                <input type="file" name="upload" id="upload" className="file-input" onChange={handleFileChange} />
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          
          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload> */}
          </div>
        </Sider>
        <Content style={{ width: '100%', height: '720px', margin: '0 0',backgroundColor:'#E8E8E8' }}>
            <div>
              <h2>Upload Form</h2>
              <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
              </form>
            </div>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'15px' }}>
          {function_table ? (<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom:'5px' }}>
            <Button onClick={ExportExcel} style={{ marginRight: '10px'}}><ExportOutlined />Export</Button>
          </div>) : null} 
          </div>
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
                  scroll={{ y: 500 }}
                  bordered
                  size="small"
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
                {NewRow ? null : (
                <button onClick={addrow} className='addrow'>
                     <h1 style={{fontSize:'17px', color:'white', padding:'6px 10px 2px 10px'}}>ADD NEW ROW</h1> 
                </button>)}
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
  </>
  );
};

export default Main;