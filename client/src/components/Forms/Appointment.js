import React from "react";
import { DatePicker, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import moment from "moment";


export default withRouter (function Appointment(props) {
  const { control, handleSubmit, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const dateFormat = "YYYY-MM-DD";

  const onSubmit = (data) => {
    action(data);
    console.log(state);
    // props.history.push("./appointment");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Appointment</h2>

      <label>
        Review Date: {"    "}
        <Controller
          as={DatePicker}
          name='appointmentDate'
          control={control}
          defaultValue={moment(state.data.appointmentDate)}
          format={dateFormat}
          size='small'
          rules={{required: true}}
        />{
          errors.appointmentDate && <span className='errors'>Review Date is required</span>
        }
      </label>
      <br/>
      <Button onClick={() => props.history.goBack()} style={{ marginTop: 17, width: 150 }}>
        <LeftOutlined />
        Admission
      </Button>
      <Button
        type='primary'
        htmlType='submit'
        style={{ marginTop: 17, width: 150, float: "right", clear: "left" }}>
        Submit
        <RightOutlined />
      </Button>
    </form>
  );
}
)