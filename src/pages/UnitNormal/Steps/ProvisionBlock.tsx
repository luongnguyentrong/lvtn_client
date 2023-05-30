import React, { useEffect, useState } from 'react';
import { Spin, StepProps, Steps, message } from 'antd';
import { IBlock, ITable } from '../NewBlock'
import axios from 'axios';
import { getBearerHeader, getCurrentUser, toSlug, IUser } from '../../../utils';
import API from '../../../api';
import { useNavigate } from 'react-router-dom';


interface IProps {
    block: IBlock | undefined
}

const App: React.FC<IProps> = (props: IProps) => {
    const [current, setCurrent] = useState(0)
    const [items, setItems] = useState<Array<StepProps>>([])
    const [curUser, setCurUser] = useState<IUser | undefined>()
    const navigate = useNavigate()

    const moveToNext = () => {
        const new_items = items.map((item, idx) => {
            if (idx === current + 1) {
                const updated_item: StepProps = {
                    title: item.title,
                    description: "Đang xử lý",
                    status: "process",
                    icon: <Spin />
                }

                return updated_item
            }
            else if (idx === current) {
                const updated_item: StepProps = {
                    title: item.title,
                    description: "Thành công",
                    status: "finish"
                }

                return updated_item
            }
            else {
                return item
            }
        })

        setItems(new_items)
        setCurrent(current + 1)
    }

    useEffect(() => {
        getCurrentUser().then(data => {
            if (data) {
                setCurUser(data)
            }
        })
    }, [])

    useEffect(() => {
        // create items from block
        if (props.block !== undefined) {
            const new_items: StepProps[] = []

            // create block step
            new_items.push({
                title: "Tạo tập dữ liệu",
                description: "Khởi tạo tập dữ liệu",
                icon: <Spin />
            })

            // create criteria
            for (let i = 0; i < props.block.criteria.length; i++) {
                const item: StepProps = {
                    title: "Tạo tiêu chí - " + props.block.criteria[i],
                    description: "Đang đợi",
                    status: "wait"
                }

                new_items.push(item)
            }

            // create items
            for (let i = 0; i < props.block.items.length; i++) {
                if (props.block.items[i].type === "table") {
                    const item: StepProps = {
                        title: "Tạo dữ liệu " + props.block.items[i].display_name,
                        description: "Đang đợi",
                        status: "wait",
                    }

                    new_items.push(item)
                } else {
                    const item: StepProps = {
                        title: "Tạo folder " + props.block.items[i].display_name,
                        description: "Đang đợi",
                        status: "wait"
                    }

                    new_items.push(item)
                }
            }

            new_items.push({
                title: "Hoàn thành",
                description: "Đang đợi",
                status: "wait"
            })

            setItems(new_items)
        }
    }, [props.block])

    useEffect(() => {
        if (curUser && props.block !== undefined && items && items.length > 0) {
            if (current < items.length - 1) {
                if (current === 0) {
                    // create block in database
                    if (props.block && curUser) {
                        const data = {
                            display_name: props.block.display_name,
                            name: props.block.name,
                            description: props.block.description,
                            created_by: curUser.sub
                        }

                        axios.post(API.Blocks.Create, data, getBearerHeader()).then(res => {
                            if (res.status === 201) {
                                moveToNext()
                            }
                        })

                        moveToNext()
                    }
                } else if (current <= props.block.criteria.length) {
                    moveToNext()
                } else if (current > props.block.criteria.length) {
                    const cur_item = props.block.items[current - props.block.criteria.length - 1]
                    if (cur_item.type === "table") {
                        const data = {
                            display_name: cur_item.display_name,
                            name: cur_item.name,
                            description: cur_item.description,
                            created_by: curUser.sub,
                            columns: cur_item.columns
                        }

                        axios.post(API.Blocks.Tables.Create(props.block.name), data, getBearerHeader()).then(res => {
                            if (res.status === 201)
                                moveToNext()
                        })
                    }
                }

            } else {
                navigate("/unit_admin")
                message.success("Tạo tập dữ liệu thành công")
            }
        }
    }, [current, props.block, items, curUser])


    return <Steps
        direction="vertical"
        size="small"
        style={{ margin: "32px" }}
        current={current}
        items={items}
    />
};

export default App;