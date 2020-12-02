import React from 'react'
import './App.less';

import Dasboard from './components/Dasboard';
import Home from './components/Home';
import Login from './components/Login';
import Patient from './components/Patient';
import Register from './components/Register';


function App() {
  return (
    <div className="App">
      <Patient/>
    </div>
  );
}

export default App;
