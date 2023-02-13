import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'myFile',
  action: 'http://localhost:3333/upload_to_s3',
  method: 'POST',
  withCredentials: true,
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

const UploadSection: React.FC = () => (
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      );

      export default UploadSection;