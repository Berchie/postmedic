import React, { useState, useEffect } from "react";
import { Table, Space, Checkbox, Button } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import "../styles/Custom.css";

const api = axios.create({
  baseURL: `http://localhost:5000/patient`,
});

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
  const [patData, setPatData] = useState([]);

  useEffect(() => {
    api.get("/").then(res=>{ setPatData(res.data) });
  }, [])
  

  const data = [];
  for (let i = 0; i < patData.length; i++) {
    data.push({
      key: patData[i]._id,
      name: `${patData[i].name.firstname} ${patData[i].name.middlename} ${patData[i].name.lastname}`,
      hop_id: patData[i].hospitalId,
      city: patData[i].city,
      phone: patData[i].telephone,
    });
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
        dataSource={data}
        columns={columns}
        pagination={{ showSizeChanger: true, PageSize: 10, showTitle: true }}
        scroll={{ y: 550 }}
      />
    </div>
  );
}
