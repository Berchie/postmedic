import React from "react";
import "date-fns";
import { DatePicker, InputNumber, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import { parseISO } from "date-fns";
import { isDate } from "date-fns/esm";

function CurrentPregnancy(props) {
  const { control, handleSubmit, register } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const dateFormat = "YYYY-MM-DD";

  const onSubmit = (data) => {
    action(data);
    console.log(
      new Date(data.edd1).getDate().toString() +
        "-" +
        new Date(data.edd1).getMonth().toString() +
        "-" +
        new Date(data.edd1).getFullYear().toString(), data
    );
    props.history.push("./riskfactor");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Current Pregnancy</h2>

      <label>Estimated Date of Delivery</label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Controller
          name='edd'
          control={control}
          defaultValue={state.data.edd}
          render={({ ref, ...reset }) => (
            <KeyboardDatePicker
              disableToolbar
              //  fullWidth
              name='edd'
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date picker inline'
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              {...reset}
            />
          )}
        />
      </MuiPickersUtilsProvider>

      <Controller
        as={DatePicker}
        name='edd1'
        control={control}
        value='7-11-2020'
        defaultValue={moment()}
        format={dateFormat}
        size='small'
      />
      <input
        type='date'
        name='edd2'
        ref={register}
        defaultValue={state.data.edd2}
        onChange={(e) => e.target.value}
      />

      <label>EGA</label>
      <Controller
        as={InputNumber}
        name='ega'
        control={control}
        min={0}
        defaultValue={state.data.ega}
      />

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
