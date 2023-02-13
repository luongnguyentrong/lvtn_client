import React from 'react';
import { Layout, Row, Col } from 'antd';
import UploadSection from './components/UploadSection';
import 'antd/dist/reset.css';

const { Header, Footer, Content } = Layout;

const App = () => {
  return <Layout>
    <Header>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          <img src="./QAS.svg" alt="logo" />
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          Col
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          Col
        </Col>
      </Row>
    </Header>
    <Content>
    <UploadSection />

    </Content>
    <Footer >Footer</Footer>
  </Layout>;
};

export default App;