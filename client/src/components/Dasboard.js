import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import "../styles/Dasboard.less";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  BankOutlined,
  CalendarOutlined,
  ContainerOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Dhome from "./DHome";
import PatientGrid from "./PatientGrid";
import AdmissionGrid from "./AdmissionGrid";
import AppointmentGrid from "./AppointmentGrid";
import ProfileGrid from "./ProfileGrid";



const { SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;

export default function Dasboard() {
  const dateYear = new Date().getFullYear();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout>
        <Sider
          style={{
            minHeight: "100vh",
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}>
          <Button type='primary' onClick={toggleCollapsed} style={{ margin: "20px 20px" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
            })}
          </Button>
          <br />
          <div className='logo' />
          <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode='inline' theme='dark'>
            <Menu.Item key='1' icon={<HomeOutlined />}>
              <Link to = "/" >Home</Link>
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='Client'>
              <Menu.Item key='3' icon={<UserOutlined />}>
                <Link to='/clients'>Clients</Link>
              </Menu.Item>
              <Menu.Item key='4' icon={<ContainerOutlined />}>
                <Link to='/admission'>Admission</Link>
              </Menu.Item>
              <Menu.Item key='5' icon={<CalendarOutlined />}>
                <Link to='/appointment'> Appointment </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<SettingOutlined />} title='Settings'>
              <Menu.Item key='6' icon={<BankOutlined />}>
                Institution
              </Menu.Item>
              <Menu.Item key='7' icon={<TeamOutlined />}>
                Doctors
              </Menu.Item>
              <SubMenu key='sub3' title='Users'>
                <Menu.Item key='8' icon={<UsergroupAddOutlined />}>
                <Link to='profile'>  Users </Link>
                </Menu.Item>
                {/* <Menu.Item key='9' icon={<IdcardOutlined />}>
                  <Link to='profile'> Profile </Link>
                </Menu.Item> */}
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout className='site-layout'>
          <Header className='site-layout-background' style={{ padding: 0, position: "static" }}>
            Header
          </Header>
          <Content className='layout-content'>
            <div className='site-layout-background' style={{ padding: 10, minHeight: 500 }}>
              <Switch>
                <Route path='/' exact component={Dhome}></Route>
                <Route path='/clients' component={PatientGrid}></Route>
                <Route path='/admission' component={AdmissionGrid}></Route>
                <Route path='/appointment' component={AppointmentGrid}></Route>
                <Route path='/Profile' component={ProfileGrid}></Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            PostMedic ©{dateYear} Created by Berchie Agyemang Nti
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}
