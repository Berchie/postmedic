import React, { useState } from "react";
import { Table, Space, Checkbox, Button } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
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
  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (tags) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size='middle'>
        {/* <a>Invite {record.name}</a> */}
        <a>Delete</a>
      </Space>
    ),
  },
];

// const data = [];
// for (let i = 1; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
//   },
// };

export default function PatientGrid() {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [patData, setPatData] = useState([]);

  const { isLoading, isError, data, error } = useQuery("patients", getPatientGrid);

  if (isLoading) {
    return <Loader type='ThreeDots' color='#ccc' height={30} width={40} className='loader-align' />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
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
        pagination={{ showSizeChanger: true, PageSize: 10, showTitle: true }}
        scroll={{ y: 550 }}
      />
    </div>
  );
}
