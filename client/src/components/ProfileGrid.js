import React, { useState } from "react";
import { Table, Space, Checkbox, Button } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "../styles/Custom.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
 
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size='middle'>
        {/* <a>Invite {record.name}</a> */}
        <Button type="primary" size="small" icon={<InfoCircleOutlined />}>View</Button>
      </Space>
    ),
  },
];

const data = [];
for (let i = 1; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    username: `edward_king ${i}`,
    role: `Role ${i}`,
  });
}

export default function ProfileGrid() {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const startEdit = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 700);
  };

  const startDelete = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 500);
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys:", selectedRowKeys, "selectedRows: ", selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const hasSelectedEdit = selectedRowKeys.length > 0 && selectedRowKeys.length < 2;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div className='btn-menu'>
        <Button  type='primary' onClick={start} loading={loading}>
          <UserAddOutlined />
          Reload
        </Button>
        </div>
        <div className='btn-menu'>
        <Button  type='default' onClick={startEdit} disabled={!hasSelectedEdit}>
          <EditOutlined />
          Edit
        </Button>
        </div>
        
        <div className='btn-menu'>
        <Button
          type='primary'
          onClick={startDelete}
          danger
          disabled={!hasSelected}>
          <DeleteOutlined />
          Delete
        </Button>
        </div>
        <span style={{ paddingLeft: 10}}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={{
          type: Checkbox,
          ...rowSelection,
        }}
        dataSource={data}
        columns={columns}
        pagination={{ showSizeChanger: true, PageSize: 10, showTitle: true }}
        scroll={{ y: 550 }}
      />
    </div>
  );
}
