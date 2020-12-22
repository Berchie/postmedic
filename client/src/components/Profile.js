import React from "react";
import { Button, Row, Col, Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

export default function Profile() {
  return (
    <div>
      <Row>
        <Col style={{padding: 20}}>
          <Card
            style={{ width: 500}}
            cover={
              <img
                alt='example'
                src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              />
            }
            actions={[
              // <SettingOutlined key='setting' />,
              // <EditOutlined key='edit' />,
              // <EllipsisOutlined key='ellipsis' />,
            ]}>
            <Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title='Berchie Agyemang Nti'
              description='This is the description'
            />
            <br/>
            <p>Username: Berchie </p>
            {/* <br/> */}
            <span>Change Password</span><Button>Change Password</Button>
            <p>Role: Admin </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
