import { Card, Col, Row } from "antd";

const stub = Array(8).fill(null);

export const Loading = () => (
    <Row gutter={[20, 20]} >
        {
            stub
                .map((_, index) => (
                    <Col span={8} key={index}>
                        <Card loading/>
                    </Col>
            ))
        }
    </Row>
)