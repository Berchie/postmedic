import React, { useState, useEffect } from "react";
import { Table, Space, Checkbox, Button } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { getAdmissionGrid } from "./../api/admissionAPI";
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
  // const [admission, setAdmission] = useState([]);

  const { data, error, isLoading, isError } = useQuery("admissions", getAdmissionGrid);

  if (isLoading) {
    return <Loader type='ThreeDots' color='#ccc' height={30} width={40} className='loader-align' />;
  }

  if (isError) {
    return <sapn>Erorr: {error.message} </sapn>;
  }

  console.log(data);

  const tableData = [];
  try {
    for (let i = 0; i < data.length; i++) {
      tableData.push({
        key: data[i]._id,
        name: `${data[i].patient.name.firstname} ${data[i].patient.name.middlename} ${data[i].patient.name.lastname}`,
        hosp_id: data[i].patient.hospitalId,
        admission: new Date(`${data[i].admissionDate}`).toLocaleDateString(),
        discharged: new Date(`${data[i].dischargedDate}`).toLocaleDateString(),
      });
    }
  } catch (error) {
    console.log('Error: ', error.message);
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
      {data === null ? (
        ""
      ) : (
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
            dataSource={tableData}
            columns={columns}
            pagination={{ showSizeChanger: true, PageSize: 10, showTitle: true }}
            scroll={{ y: 550 }}
          />
        </>
      )}
    </div>
  );
}
