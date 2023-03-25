import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

interface Table {
  name: string;
}
const TableList: React.FC = () => {
    const [tables, setTables] = useState<Table[]>([]);
    useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('https://ze784hzaxd.execute-api.ap-southeast-2.amazonaws.com/khoa/show'); 
        const tableData = response.data.body.map((name: string) => ({ name }));
        setTables(tableData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTables();
  }, []);

  return (
    <div>
      <h1>List of Tables</h1>
        {tables.map(table => (
          <button key={table.name}>
            {table.name}
            </button>
        ))}
      
    </div>
  );
};

export default TableList;