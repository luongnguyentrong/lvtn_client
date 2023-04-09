import React, { useEffect, useState } from 'react';
import { Button, message, Steps, theme, Input, Select } from 'antd';
import CreateTable from '../../Create-table/CreateTable';
import axios from 'axios';
import { getUnit } from '../../utils';
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

const CreateBlock: React.FC = () => {
    const [TypeFile, setTypeFile] = useState<string>("");
    const { TextArea } = Input;
    const [tablesInfo, setTablesInfo] = useState<Table[]>([])
    const [Nameblock, setNameblock] = useState<string>("");
    const [InputDes,setInputDes] = useState<string>("string");
    const [Users,setUsers] = useState<User[]>([])
    const handleNameBlockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameblock(event.target.value);
  };
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
        //await axios.post(sql);
      } catch (error) {
      console.error('Error creating database:', error);
      }
      try {
        let sql: any = "http://localhost:5000/create_tables?name=" + encodeURIComponent(Nameblock);
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
        //await axios.post(sql,request);
      } catch (error) {
      console.error('Error creating database:', error);
      }
      try {
        let sql: any = "http://localhost:5000/add_des"
        let k: any = {
          "name": nameBlock,
          "display":"",
          "descript": encodeURIComponent(InputDes)
        }
        //await axios.post(sql);
      } catch (error) {
      console.error('Error creating database:', error);
      }
      try {
        let sql: any = "http://localhost:5000/add_users"
        let k: any = {
          "name": nameBlock,
          "display":"",
          "descript": encodeURIComponent(InputDes)
        }
        //await axios.post(sql);
      } catch (error) {
      console.error('Error creating database:', error);
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
      content: <>
          Chọn cách nhập dữ liệu
      <Select
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'Table', label: 'Table' },
        { value: 'docx', label: 'docx' },
        { value: 'pdf', label: 'pdf' }
      ]}
    />
      {TypeFile === 'Table' && <CreateTable tablesInfo={tablesInfo} setTablesInfo={setTablesInfo}/>}
    </> ,
    },
    {
      title: 'Last',
      content: 
    <div>
      <TextArea rows={4} placeholder='Nhập tiêu chí đầu ra dữ liệu' value={InputDes} onChange={handleInputDes}/>
      Chọn người nhập dữ liệu
      <Select
      style={{ width: "200px", marginTop: "10px" }}
      options={Users}
    />
      </div> 
    },
  ];
    
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
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
    <> <div style={{width: "700px"}}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{ steps[current].content}</div>
      <div style={{ marginTop: 10 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleDone}>
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


export default CreateBlock;