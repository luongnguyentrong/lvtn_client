import React, { useEffect, useState } from 'react';
import { Button, message, Steps, theme, Input, Select } from 'antd';
import CreateTable from '../../Create-table/CreateTable';
import axios from 'axios';
import { getUnit, toSlug } from '../../utils';
interface Table {
  name: string;
  cols: string[];
}

interface User {
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
  Modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  key: number
  name: string
  curUnit: string
  // reset: boolean
}

const CreateBlock: React.FC<IProps> = (props: IProps) => {
  const [TypeFile, setTypeFile] = useState<string>("");
  const { TextArea } = Input;
  const [tablesInfo, setTablesInfo] = useState<Table[]>([])
  const [Nameblock, setNameblock] = useState<string>("");
  const [InputDes, setInputDes] = useState<string>("");
  const [Users, setUsers] = useState<User[]>([])
  const [addUser, setAddUser] = useState<string>("")
  const [current, setCurrent] = useState(0);

  const handleNameBlockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameblock(event.target.value);
    console.log(Nameblock);
  };
  const handleLoad = () => {
    setCurrent(0)
  }
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
  async function handleDone() {
    let nameBlock = props.curUnit + "_" + toSlug(Nameblock)
    try {
      let request: any = {}
      request["disname"] = Nameblock
      request["norname"] = nameBlock
      let sql: any = "http://localhost:5000/create_block";
      await axios.post(sql, request);
    } catch (error) {
      console.error('Error creating database:', error);
    }
    try {
      let sql: any = "http://localhost:5000/create_tables?name=" + encodeURIComponent(nameBlock);
      let request: any = []
      for (var i in tablesInfo) {
        let k: Table = {
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
      await axios.post(sql, request);
    } catch (error) {
      console.error('Error', error);
    }
    try {
      let sql: any = "http://localhost:5000/add_des"
      let k: any = {
        "name": nameBlock,
        "display": Nameblock,
        "descript": encodeURIComponent(InputDes)
      }
      await axios.post(sql, k);
    } catch (error) {
      console.error('Error', error);
    }
    message.success('Processing complete!');
    try {
      let url: any = "http://localhost:5000/add_users?block=" + nameBlock
      let body: string[] = []
      body.push(addUser)
      await axios.post(url, body);
    } catch (error) {
      console.error('Error', error);
    }
    try {
      let url: any = "http://localhost:5000/add_users?block=" + nameBlock
      let body: string[] = []
      body.push(props.name)
      await axios.post(url, body);
    } catch (error) {
      console.error('Error', error);
    }
    props.setModal(false)
    setNameblock("")
    setTablesInfo([])
    setCurrent(0)
    setInputDes("")
    setUsers([])
  }

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
  const steps = [
    {
      title: 'Bước 1',
      content: <Input style={{ width: "50%" }} type='text' placeholder='Nhập tên vùng dữ liệu' value={Nameblock} onChange={handleNameBlockChange} />
    },
    {
      title: 'Bước 2',
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
        {TypeFile === 'table' && <CreateTable tablesInfo={tablesInfo} setTablesInfo={setTablesInfo} />}
      </>,
    },
    {
      title: 'Bước cuối',
      content:
        <div>
          Nhập tiêu chí đầu ra dữ liệu
          <TextArea rows={4} placeholder='Nhập tiêu chí đầu ra dữ liệu' value={InputDes} onChange={handleInputDes} />
          Chọn người nhập dữ liệu
          <Select
            style={{ width: "200px", marginTop: "10px" }}
            onChange={handleUserChange}
            options={Users} />
        </div>
    },
  ];

  const { token } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const error = (message: any) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const next = () => {
    if (current == 0) {
      let flag: any = 0;
      for (var x of props.folders) {
        if (x.name == Nameblock) {
          error("Tên tập dữ liệu đã tồn tại")
          flag = 1
        }
      }
      if (Nameblock == "") {
        error("Tên tập dữ liệu không được để trống")
        flag = 1
      }
      if (flag == 0) { setCurrent(current + 1); }
    }
    else { setCurrent(current + 1); }
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
    padding: 20,
    marginTop: 30,
  };
  return (
    <>{contextHolder}<div key={props.key} style={{ width: "700px" }}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 10 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleDone}>
            Xong
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Quay lại
          </Button>
        )}
      </div>
    </div>
    </>
  );
};


export default CreateBlock;