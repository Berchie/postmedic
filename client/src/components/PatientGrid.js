import React, { useState } from "react";
import { Table, Space, Checkbox, Button, Alert } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import { getPatientGrid } from "../api/patientsAPI";
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
    title: "Hospital ID",
    dataIndex: "hop_id",
    key: "hop_id",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size='middle'>
        <Button type='primary' size='small' icon={<InfoCircleOutlined />}>
          View
        </Button>
      </Space>
    ),
  },
];

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
//   },
// };

export default function PatientGrid() {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { isLoading, isError, data, error } = useQuery("patients", getPatientGrid);

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
        name: `${data[i].name.firstname} ${data[i].name.middlename} ${data[i].name.lastname}`,
        hop_id: data[i].hospitalId,
        city: data[i].city,
        phone: data[i].telephone,
      });
    }
  } catch (error) {
    console.log("Something went wrong!", error);
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
