import React from 'react'
import './App.less';
import Profile from './components/Profile';


// import Home from './components/Home';
import ProfileGrid from './components/ProfileGrid';
// import Login from './components/Login';
// import PatientGrid from './components/PatientGrid';
// import Register from './components/Register';


function App() {
  return (
    <div className="App">
      <Profile/>
      <ProfileGrid/>
    </div>
  );
}

export default App;
