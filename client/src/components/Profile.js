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
            style={{ width: 400}}
            cover={
              <img
                alt='example'
                src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              />
            }
            actions={[
              <SettingOutlined key='setting' />,
              <EditOutlined key='edit' />,
              <EllipsisOutlined key='ellipsis' />,
            ]}>
            <Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title='Card title'
              description='This is the description'
            />
          </Card>
        </Col>
        <Col style={{padding: 20}}>
          <Card
            style={{ width: 400 }}
            cover={
              <img
                alt='example'
                src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              />
            }
            actions={[
              <SettingOutlined key='setting' />,
              <EditOutlined key='edit' />,
              <EllipsisOutlined key='ellipsis' />,
            ]}>
            <Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title='Card title'
              description='This is the description'
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
