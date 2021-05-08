import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Checkbox, Button } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import "../styles/Custom.css";

const admissionApi = axios.create({
  baseURL: `http://localhost:5000/admission`
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
    dataIndex: "hosp_id",
    key: "hosp_id",
  },
  {
    title: "Admission",
    dataIndex: "admission",
    key: "admission",
  },
  {
    title: "Discharged",
    dataIndex: "discharged",
    key: "discharged",
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

// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
//   },
// };

export default function AdmissionGrid() {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [admission, setAdmission] = useState([]);

  const getAdmission = async () =>{
    let data = await admissionApi.get('/').then(({data})=> data);
    setAdmission(data);
  }

  useEffect( () => {
    getAdmission()
  }, []);

  console.log(admission)

  const data = [];
  for (let i = 0; i < admission.length; i++) {
    data.push({
      key: admission[i]._id,
      name: `${admission[i].patient.name.firstname} ${admission[i].patient.name.middlename} ${admission[i].patient.name.lastname}`,
      hosp_id: admission[i].patient.hospitalId,
      admission: new Date(`${admission[i].admissionDate}`).toLocaleDateString(),
      discharged: new Date(`${admission[i].dischargedDate}`).toLocaleDateString(),
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
      {data === null ? '': 
      <>
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
      
      </>
      }
    </div>
  );
}
