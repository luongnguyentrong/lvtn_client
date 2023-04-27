import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

export default function () {
    return <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500, margin: "16px auto 0" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
    >
        <Form.Item
            label="Tên tập dữ liệu"
            name="block_name"
            rules={[{ required: true, message: 'Hãy điền tên tập dữ liệu!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Hãy điền mô tả về tập dữ liệu!' }]}
        >
            <Input />
        </Form.Item>
    </Form>

}