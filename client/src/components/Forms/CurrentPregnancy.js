import React from "react";
import "date-fns";
import { DatePicker, InputNumber, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import moment from "moment";

function CurrentPregnancy(props) {
  const { control, handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const dateFormat = "YYYY-MM-DD";

  const onSubmit = (data) => {
    action(data);
    console.log(moment(data.edd1).format("l"));
    props.history.push("./riskfactor");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Current Pregnancy</h2>

      <label>
        Estimated Date of Delivery {'   '}
        <Controller
          as={DatePicker}
          name='edd'
          control={control}
          defaultValue={moment(state.data.edd1)}
          format={dateFormat}
          size='small'
        />
      </label>

      <label>
        EGA {"   "}
        <Controller
          as={InputNumber}
          name='ega'
          control={control}
          min={0}
          defaultValue={state.data.ega}
        />
      </label>

      <br />
      <Button onClick={() => props.history.goBack()} style={{ marginTop: 15, width: 150 }}>
        <LeftOutlined />
        Obstetric History
      </Button>
      <Button
        type='primary'
        htmlType='submit'
        style={{ marginTop: 15, width: 150, float: "right", clear: "left" }}>
        Risk Factors
        <RightOutlined />
      </Button>
    </form>
  );
}

export default withRouter(CurrentPregnancy);
