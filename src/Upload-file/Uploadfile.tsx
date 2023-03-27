import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface S3UploaderProps {
  apiEndpoint: string;
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
    formData.append('upload', state.selectedFile);

    try {
      const response: AxiosResponse<S3UploadResponse> = await axios.post(apiEndpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Upload file successfully")
    } catch (error) {
      console.error(error);
      alert('An error occurred while uploading the file!');
    }
  };

  return (
    <div>
      <h1>Upload files</h1>
      <form>
        <input type="file" name="upload" onChange={handleFileSelect} />
        <button type="button" onClick={handleFileUpload}>Upload</button>
      </form>
    </div>
  );
};

export default S3Uploader;