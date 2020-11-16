import React from "react";
import { Button } from "antd";
import "../styles/Home.less";

export default function Home() {
  return (
    <div className='bg'>
      <div className='bg-cover'>
        <div className='home-content'>
          <h1>PostMedic</h1>
          <p>
            PostMedic given the chance to properly track your patients which special case at Obstetrics and Gynaecology
            department. PostMedic help to schedule appointments for your special patients.
            Appointment notification is send to the client and the specialist when the appointment
            about to due.
          </p>
          <Button className='home-btn' type='primary' danger>Register</Button>
          <Button className='home-btn' type='primary'>Login</Button>
        </div>
      </div>
    </div>
  );
}
