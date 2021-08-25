import React, { useState, useEffect } from 'react';
import { BrowserRouter,  Switch } from "react-router-dom";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.scss?v1.5.0";
import './assets/css/demo.css';

import LoginPage from './pages/Login';
import AdminLayout from "./templates/Admin";
import Register from './pages/Register';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';


export default function App(props) {

  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  useEffect(() => {
    const token = getToken();
    if (!token) { 
      return;
    }

      if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

    axios.get(`http://localhost:3000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
    
  localStorage.setItem('authenticated', authenticated)

  return (
        <>
          <BrowserRouter>
            <Switch>
              <PrivateRoute path="/admin" component={AdminLayout}  />
              <PublicRoute restricted exact path='/login' name='login' component={LoginPage} />
              <PublicRoute restricted exact path="/Register"  name="Register Page" component={Register}  />
              <PrivateRoute path='/' component={AdminLayout} />
            </Switch>
          </BrowserRouter>
        </>
      );
}
