import React, { useState } from "react";
import { Table, Space, Checkbox, Button } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import "../styles/Custom.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
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

const data = [];
for (let i = 1; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
//   },
// };

export default function AdmissionGrid() {
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
