import React, { useState, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';

interface S3UploaderProps {
  apiEndpoint: 'https://er37kclyy9.execute-api.ap-southeast-1.amazonaws.com/dev/lvtnstorage/Untitled.png';
}

interface S3UploaderState {
  selectedFile: File | null;
}

interface S3UploadResponse {
  url: string;
}

const S3Uploader: React.FC<S3UploaderProps> = ({ apiEndpoint }) => {
  const [state, setState] = useState<S3UploaderState>({
    selectedFile: null,
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setState({ selectedFile: file || null });
  };

  const handleFileUpload = async () => {
    if (!state.selectedFile) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', state.selectedFile);

    try {
      const response: AxiosResponse<S3UploadResponse> = await axios.put(apiEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`File uploaded to S3 with URL: ${response.data.url}`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading the file!');
    }
  };

  return (
    <div>
      <h1>Upload a file to AWS S3</h1>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default S3Uploader;