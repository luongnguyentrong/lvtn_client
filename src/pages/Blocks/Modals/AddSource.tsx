import { Form, Input, Modal, Select, Space, Spin } from "antd"
import { FileAddOutlined, LoadingOutlined, LinkOutlined, LineChartOutlined } from '@ant-design/icons';
import { useForm } from "antd/es/form/Form"
import { useState } from "react";
import { BlockNoteView, useBlockNote} from "@blocknote/react";
import "@blocknote/core/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { Props } from "@ant-design/graphs/es/components/conversion-dagre-graph/types";

const { Option } = Select;

interface IProps {
    open: boolean
    close: () => void
    addSource: (name: string, title: string) => void
}

export default function (props: IProps) {
    const [markdown, setMarkdown] = useState<string>("");
    const editor: BlockNoteEditor | null = useBlockNote({
        onEditorContentChange: (editor: BlockNoteEditor) => {
            const saveBlocksAsMarkdown = async () => {
                const markdown: string =
                    await editor.blocksToHTML(editor.topLevelBlocks);
                setMarkdown(markdown);
            };
            saveBlocksAsMarkdown();
        }
    });
    // console.log(markdown)
    const [form] = useForm()
    const [loading, setLoading] = useState(false)

    const handleOk = () => {
        form.validateFields().then(res => {
            props.addSource(markdown,"")
            props.close()
        })
    }

    const handleCancel = () => {
        form.resetFields()
        props.close()
    }

    return (
        <Modal title="Thêm dẫn chứng" open={props.open} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Nội dung"
                    name="editor"
                >
                    <BlockNoteView editor={editor} />
                </Form.Item>
               
                {/* <Form.Item
                    label="Dữ liệu đính kèm"
                    name="criteria"
                    rules={[{ required: true, message: 'Hãy chọn dữ kiểu để đính kèm!' }]}
                >
                    <Select
                        placeholder="Chọn kiểu của dẫn chứng"
                        allowClear
                    >
                        <Option value="file">
                            <Space>
                                <FileAddOutlined /> Tệp
                            </Space>
                        </Option>
                        <Option value="dashboard">
                            <Space>
                                <LineChartOutlined /> Phân tích
                            </Space>
                        </Option>

                        <Option value="link">
                            <Space>
                                <LinkOutlined /> Đường dẫn
                            </Space>
                        </Option>
                    </Select>

                </Form.Item> */}

                {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : null}

            </Form>
        </Modal>
    )
}