import React, { useState } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { Input, Button, Avatar, Breadcrumb, Menu, theme, Dropdown, Table, Divider, Space, Card } from 'antd';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { DatabaseTwoTone, PlusOutlined, EllipsisOutlined, ExclamationCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Search } = Input;
const onSearch = (value: string) => console.log(value);
import axios from 'axios';
import { Modal } from 'antd';
import './Unitadmin.css';
import CreateBlock from './CreateBlock';
import { getBearerHeader, getUnit } from '../../utils';
import Cookies from 'universal-cookie';

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
//////////////////////////////////////////////////////////////////////////
const { confirm } = Modal;

interface IProps {
    name: string;
}
interface TableRow {
    [key: string]: any;
}
interface VirtualFolder {
    name: string;
}

const UnitAdmin = (props: IProps) => {
    const [virtualFolders, setVirtualFolders] = useState<VirtualFolder[]>([{ name: "" }]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => { setIsModalOpen(true); };
    const [resetKey, setResetKey] = useState(0);
    const handleCancel = () => { setIsModalOpen(false); setResetKey(resetKey + 1) };
    const { token: { colorBgContainer }, } = theme.useToken();
    const [deleteBlock, setDeleteBlock] = useState("")
    const [EditBlockName, setEditBlockName] = useState("");
    const [curUnit, setUnit] = useState("cs");
    const [isSuperUnit, setIsSuperUnit] = useState(true)
    const [open, setOpen] = useState(false);


    const showEditBlock = () => {
        setOpen(true);
    }

    function handleDeleteBlock(name: any) {
        setDeleteBlock(name)
    }

    const handleShowBlock = async () => {

        try {
            const response = await axios.get('http://localhost:5000/show_folders_normal?user=' + props.name);
            const response1 = response.data["body"].map((item: any) => item.substring(item.indexOf("_") + 1));
            let folderList: VirtualFolder[] = []
            for (var ele of response1) {
                var c: VirtualFolder = { name: "" };
                c.name = ele
                folderList.push(c)
            }
            setVirtualFolders(folderList)
        } catch (error) {
            console.error('Failed', error);
            return [];
        }
    }
    let k = 1;
    const ChangeBlockName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditBlockName(event.target.value);
        // setDeleteBlock(event.target.value);
    };

    const DeleteBLock = () => {
        confirm({
            title: 'Xóa tập dữ liệu',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn muốn xóa tập dữ liệu này?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            async onOk() {
                try {
                    console.log(deleteBlock)
                    //await axios.delete('http://localhost:5000/delete?block=hcmut_' + deleteBlock);
                }
                catch (error) {
                    console.error('Failed', error);
                }
                handleShowBlock();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div>
                    <div onClick={showEditBlock}>  <EditOutlined /> chỉnh sửa</div>
                    <Modal
                        title='Sửa tên tập dữ liệu'
                        open={open}
                        onCancel={() => { setOpen(false); }}
                        maskClosable={false}
                        mask={false}
                        wrapClassName="custom-modal"
                        footer={[
                            <Button key="Hủy" onClick={() => { setOpen(false) }}>Hủy</Button>,
                            <Button key="Submit" type='primary'
                                onClick={async () => {
                                    setOpen(false);
                                    try {
                                        console.log(EditBlockName);
                                        let request: any = {}
                                        request["new"] = "hcmut_" + EditBlockName
                                        request["old"] = "hcmut_" + deleteBlock
                                        await axios.post('http://localhost:5000/edit_blockname', request);
                                        const filteredList: VirtualFolder[] = virtualFolders.map((element: VirtualFolder) => {
                                            if (element.name == deleteBlock) {
                                                element.name = EditBlockName
                                                return element;
                                            }
                                            return element;
                                        });
                                        setVirtualFolders(filteredList)
                                    }
                                    catch (error) {
                                        console.error('Failed', error);
                                    }
                                }}>
                                Lưu</Button>
                        ]}
                    >
                        Tên
                        <Input type="text" placeholder={deleteBlock} onChange={ChangeBlockName} />
                    </Modal>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div style={{ cursor: 'pointer' }} onClick={DeleteBLock}><DeleteOutlined />  Xóa</div>
            ),
        },
    ];
    const navigate = useNavigate();

    function handleClick(value: any) {
        navigate("/Unitadmin/block", { state: value })
    }

    const menuItems2 = [
        <Menu.Item key="0" onClick={() => {
            const logoutEndpoint = `https://sso.ducluong.monster/realms/${getUnit()}/protocol/openid-connect/logout`

            const config = getBearerHeader()

            if (config !== undefined) {
                const cookies = new Cookies()
                const params = new URLSearchParams()
                params.append("client_id", "console")
                params.append("refresh_token", cookies.get("refresh_token"))

                axios.post(logoutEndpoint, params, config).then(res => {
                    if (res.status === 204) {
                        cookies.remove("access_token")
                        cookies.remove("refresh_token")

                        location.reload()
                    }
                })
            }
        }}
            style={{ color: 'red' }}>
            Log out
        </Menu.Item>,
    ];
    return (
        <Content style={{ width: '100%', height: '1000px', margin: '20px 0px' }}>
            <Layout>
                <Content style={{ width: '100%', height: '1000px' }}>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            style={{
                                width: '100%',
                                maxWidth: '1400px',
                                padding: '24px',
                                margin: '0 auto',
                                minHeight: '280px',
                                background: colorBgContainer,
                            }}
                        >
                            <div className='header'>
                                <h1 style={{ fontSize: '20px' }}>Tập dữ liệu</h1>
                                <div className='btn-wrapper'>
                                    {isSuperUnit && ( // Only render the button if `a` is true
                                        <Button onClick={showModal} style={{ backgroundColor: '#32CD32', color: 'white', height: '40px' }}>
                                            Thêm tập lưu trữ
                                        </Button>
                                    )}
                                    <Modal width={750} title="Thêm mới tập dữ liệu" open={isModalOpen} onCancel={handleCancel}
                                        footer={[
                                        ]}>
                                        <CreateBlock folders={virtualFolders} Modal={isModalOpen} setModal={setIsModalOpen} key={resetKey} name={props.name} curUnit={curUnit} />
                                    </Modal>
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <Card>
                                    {virtualFolders.length > 0 ? (virtualFolders.map((folder) => (
                                        <Card.Grid style={{ width: '25%', textAlign: 'center', position: 'relative' }}
                                            key={folder.name}
                                        >
                                            {isSuperUnit && (<Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                                                <button style={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => handleDeleteBlock(folder.name)}>
                                                    <h1 className='Edit' style={{ margin: '-1px -6px 0px 0px', color: '#71717a', fontSize: '22px', padding: '0px 2px' }}><EllipsisOutlined /></h1>
                                                </button>
                                            </Dropdown>)}
                                            <div className='BlockName' style={{ display: 'flex', flexDirection: 'column' }}>
                                                <DatabaseTwoTone className='anticon' style={{ fontSize: '60px', padding: '0px 0px 8px 0', marginTop: '18px' }} twoToneColor="#5b7a78" onClick={() => handleClick(folder.name)} />
                                                <span style={{ fontSize: '16px', textAlign: 'center', margin: '0px 5px', cursor: 'pointer' }} onClick={() => handleClick(folder.name)}>{folder.name}</span>
                                            </div>
                                        </Card.Grid>

                                    ))) : (
                                        <div>Loading folders...</div>
                                    )}
                                </Card>
                            </div>
                        </Content>

                    </Layout>
                </Content>
            </Layout>
        </Content >
    )
};
export default UnitAdmin;