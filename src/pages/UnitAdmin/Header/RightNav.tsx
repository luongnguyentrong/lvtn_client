import { Dropdown, Menu, MenuProps } from "antd";
import { UserOutlined, BellOutlined } from '@ant-design/icons';

export default function () {
    const drop_items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];

    const items: MenuProps['items'] = [
        {

            key: "notification",
            icon: <BellOutlined />,
            label: "Thông báo"
        },
        {
            key: "profile",
            icon: <Dropdown menu={drop_items} placement="bottomRight">
                <UserOutlined />
            </Dropdown>,
        }
    ]

    return (
        <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{
                justifyContent: "end",
            }}
            items={items}
        />
    )
}