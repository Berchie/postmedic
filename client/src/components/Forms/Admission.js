import React from "react";
import { DatePicker, InputNumber, Button, Input } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import moment from "moment";
import "../../styles/Patient.less";


export default withRouter(function Admission(props) {
  const { control, handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const dateFormat = "YYYY-MM-DD";
  const { TextArea } = Input;

  const onSubmit = (data) => {
    action(data);
    console.log(data);
    props.history.push("./appointment");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Admission</h2>

      <label>
        Admission Date{"    "}
        <Controller
          as={DatePicker}
          name='dateOfAdmission'
          control={control}
          defaultValue={moment(state.data.dateOfAdmission)}
          format={dateFormat}
          size='small'
          rules={{ require: true }}
        />
      </label>

      <label>
        Discharge Date{"    "}
        <Controller
          as={DatePicker}
          name='dateOfDischarged'
          control={control}
          defaultValue={moment(state.data.dateOfDischarged)}
          format={dateFormat}
          size='small'
        />
      </label>

      <label>
        Number of Days at Admission {"    "}
        <Controller
          as={InputNumber}
          name='durationOfStay'
          control={control}
          min={0}
          defaultValue={((new Date(moment(state.data.dateOfDischarged).format('l')).getTime() - new Date(moment(state.data.dateOfAdmission).format('l')).getTime())/(1000 * 360 * 24))/10}
        />
      </label>
      <label>Discharged Diagonsis </label>
      <Controller
        name='dischargedDiagnosis'
        as={TextArea}
        control={control}
        style={{ width: "50%" }}
        value=''
        defaultValue={state.data.dischargedDiagnosis}
        className='input'
      />

      <br />
      <Button onClick={() => props.history.goBack()} style={{ marginTop: 17, width: 150 }}>
        <LeftOutlined />
        Admission
      </Button>
      <Button
        type='primary'
        htmlType='submit'
        style={{ marginTop: 17, width: 150, float: "right", clear: "left" }}>
        Appointment
        <RightOutlined />
      </Button>
    </form>
  );
});
