import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import  Administrator  from './views/Administrator/index';
import  Login  from './views/Login/index';
import  Professor  from './views/Professor/index';
import  Student  from './views/Student/index';


export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact from="/" to="/Login" >
        <Login />
      </Route>
      <Route path="/admin">
        <Administrator />
      </Route>
      <Route path="/Professor">
        <Professor />
      </Route>
      <Route path="/Student">
        <Student />
      </Route>
    </Switch>
  </BrowserRouter>
);