import { Form, Input, Modal, message } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react"
import API from "../api"
import BlockInfo from "../pages/Admin/Modals/BlockInfo"
import { useParams } from "react-router-dom"
import { getBearerHeader } from "../utils"
import axios from "axios"
interface IProps {
    open: boolean
    close: () => void
    upload: (file: any) => void
}

export default function (props: IProps) {
    const [form] = useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedFile, setSelectedFile] = useState(null);
    const { block_id, folder_name } = useParams()
    const handleOk = () => {
        form.validateFields().then(res => {
            props.upload(res.criteria)

            form.resetFields()
            props.close()
        })
    }
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        console.log(file)
        setSelectedFile(file);
    };
    const success = (message1: any) => {
        messageApi.open({
            type: 'success',
            content: message1,
        });
    };
    const uploadFile = async (event: React.FormEvent) => {
        //event.preventDefault()
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log(formData)
        //console.log('http://localhost:5000/blocks/' + block_id + '/folders/' + encodeURIComponent(folder_name) + '/upload')
        try {
            if (folder_name){
            getBearerHeader().then(config => {
                return axios.post('http://localhost:5000/blocks/' + block_id + '/folders/' + encodeURIComponent(folder_name) + '/upload', formData, config)
            }).then(res => {
                if (res.status == 200) {
                    success("Upload file thành công");
                    form.reset();
                }
                else {
                    console.error('File upload failed');
                }
            })
            }
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields()
        props.close()
    }

    return (
        <Modal title="Upload file" open={props.open} onOk={handleOk} onCancel={handleCancel}>
            <form onSubmit={uploadFile} encType="multipart/form-data" className="upload-form">
                <label htmlFor="upload" className="file-label">
                    {selectedFile ? selectedFile.name : 'Choose a file'}
                    <input type="file" name="upload" id="upload" className="file-input" onChange={handleFileChange} />
                </label>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </Modal>
    )
}