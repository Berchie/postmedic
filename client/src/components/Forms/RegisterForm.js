import React from "react";
import { inputField, emailInputField, passwordInputField } from "./Inputs";
import { useForm, Controller } from "react-hook-form";
import { Button, Checkbox } from "antd";
import "../../styles/Register.less";


export default function RegisterForm() {
  const { handleSubmit, control, errors, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setTimeout(
      () =>
        reset({
          institution: "",
          address: "",
          city: "",
          telephone: "",
          name: "",
          username: "",
          email: "",
          password: "",
          aggreement: false
        }),
      1000
    );
  };

  return (
    <>
    <h2 className='title'>Register</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='input-group'>
        <label className='label'>Institution</label>
        <br />
        <Controller
          as={inputField("Institution")}
          name='institution'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.institution && <span className='error'>Institution field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>Address</label>
        <br />
        <Controller
          as={inputField("Address")}
          name='address'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.address && <span className='error'>Address field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>City</label>
        <br />
        <Controller
          as={inputField("City")}
          name='city'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.city && <span className='error'>City field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>Telephone</label>
        <br />
        <Controller
          as={inputField("Telephone")}
          name='telephone'
          control={control}
          defaultValue=''
          rules={{ min: 10 }}
        />
        {errors.telephone && <span className='error'>This field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>Full Name</label>
        <br />
        <Controller
          as={inputField("Full Name")}
          name='name'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.name && <span className='error'>Full Name field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>Username</label>
        <br />
        <Controller
          as={inputField("Username")}
          name='username'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.username && <span className='error'>Username field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>Email</label>
        <br />
        <Controller
          as={emailInputField("Email")}
          name='email'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.email && <span className='error'>Email field is required</span>}
      </div>
      <div className='input-group'>
        <label className='label'>Password</label>
        <Controller
          as={passwordInputField("Password")}
          name='password'
          control={control}
          defaultValue=''
          rules={{ required: true }}
        />
        {errors.password && <span className='error'>Password field is required</span>}
      </div>
      <div className='input-group'>
        <Controller
        name='aggreement'
        control={control}
        render={props => (
          <Checkbox
            onChange={e => props.onChange(e.target.checked)}
            checked={props.value}
          >I have read the <a href="">agreement</a></Checkbox>
        )}
        rules={{required: true}}
        />
        {errors.aggreement && <span className='error'>Aggreement field is required</span>}
      </div>
      <Button type='primary' htmlType='submit'>
        Register
      </Button>
    </form>
    </>
  );
}
