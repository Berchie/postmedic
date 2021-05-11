import React, { useState } from "react";
import { Table, Space, Checkbox, Button, Alert } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import { getUsersGrid } from "./../api/usersAPI";
import Loader from "react-loader-spinner";
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
    title: "Email",
    dataIndex: "email",
    key: "email",
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
      <Space size='small'>
        <Button type='primary' size='small' icon={<InfoCircleOutlined />}>
          View
        </Button>
      </Space>
    ),
  },
];

export default function ProfileGrid() {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { data, error, isLoading, isError } = useQuery("users", getUsersGrid);

  if (isLoading) {
    return <Loader type='ThreeDots' color='#ccc' height={30} width={40} className='loader-align' />;
  }

  if (isError) {
    return <Alert message='Error' description={`Error: ${error.message}`} banner closable />;
  }

  const tableData = [];
  try {
    for (let i = 0; i < data.length; i++) {
      tableData.push({
        key: data[i]._id,
        name: data[i].name,
        username: data[i].username,
        email: data[i].email,
        role: data[i].role,
      });
    }
  } catch (error) {
    console.log("Something went wrong! ", error.message);
  }

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
          <Button type='primary' onClick={start} loading={loading}>
            <UserAddOutlined />
            Reload
          </Button>
        </div>
        <div className='btn-menu'>
          <Button type='default' onClick={startEdit} disabled={!hasSelectedEdit}>
            <EditOutlined />
            Edit
          </Button>
        </div>

        <div className='btn-menu'>
          <Button type='primary' onClick={startDelete} danger disabled={!hasSelected}>
            <DeleteOutlined />
            Delete
          </Button>
        </div>
        <span style={{ paddingLeft: 10 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={{
          type: Checkbox,
          ...rowSelection,
        }}
        dataSource={tableData}
        columns={columns}
        size="small"
        pagination={{ showSizeChanger: true, PageSize: 10, showTitle: true }}
        scroll={{ y: 550 }}
      />
    </div>
  );
}
