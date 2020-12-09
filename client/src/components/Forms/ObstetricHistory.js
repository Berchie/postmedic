import React from "react";
import { InputNumber, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

export default withRouter(function ObstetricHistory(props) {
  // const  history = useHistory();
  const { control, handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const onSubmit = (data) => {
    action(data);
    props.history.push("./currentpregnancy");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Obstetric History</h2>

      <label>Number of Pregnancies</label>
      <Controller
        as={InputNumber}
        name='pregnancy'
        control={control}
        min={0}
        defaultValue={state.data.pregnancy}
      />
      <label>Number of Birth</label>
      <Controller
        as={InputNumber}
        name='birth'
        control={control}
        min={0}
        defaultValue={state.data.birth}
      />
      <label>Number of Spontaneous Abortion</label>
      <Controller
        as={InputNumber}
        name='spontaneous'
        control={control}
        min={0}
        defaultValue={state.data.spontaneous}
      />
      <label>Number of Induced Abortion</label>
      <Controller
        as={InputNumber}
        name='induced'
        control={control}
        min={0}
        defaultValue={state.data.induced}
      />
      <br />
      <Button
        type='normal'
        security
        onClick={() => props.history.goBack()}
        style={{ marginTop: 15, width: 150, float: "left" }}>
        <LeftOutlined />
        Identification
      </Button>
      <Button
        type='primary'
        htmlType='submit'
        style={{ marginTop: 15, width: 170, float: "right" }}>
        Current Pregnancy
        <RightOutlined />
      </Button>
    </form>
  );
});
