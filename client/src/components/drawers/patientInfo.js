import React, { useState, useMemo } from "react";
import { getPatient } from "../../api/patientsAPI";
import { useQuery } from "react-query";
import { Row, Col, Divider, List, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import "../drawers/patientInfo.css";
import "../../styles/Custom.css";


const DescriptionItem = ({ title, content }) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
);

export default function PatientInfo({ patientId }) {
 
  let [dataAdmission, setDataAdmission] = useState([]);
  let [dataAppointment, setDataAppointment] = useState([]);
  let [dataPregnancy, setDataPregnancy] = useState([]);

  //quering the database for specific or one patient record
  const { data, error, isError, isLoading } = useQuery(["patients", patientId], () =>
    getPatient(patientId)
  );

  /** setting initial state of hasMore to true (infinitescroll prop)*/
  const [hasMore, setHasMore] = useState(true);

  /**
   * function for fetching admission, appointment, and pregnancy
   * data for infinitscroll list
   *  [fetchMoreData,fetchMoreDataApp,fetchMoreDataPreg]
   */
  const fetchMoreData = (e) => {
    if (dataAdmission.length >= admissionData.length) {
      setHasMore(false);
    }

    let result = setTimeout(() => {
      return setDataAdmission(
        (prev) =>
          (dataAdmission = dataAdmission.concat(admissionData.slice(e.length, e.length + 3)))
      );
    }, 2000);
    if (e.length >= admissionData.length) {
      return clearTimeout(result);
    }
    return result;
  };

  const fetchMoreDataApp = (e) => {
    if (dataAppointment.length >= appointmentData.length) {
      setHasMore(false);
    }

    let result = setTimeout(() => {
      return setDataAppointment(
        (prev) =>
          (dataAppointment = dataAppointment.concat(appointmentData.slice(e.length, e.length + 3)))
      );
    }, 2000);

    if (e.length >= appointmentData) {
      clearTimeout(result);
    }

    return result;
  };

  const fetchMoreDataPreg = (e) => {
    if (dataPregnancy.length >= pregnancyData.length) {
      setHasMore(false);
    }

    let result = setTimeout(() => {
      return setDataPregnancy(
        (prev) =>
          (dataPregnancy = dataPregnancy.concat(pregnancyData.slice(e.length, e.length + 3)))
      );
    }, 2000);

    if (e.length >= pregnancyData) {
      clearTimeout(result);
    }

    return result;
  };

  const fetchData = useMemo(() => {
    fetchMoreData(dataAdmission);
  }, [dataAdmission]);
  const fetchDataApp = useMemo(() => {
    fetchMoreDataApp(dataAppointment);
  }, [dataAppointment]);
  const fetchDataPreg = useMemo(() => {
    fetchMoreDataPreg(dataPregnancy);
  }, [dataPregnancy]);

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
    setDataAdmission(admissionData.slice(0, 3));
    setDataAppointment(appointmentData.slice(0, 3));
    setDataPregnancy(pregnancyData.slice(0, 3));
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

  console.log("Appointment info: ", appointmentData);
  console.log("Admission info: ", admData);
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
      <p className='site-description-item-profile-p'>Admissions</p>
      <Row>
        <Col span={24}>
          <div id='scrollableDiv' className='infinite-container'>
            <InfiniteScroll
              dataLength={dataAdmission.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<Spin size='small'></Spin>}
              scrollableTarget='scrollableDiv'
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }>
              <List
                header={
                  <Row>
                    <Col span={8}>Admission Date</Col>
                    <Col span={8}>Discharged Date</Col>
                    <Col span={8}>Admission Duration</Col>
                  </Row>
                }
                dataSource={dataAdmission}
                size='small'
                renderItem={(item) => (
                  <List.Item>
                    <Row key={item._id}>
                      <Col span={8}>{new Date(item.admissionDate).toLocaleDateString()}</Col>
                      <Col span={8}>{new Date(item.dischargedDate).toLocaleDateString()}</Col>
                      <Col span={8}>{`${item.durationOfStay} day(s)`}</Col>
                    </Row>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Col>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Appointments</p>
      <Row>
        <Col span={24} id='scrollableDiv' className='infinite-container'>
          <InfiniteScroll
            dataLength={dataAppointment.length}
            next={fetchDataApp}
            hasMore={hasMore}
            loader={<Spin size='small'></Spin>}
            scrollableTarget='scrollableDiv'
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            <List
              header={
                <Row>
                  <Col span={8}>Appointment Date</Col>
                  <Col span={8}>Status</Col>
                  <Col span={8}>Attended Date</Col>
                </Row>
              }
              dataSource={dataAppointment}
              size='small'
              renderItem={(item) => (
                <List.Item>
                  <Row key={item._id}>
                    <Col span={8}>{new Date(item).toLocaleDateString()}</Col>
                    <Col span={8}>{`${item.Status}`}</Col>
                    <Col span={8}>{new Date(item.arrivalDate).toLocaleDateString()}</Col>
                  </Row>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Col>
      </Row>
      <Divider />
      <p className='site-description-item-profile-p'>Current Pregnancy</p>
      <Row>
        <Col span={24} id='scrollableDiv' className='infinite-container'>
          <InfiniteScroll
            dataLength={dataPregnancy.length}
            next={fetchDataPreg}
            hasMore={hasMore}
            loader={<Spin size='small'></Spin>}
            scrollableTarget='scrollableDiv'
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }>
            <List
              header={
                <Row>
                  <Col span={12}>EDD</Col>
                  <Col span={12}>ega</Col>
                </Row>
              }
              dataSource={dataPregnancy}
              size='small'
              renderItem={(item) => (
                <List.Item>
                  <Row key={item._id}>
                    <Col span={12}>{new Date(item.edd).toLocaleDateString()}</Col>
                    <Col span={12}>{`${item.ega}`}</Col>
                  </Row>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}
