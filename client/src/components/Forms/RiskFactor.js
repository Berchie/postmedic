import React from "react";
import { Button, Select, Input, Row, Col } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import TextArea from "antd/lib/input/TextArea";

export default withRouter(function RiskFactor(props) {
  const { control, handleSubmit } = useForm();
  const { action, state } = useStateMachine(updateAction);

  // const { options } = Select;

  const onSubmit = (data) => {
    action(data);
    console.log(data);
    props.history.push("./admission");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Risk Factors</h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row' span={6}>
          <label>Hypertension</label>
          <Controller
            name='hypertension'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.hypertension}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Heart Disease</label>
          <Controller
            name='heartDisease'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "70%" }}
            defaultValue={state.data.heartDisease}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Sickle Cell Disease</label>
          <Controller
            name='sickleCellDisease'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.sickleCellDisease}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}></Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row' span={6}>
          <label>Diabetes</label>
          <Controller
            name='diabetes'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.diabetes}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Epilepsy</label>
          <Controller
            name='epilepsy'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.epilepsy}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Asthma</label>
          <Controller
            name='asthma'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.asthma}
            className='input'
          />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row' span={6}>
          <label>TB</label>
          <Controller
            name='tb'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.tb}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Respiratory Disease</label>
          <Controller
            name='respiratoryDisease'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.respiratoryDisease}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Mental Illness</label>
          <Controller
            name='mentalIllness'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            // style={{ width: "30%" }}
            defaultValue={state.data.mentalIllness}
            className='input'
          />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row' span={6}>
          <label>HIV Infection</label>
          <Controller
            name='scd'
            as={Input}
            control={control}
            defaultValue={state.data.scd}
            className='input'
          />
        </Col>
        <Col className='gutter-row' span={6}>
          <label>Other</label>
          <Controller
            name='other'
            as={Select}
            options={[
              { value: "", label: "Select...." },
              { value: "no", label: "No" },
              { value: "yes", label: "Yes" },
            ]}
            control={control}
            defaultValue={state.data.other}
            className='input'
          />
        </Col>
        <Col span={6}>
          <label style={{ fontStyle: "italic" }}>
            Other,Specify
            <Controller
              name='otherSpecify'
              as={Input}
              control={control}
              defaultValue={state.data.otherSpecify}
              className='input'
            />
          </label>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={18}>
          <label>Previous Surgery</label>
          <Controller
            name='previousSurgery'
            as={TextArea}
            control={control}
            style={{ width: "50%" }}
            defaultValue={state.data.previousSurgery}
            className='input'
          />
        </Col>
      </Row>
      {/* <label>Hypertension</label>
      <Controller
        name='hypertension'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.hypertension}
        className='input'
      /> */}

      {/* <label>Heart Disease</label>
      <Controller
        name='heartDisease'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.heartDisease}
        className='input'
      /> */}

      {/* <label>Sickle Cell Disease</label>
      <Controller
        name='sickleCellDisease'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.sickleCellDisease}
        className='input'
      /> */}

      {/* <label>Diabetes</label>
      <Controller
        name='diabetes'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.diabetes}
        className='input'
      /> */}

      {/* <label>Epilepsy</label>
      <Controller
        name='epilepsy'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.epilepsy}
        className='input'
      /> */}

      {/* <label>Asthma</label>
      <Controller
        name='asthma'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.asthma}
        className='input'
      /> */}

      {/* <label>TB</label>
      <Controller
        name='tb'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.tb}
        className='input'
      /> */}

      {/* <label>Respiratory Disease</label>
      <Controller
        name='respiratoryDisease'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.respiratoryDisease}
        className='input'
      /> */}

      {/* <label>Mental Illness</label>
      <Controller
        name='mentalIllness'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.mentalIllness}
        className='input'
      /> */}

      {/* <label>HIV Infection</label>
      <Controller
        name='scd'
        as={Input}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.scd}
        className='input'
      /> */}

      {/* <label>Other</label>
      <Controller
        name='other'
        as={Select}
        options={[
          { value: "", label: "Select...." },
          { value: "no", label: "No" },
          { value: "yes", label: "Yes" },
        ]}
        control={control}
        style={{ width: "30%" }}
        defaultValue={state.data.other}
        className='input'
      />
      <Controller
        name='otherSpecify'
        as={Input}
        control={control}
        style={{ width: "40%" }}
        defaultValue={state.data.otherSpecify}
        className='input'
      /> */}

      {/* <label>Previous Surgery</label>
      <Controller
        name='previousSurgery'
        as={TextArea}
        control={control}
        style={{ width: "50%" }}
        defaultValue={state.data.previousSurgery}
        className='input'
      /> */}

      <br />
      <Button onClick={() => props.history.goBack()} style={{ marginTop: 17, width: 150 }}>
        <LeftOutlined />
        Risk Factors
      </Button>
      <Button
        type='primary'
        htmlType='submit'
        style={{ marginTop: 17, width: 150, float: "right", clear: "left" }}>
        Admission
        <RightOutlined />
      </Button>
    </form>
  );
});
