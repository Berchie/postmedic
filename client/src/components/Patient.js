import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";

//import registration patient components
import Idenitification from './Forms/Identification';
import ObstetricHistory from './Forms/ObstetricHistory';
import CurrentPregnancy from './Forms/CurrentPregnancy';
import Admission from  './Forms/Admission';
import RiskFactor from './Forms/RiskFactor';
import Appointment from './Forms/Appointment';


createStore({
  data:{}
});

export default function Patient() {

  return (
    <StateMachineProvider>
      <Router>
        <Route exact path = "/" component={Idenitification}/>
        <Route path="/obstetrichistory" component={ObstetricHistory}/>
        <Route path="/currentpregnancy" component={CurrentPregnancy}/>
        <Route path="/riskfactor" component={RiskFactor}/>
        <Route path="/admission" component={Admission}/>
        <Route path="/appointment" component={Appointment}/>
        <Route path="/currentpregnancy" component={CurrentPregnancy}/>
        {/* <Redirect eaxct path="/"  component={Idenitification}/> */}
      </Router>
    </StateMachineProvider>
  );
}
