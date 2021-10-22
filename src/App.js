import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Topnav from './components/Topnav';
import Dashboard from './components/Dashboard';
import Dashboardgh from './components/Dashboardgh'
import Login from './components/Login';
import PagenotFound404 from './components/PagenotFound404';
import Test from './components/Test';
import Pushnotification from './components/Pushnotification';
function App() {
  const [logUser, setLogUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    setLogUser(JSON.parse(localStorage.getItem("MyUser")));
  }, [])
  const updateUserinlocalStorage = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user));
    setLogUser(user);
  }
  const logout = () => {
    localStorage.clear();
    setLogUser({});
    history.push("/");
  }
  const datconverted = (dated) => {
    var today_date = dated;
    var dd_date = String(today_date.getDate()).padStart(2, '0');
    var mm_date = String(today_date.getMonth() + 1).padStart(2, '0');
    var yyyy_date = today_date.getFullYear();
    today_date = mm_date + '/' + dd_date + '/' + yyyy_date;
    return today_date;
  }
  const getDifferenceInDays = (start_date, end_date) => {
    const diffInMs = Math.abs(end_date - start_date);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  const storedData = JSON.parse(localStorage.getItem("MyUser"));
  return (
    <div className="App">
      <Topnav loggedinuser={logUser} logout={logout} />
      <Switch>
        <Route path="/" exact={true}>
          {
            storedData ? storedData.gh && storedData.gh === 1 ? <Dashboardgh loggedinuser={logUser} datconverted={datconverted} getDifferenceInDays={getDifferenceInDays} /> : <Dashboard loggedinuser={logUser} /> : <Login updateUserinlocalStorage={updateUserinlocalStorage} />
          }
        </Route>
        <Route path="/login"><Login updateUserinlocalStorage={updateUserinlocalStorage} /></Route>

        <Route path="/test"><Test updateUserinlocalStorage={updateUserinlocalStorage} /></Route>
        <Route path="/pushnote"><Pushnotification /></Route>
        <Route path="*"><PagenotFound404 /></Route>
      </Switch>
    </div>
  );
}
export default App;