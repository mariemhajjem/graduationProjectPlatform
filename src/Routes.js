import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import  Administrator  from './views/admin/index';
import  Login  from './views/auth/index';
import  Professor  from './views/Professor/index';
import  Student  from './views/Student/index';
import  EditStudent  from './views/admin/EditStudent';
import  StudentDetails  from './views/admin/StudentDetails';
import  EditProfessor  from './views/admin/EditProfessor';
import  ProfessorDetails  from './views/admin/ProfessorDetails';

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact from="/" to="/Login" >
        <Login />
      </Route>
      <Route path="/admin">
        <Administrator />
      </Route>
      <Route path="/professor">
        <Professor />
      </Route>
      <Route path="/student">
        <Student />
      </Route>
      <Route exact path="/EditStudent/editID/:id">
        <EditStudent />
      </Route>
      <Route exact path="/StudentDetails/:id">
        <StudentDetails />
      </Route>
      <Route exact path="/EditProfessor/editID/:id">
        <EditProfessor />
      </Route>
      <Route exact path="/ProfessorDetails/:id">
        <ProfessorDetails />
      </Route>
    </Switch>
  </BrowserRouter>
);