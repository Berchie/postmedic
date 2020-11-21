import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, Layout, Menu } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/Login.less";

export default function Login() {
  const { Header, Content, Footer } = Layout;

  const NormalLoginForm = (values) => {
    // const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // };
  };

  const dateYear = new Date().getFullYear();

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["1"]}>
          <Menu.Item key='1' className="menu-items">Login</Menu.Item>
          <Menu.Item key='2' className="menu-items">Register</Menu.Item>
          <Menu.Item key='3' className="menu-items">Home</Menu.Item>
        </Menu>
      </Header>
      <Content className='site-layout login' style={{ padding: "50px"}}>
        <div className='site-layout-background' style={{ minHeight: 200}}>
          {/* <div> */}
            <Row >
              <Col>
                <Form
                  name='normal_login'
                  className='login-form'
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={NormalLoginForm} style={{width:250}}>
                  <Form.Item
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}>
                    <Input
                      prefix={<UserOutlined className='site-form-item-icon' />}
                      placeholder='Username'
                    />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}>
                    <Input
                      prefix={<LockOutlined className='site-form-item-icon' />}
                      type='password'
                      placeholder='Password'
                    />
                  </Form.Item>
                  <Form.Item>
                    <a className='login-form-forgot' href='#1'>
                      Forgot password
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                      Log in
                    </Button>
                    Or <a href='#4'>register now!</a>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          {/* </div> */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", marginTop: "1rem" }}>PostMedic ©{dateYear} Created by Berchie Agyemang Nti</Footer>
    </Layout>
  );
}
