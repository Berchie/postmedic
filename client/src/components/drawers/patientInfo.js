import React, { useState } from "react";
import { getPatient } from "../../api/patientsAPI";
import { useQuery } from "react-query";
import { Row, Col, Divider, List, Spin, Table, Drawer, Button, Modal } from "antd";
import Loader from "react-loader-spinner";
import "../drawers/patientInfo.css";
import "../../styles/Custom.css";
import { tableColumns } from "../drawers/tableColumn";

const DescriptionItem = ({ title, content }) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
);

export default function PatientInfo({ patientId }) {
  //columns for the tables
  const admissionTableColumns = [
    ...tableColumns("Admission Date", "Discharged Date", "Days of Stay", "Diagnosis"),
  ];
  const appointmentTableColumns = [...tableColumns("Appointment Date", "Status", "Arrival Date")];
  const pregnancyTableColumns = [...tableColumns("EDD", "EGA")];


  const [modal2Visible, setModal2Visible] = useState(false)

  const { data, error, isError, isLoading } = useQuery(["patients", patientId], () =>
    getPatient(patientId)
  );

  if (patientId === null) {
    return <Loader type='ThreeDots' color='#ccc' height={30} width={40} className='loader-align' />;
  }

  if (isLoading) {
    console.log("loading....");
    return <Spin size='large' style={{ textAlign: "center" }} />;
  }

  let admissionData,
    appointmentData,
    pregnancyData = [];

  if (isError) {
    console.log(error);
  }

  if (data === null) {
    console.log("still fetching....");
  } else {
    admissionData = [...data.admissions];
    appointmentData = [...data.appointments];
    pregnancyData = [...data.currentPregnancies];
  }

  const admData = [];
  try {
    for (let i = 0; i < admissionData.length; i++) {
      admData.push({
        key: admissionData[i]._id,
        admissiondate: new Date(admissionData[i].admissionDate).toLocaleDateString(),
        dischargeddate: new Date(admissionData[i].dischargedDate).toLocaleDateString(),
        daysofstay: admissionData[i].durationOfStay,
        diagnosis: admissionData[i].dischargedDiagnosis,
      });
    }
  } catch (error) {
    console.log("Something went wrong!", error);
  }
  
  console.log(admissionTableColumns);
  console.log("Appointment info: ", appointmentData);
  console.log("Admission info: ", admData);
  console.log("Current Pregnancy info: ", pregnancyData);

  const showModal2Visible = (e) =>{
    e.preventDefault()
    setModal2Visible(true)}
  

  const handleModal2Visible = (e) =>{
    e.preventDefault()
    setModal2Visible(false)
  }

  return (
    <div>
      <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
        Patient Record
      </p>
      <p className='site-description-item-profile-p'>Identification</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title='Full Name'
            content={`${data.name.firstname} ${data.name.middlename} ${data.name.lastname}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Hospital ID' content={`${data.hospitalId}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Age' content={`${data.age} (years)`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Sex' content={`${data.gender}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Address' content={`${data.address}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='City' content={`${data.city}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Phone' content={`${data.telephone}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='E-mail' content={`${data.email}`} />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8}>
        <Button type='primary' onClick={''}>
        Two-level drawer
        </Button>
        </Col>
        <Col span={8}>
        <Button type='primary' onClick={''}>
        Two-level drawer
        </Button>
        </Col>
        <Col span={8}>
        <Button type='primary' onClick={showModal2Visible}>
        Two-level drawer
        </Button>
        <Modal
          title="Vertically centered modal dialog"
          centered
          visible={modal2Visible}
          onOk={handleModal2Visible}
          onCancel={handleModal2Visible}
          cancelButtonProps={{disabled:true}}
        >
          <Table/>
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
          <table>
            <td>
              <th>Admission</th>
              <th>Discharged</th>
            </td>
          </table>
        </Modal>
        </Col>
      </Row>
     
    </div>
  );
}
