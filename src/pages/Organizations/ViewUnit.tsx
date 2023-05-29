import { Breadcrumb, Card } from "antd";
import { Link } from "react-router-dom";
import UnitAdmin from "../UnitAdmin/UnitAdmin";

export default function () {
    return <Card style={{
        margin: 24
    }}>
        <Breadcrumb
            items={[
                {
                    title: <Link to={`/organizations`}>Sơ đồ tổ chức</Link>,
                },
                {
                    title: 'Phòng của Khoa',
                },
            ]}
        />

        <Card>
            <UnitAdmin />
        </Card>
    </Card>
}