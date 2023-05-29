import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Typography } from 'antd';
import axios from 'axios';
import { getBearerHeader } from '../../utils';
import API from '../../api';
import { Link } from 'react-router-dom';
import UnitRequest from './Modals/UnitRequest';

export interface IUnitRequest {
    description: string | null,
    display_name: string
    name: string
    parent_unit: string
    manager: {
        email: string
        fname: string
        lname: string
        password: string
        username: string
    },
}
interface IRequest {
    id: number,
    created_by: string
    status: string
    request_type: string
    body: IUnitRequest,
    creator: {
        email: string
        email_constraint: string
        first_name: string
        id: string
        last_name: string
        realm_id: string
        username: "khoa12"
    }
}


const App: React.FC = () => {
    const [requests, setRequests] = useState<Array<IRequest>>([])
    const [open, setOpen] = useState(false)
    const [detail, setDetail] = useState<IUnitRequest>()

    useEffect(() => {
        getBearerHeader().then(config => {
            return axios.get(API.Requests.List, config)
        }).then(res => {
            if (res.status === 200)
                setRequests(res.data)
        })
    }, [])

    const close = () => {
        setOpen(false)
    }

    return (
        <>
            <List
                className="demo-loadmore-list"
                loading={requests.length === 0}
                itemLayout="horizontal"
                dataSource={requests}
                style={{
                    maxWidth: 600,
                    margin: "0 auto"
                }}
                renderItem={(item, i) => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">Chấp nhận</a>, <a key="list-loadmore-more">Từ chối</a>]}
                    >
                        <List.Item.Meta
                            title={<div>
                                <Typography.Text mark>{`#${item.id}`} </Typography.Text>
                                <Typography.Text><Link to={`/users/${item.creator.id}`}>{item.creator.first_name + " " + item.creator.last_name}</Link>  đã gửi yêu cầu tạo đơn vị</Typography.Text>
                            </div>}
                            description={<Button onClick={() => {
                                setOpen(true)
                                setDetail(item.body)
                            }}>Xem chi tiết</Button>}
                        />
                    </List.Item>
                )}
            />

            <UnitRequest open={open} close={close} unit={detail} />
        </>
    );
};

export default App;