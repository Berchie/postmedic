import React, { useState } from "react";
import { Menu,Layout, Button } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import '../styles/SideNav.less';


const { SubMenu } = Menu;
const { Sider } = Layout;

export default function SideNav() {

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = (e) => {
    e.preventDefault();
    setCollapsed(!collapsed);
  };

  return (
      <Sider style={{
        width: 256,
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }} trigger={null} collapsible collapsed={collapsed}>

      <Button type='primary' onClick={toggleCollapsed} style={{ margin: '20px 20px'}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {className:'trigger'})}
          </Button>
          <br/>
      <div className="logo" />
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode='inline'
          theme='dark'
          >
          
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key='3' icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key='sub1' icon={<MailOutlined />} title='Navigation One'>
            <Menu.Item key='5'>Option 5</Menu.Item>
            <Menu.Item key='6'>Option 6</Menu.Item>
            <Menu.Item key='7'>Option 7</Menu.Item>
            <Menu.Item key='8'>Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<AppstoreOutlined />} title='Navigation Two'>
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <SubMenu key='sub3' title='Submenu'>
              <Menu.Item key='11'>Option 11</Menu.Item>
              <Menu.Item key='12'>Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
  );
}
