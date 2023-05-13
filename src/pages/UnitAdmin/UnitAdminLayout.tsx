import { Col, Input, Layout, Row } from "antd"
import { Link, Outlet } from "react-router-dom";
import RightNav from "./Header/RightNav";

const { Header, Footer } = Layout;

const emptyHeaderStyle: React.CSSProperties = {
    height: "48px",
    lineHeight: "48px",
    background: "transparent",
}

const headerStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    height: "48px",
    lineHeight: "48px",
    width: "100%",
    zIndex: "100",
    right: "0px",
    backgroundColor: "white",
    borderBottom: '1px solid rgba(5, 5, 5, 0.06)'
}

export default function () {

    return <Layout style={{ height: "100%" }}>
        <Header style={emptyHeaderStyle} />
        <Header style={headerStyles}>
            <Row align="middle">
                <Col span={6}>
                    <Link to={"/"}>
                        <div className="logo">
                            <img src="/logo.png" alt="logo" style={{ width: 32 }} />
                        </div>
                    </Link>
                </Col>
                <Col span={12} style={{ display: "inherit", justifyContent: "center" }}><Input.Search style={{ width: 400}} size='middle' placeholder='Nhập tên tập dữ liệu...' /></Col>
                <Col span={6}>
                    <RightNav />
                </Col>
            </Row>
        </Header>

        <Outlet />

        {/* <Footer style={{ textAlign: 'center' }}>Hệ thống quản lý thông tin đảm bảo chất lượng cho một đơn vị giáo dục | Đồ án tốt nghiệp</Footer> */}
    </Layout>
}