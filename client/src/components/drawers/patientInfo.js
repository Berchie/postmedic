import React from "react";
import { getPatient } from "../../api/patientsAPI";
import { useQuery } from "react-query";
import { Row, Col, Divider, Spin, Alert } from "antd";
import "../drawers/patientInfo.css";
import "../../styles/Custom.css";
import TableAdmission from  './tableAdmission'
import TableAppointment from './tableAppointment'
import TableCurrentPregnancy from "./tableCurrentPregnacy";

const DescriptionItem = ({ title, content }) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
);


export default function PatientInfo({ patientId }) {

  //quering the database for specific or one patient record
  const { data, error, isError, isLoading } = useQuery(["patients", patientId], () =>
    getPatient(patientId)
  );


  /** delceration of admission, appointment, current pregnancy data*/
  let admissionData,
    appointmentData,
    pregnancyData = [];


  if (patientId === null) {
    return <Spin size='large' style={{ textAlign: "center" }} />;
  }
   
  if (isLoading) {
    return <Spin size='large' style={{ textAlign: "center" }} />;
  }

  if (isError) {
    return <Alert message='Error' description={`Error: ${error.message}`} banner closable />;
  }

  console.log(data);

  if (data !== null) {
    admissionData = [...data.admissions];
    appointmentData = [...data.appointments];
    pregnancyData = [...data.currentPregnancies];
  }


  console.log("Appointment info: ", appointmentData);
  console.log("Admission info: ", data);
  console.log("Current Pregnancy info: ", pregnancyData);

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
      <p className='site-description-item-profile-p'>Risk Factors</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title='Hypertension' content={`${data.riskFactor.hypertension}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Heart Disease' content={`${data.riskFactor.heartDisease}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title='Sickle Cell Disease'
            content={`${data.riskFactor.sickleCellDisease}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Diabetes' content={`${data.riskFactor.diabetes}`} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <DescriptionItem title='Epilepsy' content={`${data.riskFactor.epilepsy}`} />
        </Col>
        <Col span={6}>
          <DescriptionItem title='Asthma' content={`${data.riskFactor.asthma}`} />
        </Col>
        <Col span={6}>
          <DescriptionItem title='TB' content={`${data.riskFactor.tb}`} />
        </Col>
        <Col span={6}>
          <DescriptionItem title='SCD' content={`${data.riskFactor.scd}`} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title='Respiratory Disease'
            content={`${data.riskFactor.respiratoryDisease}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem title='Mental Illness' content={`${data.riskFactor.mentalIllness}`} />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <DescriptionItem title='Other' content={`${data.riskFactor.other}`} />
        </Col>
        <Col span={16}>
          <DescriptionItem title='Other Specify' content={`${data.riskFactor.otherSpecify}`} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title='Previous Surgery'
            content={`${data.riskFactor.previousSurgery}`}
          />
        </Col>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Obstetric History</p>
      <Row>
        <Col span={12}>
          <DescriptionItem
            title='Abortion Induced'
            content={`${data.obstetricHistory.numberOfAbortionInduced}`}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title='Abortion Spontaneous'
            content={`${data.obstetricHistory.numberOfAbortionSpontaneous}`}
          />
        </Col>
      </Row>
      <Row>
      <Col span={12}>
          <DescriptionItem title='Births' content={`${data.obstetricHistory.numberOfBirth}`} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title='Pregnancies'
            content={`${data.obstetricHistory.numberOfPregnancies}`}
          />
        </Col>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Admissions</p>
      <Row>
            <TableAdmission data={admissionData}/>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Appointments</p>
      <Row>
        <TableAppointment data={appointmentData}/>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Current Pregnancy</p>
      <Row>
        <TableCurrentPregnancy data={pregnancyData}/>
      </Row>
    </div>
  );
}
