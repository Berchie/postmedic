import React from "react";
import { Input, InputNumber, Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";


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
      <label>First Name</label>
      <Controller
        as={Input}
        name='firstname'
        control={control}
        minLength={2}
        maxLength={150}
        defaultValue={state.data.firstname}
        rules={{ required: true }}
        className='input'
      />
      {errors.firstname && <span className='errors'>First Name field is required</span>}

      <label>Middle Name</label>
      <Controller
        as={Input}
        name='middlename'
        control={control}
        minLength={2}
        maxLength={150}
        defaultValue={state.data.middlename}
        className='input'
      />

      <label>Last Name</label>
      <Controller
        as={Input}
        name='lastname'
        control={control}
        minLength={2}
        maxLength={150}
        defaultValue={state.data.lastname}
        rules={{ required: true }}
        className='input'
      />
      {errors.lastname && <span className='errors'>Last Name field is required</span>}

      <label>Age: </label>
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

      <label>Gender</label>
      <Controller
        name='gender'
        as={Select}
        options={[{ value: "" }, { value: "Male" }, { value: "Female" }]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.gender}
        className='input'
        rules={{ required: true }}
      />
      {errors.gender && <span className='errors'>Gender field is required</span>}

      <label>Hospital ID</label>
      <Controller
        as={Input}
        name='hospitalId'
        control={control}
        maxLength={15}
        defaultValue={state.data.hospitalId}
        // style={{ width: "70%" }}
        rules={{ required: true }}
        className='input'
      />
      {errors.hospitalId && <span className='errors'>Hospital Id field is required</span>}
      
      <label>City</label>
      <Controller
        as={Input}
        name='city'
        control={control}
        maxLength={50}
        defaultValue={state.data.city}
        // style={{ width: "70%" }}
        rules={{ required: true }}
        className='input'
      />
      {errors.city && <span className='errors'>City field is required</span>}

      <label>Phone</label>
      <Controller
        as={Input}
        name='phone'
        control={control}
        maxLength={15}
        defaultValue={state.data.phone}
        // style={{ width: "70%" }}
        rules={{ required: true }}
        className='input'
      />
      {errors.phone && <span className='errors'>Phone field is required</span>}

      <label>Email</label>
      <Controller
        as={Input}
        name='email'
        control={control}
        defaultValue={state.data.email}
        // style={{ width: "70%" }}
        rules={{ required: true }}
        className='input'
      /><br/>
      {errors.hospitalId && <span className='errors'>Hospital Id field is required</span>}

      <Button type='primary' htmlType='submit' style={{marginTop: 15, width: 150, float:"right"}}>
        Next
      </Button>
    </form>
  );
});
