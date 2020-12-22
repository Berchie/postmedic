import React, { useState } from "react";
import { Menu, Layout, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  BankOutlined,
  CalendarOutlined,
  ContainerOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../styles/SideNav.less";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      style={{
        width: 256,
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
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
          Home
        </Menu.Item>
        <SubMenu key='sub1' icon={<UserOutlined />} title='Client'>
          <Menu.Item key='3' icon={<UserOutlined />}>
            Clients
          </Menu.Item>
          <Menu.Item key='4' icon={<ContainerOutlined />}>
            Addmision
          </Menu.Item>
          <Menu.Item key='5' icon={<CalendarOutlined />}>
            Appointment
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
              Users
            </Menu.Item>
            <Menu.Item key='9' icon={<IdcardOutlined />}>
              Profile
            </Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sider>
  );
}
