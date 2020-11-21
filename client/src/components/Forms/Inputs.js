import React from "react";
import { DatePicker, Input, Select, Switch, Checkbox } from "antd";
const { Option } = Select;

export const dateField = () => {
  return <DatePicker style={{ maxWidth: 100 }} />;
};
export const inputField = (placeholder) => {
  return <Input placeholder={placeholder} />;
};

export const emailInputField = (placeholder) => {
  return <Input placeholder={placeholder} type='email' />;
};

export const passwordInputField = (placeholder) => {
  return <Input placeholder={placeholder} type='password' />;
};

export const SelectField = (defaultValue, values) => {
  return (
    <Select defaultValue={defaultValue} style={{ width: 120 }}>
      {values.map((value, index) => {
        return (
          <Option value={value} key={index}>
            {value}
          </Option>
        );
      })}
    </Select>
  );
};

export const SwitchField = () => {
  return <Switch defaultChecked style={{ maxWidth: 50 }} />;
};

export const CheckBoxFiled = () => {
  return <Checkbox/>;
};
