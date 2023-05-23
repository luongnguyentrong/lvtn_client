import { Col, Layout, Row, AutoCompleteProps } from "antd"
import { Link } from "react-router-dom"
import Search from "./Search"
import RightNav from "./RightNav"

const { Header } = Layout

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

export interface IOption {
    label: string
    options?: Array<IOption>
    value?: string
}

interface IProps {
    searchOptions?: IOption[]
}

export default function (props: IProps) {
    return <>
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
                <Col span={12} style={{ display: "inherit", justifyContent: "center" }}>
                    <Search options={props.searchOptions} />
                </Col>
                <Col span={6}>
                    <RightNav />
                </Col>
            </Row>
        </Header>
    </>
}