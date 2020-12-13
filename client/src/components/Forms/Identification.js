import React from "react";
import { Input, InputNumber, Button, Select } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import '../../styles/Patient.less'

export default withRouter(function Identification(props) {
  const { control, handleSubmit, errors } = useForm();
  const { action, state } = useStateMachine(updateAction);

  const onSubmit = (data) => {
    action(data);
    props.history.push("./ObstetricHistory");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Identification</h2>
      <label>
        First Name {"    "}
        <Controller
          as={Input}
          name='firstname'
          control={control}
          minLength={2}
          maxLength={150}
          style={{ width: "60%" }}
          defaultValue={state.data.firstname}
          rules={{ required: true }}
          className='input'
        />
        {errors.firstname && <span className='errors'>First Name field is required</span>}
      </label>

      <label>
        Middle Name {"    "}
        <Controller
          as={Input}
          name='middlename'
          control={control}
          minLength={2}
          maxLength={150}
          style={{ width: "60%" }}
          defaultValue={state.data.middlename}
          className='input'
        />
      </label>

      <label>
        Last Name {"    "}
        <Controller
          as={Input}
          name='lastname'
          control={control}
          minLength={2}
          maxLength={150}
          style={{ width: "60%" }}
          defaultValue={state.data.lastname}
          rules={{ required: true }}
          className='input'
        />
        {errors.lastname && <span className='errors'>Last Name field is required</span>}
      </label>

      <label>
        Age: {"    "}
        <Controller
          as={InputNumber}
          name='age'
          min={10}
          max={999}
          control={control}
          defaultValue={state.data.age}
          rules={{ required: true }}
          className='input'
        />
        {errors.age && <span className='errors'>Age field is required</span>}
      </label>

      <label>
        Gender {"    "}
        <Controller
          name='gender'
          as={Select}
          options={[
            { value: "", label: "Select...." },
            { value: "male", label: "Male" },
            { value: "female", label: "female" },
          ]}
          control={control}
          style={{ width: "40%" }}
          defaultValue={state.data.gender}
          className='input'
          rules={{ required: true }}
        />
        {errors.gender && <span className='errors'>Gender field is required</span>}
      </label>

      <label>
        Hospital ID {"    "}
        <Controller
          as={Input}
          name='hospitalId'
          control={control}
          maxLength={15}
          defaultValue={state.data.hospitalId}
          style={{ width: "60%" }}
          rules={{ required: true }}
          className='input'
        />
        {errors.hospitalId && <span className='errors'>Hospital Id field is required</span>}
      </label>

      <label>
        City {"    "}
        <Controller
          as={Input}
          name='city'
          control={control}
          maxLength={50}
          defaultValue={state.data.city}
          style={{ width: "60%" }}
          rules={{ required: true }}
          className='input'
        />
        {errors.city && <span className='errors'>City field is required</span>}
      </label>

      <label>
        Phone {"    "}
        <Controller
          as={Input}
          name='phone'
          control={control}
          maxLength={15}
          defaultValue={state.data.phone}
          style={{ width: "60%" }}
          rules={{ required: true }}
          className='input'
        />
        {errors.phone && <span className='errors'>Phone field is required</span>}
      </label>

      <label>
        Email {"    "}
        <Controller
          as={Input}
          name='email'
          control={control}
          defaultValue={state.data.email}
          style={{ width: "60%" }}
          rules={{ required: true }}
          className='input'
        />
        {errors.email && <span className='errors'>Email field is required</span>}
      </label>
      <br />
      <Button
        type='primary'
        htmlType='submit'
        style={{ marginTop: 15, width: 150, float: "right" }}>
        Obstetric History
        <RightOutlined />
      </Button>
    </form>
  );
});
