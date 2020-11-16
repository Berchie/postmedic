import React from "react";
import { Layout } from "antd";
import SideNav from "./SideNav";
import "../styles/Dasboard.less";

const { Header, Footer, Content } = Layout;

export default function Dasboard() {

  const dateYear = new Date().getFullYear();

  return (
    <Layout>
      <SideNav />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, position:'static' }}>Header</Header>
        <Content className='layout-content'>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 500}}>
              Bill is a cat.
          </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>PostMedic ©{dateYear} Created by Berchie Agyemang Nti</Footer>
      </Layout>
    </Layout>
  );
}
