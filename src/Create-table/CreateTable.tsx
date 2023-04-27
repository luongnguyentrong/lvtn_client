import React, { RefObject, useRef, useState } from 'react';
import axios from 'axios';
import { Button, message, Steps, theme, Input, Select } from 'antd';
import { json } from 'stream/consumers';
import CreateBlock from '../pages/UnitAdmin/CreateBlock';
interface cols {
  colsname: string;
  type: string;
  descript: string;
}

interface Table {
  name: string;
  cols: string[];
  des: string[];
}

interface IProps {
  tablesInfo: Table[] 
  setTablesInfo: React.Dispatch<React.SetStateAction<Table[]>>
}

const CreateTable = (props: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = (message: any) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };
  const formRef: RefObject<HTMLFormElement> = useRef(null);
  const [Tablename, setTableName] = useState<string>("");
  const [fields, setFields] = useState<cols[]>([{ colsname: "", type: "", descript: ""}]);
  //const [tables, setTables] = useState<Table[]>([]);
  const handleFieldNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].colsname = event.target.value;
    setFields(newFields);
  };
  
  const handleFieldTypeChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFields = [...fields];
    newFields[index].type = event.target.value;
    setFields(newFields);
  };
  const handleDescriptChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].descript = event.target.value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { colsname: '', type: '', descript: ''}]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleTableNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    for (var x of props.tablesInfo){
      if (x.name == Tablename){
          error("Tên table đã tồn tại")
          return
      }
    }
    var cols: string[] = []
    let k : Table = {name: "", cols: [], des: []}
    let sub: string[] = []
    cols.push("ID SERIAL PRIMARY KEY")
    sub.push("Id")
    for (var i in fields) {
      cols.push(fields[i].colsname + " " + fields[i].type)
      sub.push(fields[i].descript)
    }
    k.name = Tablename
    k.cols = cols
    k.des = sub
    let newTables: Table[] = props.tablesInfo
    newTables.push(k)
    props.setTablesInfo(newTables)
    setTableName("")
    setFields([{ colsname: "", type: "" , descript: ""}])
  };

  return (
    <div>
      {contextHolder} 
   <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
  <label style={{paddingLeft: "0px", fontSize: "1.2rem", paddingTop: '10px'}}> 
    Table name:
    <Input style={{width: "50%",  marginLeft: "10px"}} type="text" value={Tablename} onChange={handleTableNameChange} />
  </label>
  <table style={{borderCollapse: "collapse", marginTop: "20px"}}>
    <thead>
      <tr style={{backgroundColor: "#ccc"}}>
        <th style={{padding: "10px", textAlign: "left"}}>Field name</th>
        <th style={{padding: "10px", textAlign: "left"}}>Field type</th>
        <th style={{padding: "10px", textAlign: "left"}}>Description</th>
        <th style={{padding: "10px", textAlign: "left"}}>Action</th>
      </tr>
    </thead>
    <tbody>
      {fields.map((field, index) => (
        <tr key={index} style={{backgroundColor: index % 2 === 0 ? "#f2f2f2" : "transparent"}}>
          <td style={{padding: "10px"}}>
            <Input type="text" value={field.colsname} onChange={(event) => handleFieldNameChange(index, event)} />
          </td>
          <td style={{padding: "10px"}}>
            <select style={{
              borderRadius: "6px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "14px",
              height: '31px',
              outline: "none",
              minWidth: "150px"
               }} value={field.type} onChange={(event) => handleFieldTypeChange(index, event)}>
              <option value="">-- Select Data Type --</option>
              <option value="text">Text</option>
              <option value="integer">Integer</option>
              <option value="boolean">Boolean</option>
              <option value="serial">Autonumber</option>
              <option value="date">Date</option>
            </select>
          </td>
          <td style={{padding: "10px"}}>
            <Input type="text" value={field.descript} onChange={(event) => handleDescriptChange(index,event)}/>
          </td>
          <td style={{padding: "10px"}}>
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveField(index)} style={{backgroundColor: "#ff0000", color: "#fff", padding: "5px 10px", border: "none", borderRadius: "5px"}}>
                Remove
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div style={{display: "flex", justifyContent: "space-between", width: "100%", marginTop: "20px"}}>
    <Button  onClick={handleAddField} style={{backgroundColor: "#1a8cff", color: "#fff", border: "none", borderRadius: "5px",marginLeft:'7px'}}>
      Add field
    </Button>
    <button type='submit' style={{backgroundColor: "#4CAF50", color: "#fff", marginRight:'7px', border: "none", borderRadius: "5px"}}>
      Create table
    </button>
  </div>
</form>


     {props.tablesInfo.length >= 1 ? (
        props.tablesInfo.map((table) => (
          <div key={table.name} style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ marginRight: "20px" }}>{table.name}:</h1>
            <div style={{ display: "flex" }}>
              {table.cols.map((col) => (
                <span key={col} style={{ marginRight: "10px" }}>
                  {col}
                </span>
              ))}
            </div>
          </div>
        ))
      ) : null}
      
    </div>
  );
};

export default CreateTable;