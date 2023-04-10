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
    <form  onSubmit={handleSubmit} className="create">
      <label style={{paddingLeft: "0px"}}> 
        Table name:
        <Input style={{width: "50%", paddingLeft: "0px"}}  type="text" value={Tablename} onChange={handleTableNameChange} />
      </label>
      <table >
        <thead>
          <tr>
            <th>Field name</th>
            <th>Field type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>
                <Input  type="text" value={field.colsname} onChange={(event) => handleFieldNameChange(index, event)} />
              </td>
              <td>
                <select  value={field.type} onChange={(event) => handleFieldTypeChange(index, event)}>
                  <option value="">-- Select Data Type --</option>
                  <option value="text">Text</option>
                  <option value="integer">Integer</option>
                  <option value="boolean">Boolean</option>
                  <option value="serial">Autonumber</option>
                  <option value="date">Date</option>
                </select>
              </td>
              <td>
                <Input  type="text" value={field.descript} onChange={(event) => handleDescriptChange(index,event)}/>
              </td>
              <td>
                {index > 0 && (
                  <button  type="button" onClick={() => handleRemoveField(index)}>
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddField} className="createbtt">
        Add field
      </button>
      <button type="submit" className="createbtt">Create table</button>
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