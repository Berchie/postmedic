import React from "react";
import { Layout, Menu } from "antd";
import RegisterForm from "./Forms/RegisterForm";

export default function Register() {
  const { Header, Content, Footer } = Layout;
  const dateYear = new Date().getFullYear();

  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["2"]}>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className='site-layout content' style={{ padding: "0 50px", marginTop: 44 }}>
        <div className='site-layout-content' style={{ padding: 24, minHeight: 380}}>
          <RegisterForm/>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>PostMedic ©{dateYear} Created by Berchie Agyemang Nti</Footer>
    </Layout>
  );
}
