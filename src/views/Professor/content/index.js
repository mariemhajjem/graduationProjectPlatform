import React from 'react'
import ProfessorLayout from "layouts/Professor";
import { Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.5.0";
import "assets/css/demo.css";

export default function Content() {
    return (
        <Switch>
        <Route path="/" render={(props) => <ProfessorLayout {...props} />} />
        <Redirect to="/" />
      </Switch>
    )
}
