import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";

export default function Content() {
  return (
    <Switch>
      <Route path="/" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/dashboard" />
    </Switch>
  );
}

 