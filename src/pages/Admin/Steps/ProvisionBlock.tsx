import React, { useEffect, useState } from 'react';
import { Spin, StepProps, Steps } from 'antd';
import { IBlock } from '../NewBlock'
import axios from 'axios';
import { getBearerHeader, getCurrentUser, toSlug } from '../../../utils';


const description = 'This is a description.';

interface IProps {
    block: IBlock | undefined
}

const App: React.FC<IProps> = (props: IProps) => {
    const [current, setCurrent] = useState(0)
    const [items, setItems] = useState<Array<StepProps>>([])

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

            // create items
            for (let i = 0; i < props.block.items.length; i++) {
                if (props.block.items[i].type === "table") {
                    const item: StepProps = {
                        title: "Tạo dữ liệu " + props.block.items[i].display_name,
                        description: "Đang đợi",
                        status: "wait"
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
        if (props.block !== undefined && items && items.length > 0) {
            if (current < items.length) {
                if (current === 0) {
                    // create block in database
                    getCurrentUser().then(currentUser => {
                        if (props.block && currentUser) {
                            const data = {
                                display_name: props.block.name,
                                name: toSlug(props.block.name),
                                description: props.block.description,
                                created_by: currentUser.sub
                            }

                            axios.post("http://localhost:5000/blocks", data, getBearerHeader()).then(res => {
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
                            })
                        }
                    }).catch(err => {
                        console.log("IN ERROR", err)
                    })
                } else {
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
            }
        }
    }, [current, props.block, items])

    return <Steps
        direction="vertical"
        size="small"
        style={{ margin: "32px" }}
        current={current}
        items={items}
    />
};

export default App;