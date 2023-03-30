import React, { useState } from 'react';
import { Button, message, Steps, theme, Input, Select } from 'antd';
import CreateTable from '../../Create-table/CreateTable';

const CreateBlock: React.FC = () => {
    const [TypeFile, setTypeFile] = useState<string>("");
    const { TextArea } = Input;
    const [Nameblock, setNameblock] = useState<string>("");
    const [OutPut, setOutPut] = useState<string>("");
    const handleNameBlockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameblock(event.target.value);
  };
  const outPutData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOutPut(event.target.value);
  };
  const handleChange = (value: string) => {
    setTypeFile(value);
    console.log(`selected ${value}`);
  };
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
      { value: 'Table', label: 'Table' },
      { value: 'docx', label: 'docx' },
      { value: 'pdf', label: 'pdf' },
      { value: 'xlsx', label: 'xlsx'}
    ]}
  />
    {TypeFile === 'Table' && <CreateTable/>}
  </> ,
  },
  {
    title: 'Last',
    content: 
  <div>
    {/* <TextArea rows={4} />
    <br />
    <br />
    <TextArea rows={4} placeholder='Nhập tiêu chí đầu ra dữ liệu'  /> */}
    <TextArea rows={4} placeholder='Nhập tiêu chí đầu ra dữ liệu'  />
    <Input type='text' placeholder='Nhập tiêu chí đầu ra dữ liệu' value={OutPut} onChange={outPutData} />
    Chọn người nhập dữ liệu
    <Select
    style={{ width: 120, marginTop: "10px" }}
    onChange={handleChange}
    options={[
      { value: 'Manh', label: 'Manh' },
      { value: 'Luong', label: 'Luong' },
      { value: 'Khoa', label: 'Khoa' }
    ]}
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
    // lineHeight: '120px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    padding:20,
    marginTop:30,
  };

  return (
    <> <div style={{width: "700px"}}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 10 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
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