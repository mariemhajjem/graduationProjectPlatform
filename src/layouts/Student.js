import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// core components 
import Sidebar from "components/Sidebar/Sidebar.js";  
import routes from "./routesStudent";
import DemoNavbar from "components/Navbars/DemoNavbar.js"; 
var ps;

import authProvider from '../layouts/authProvider'
import NotAuthorized from "./NotAuthorized";

function Student(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();
  
  const handleColorClick = (color) => {
    setBackgroundColor(color);
  };
  return (
    authProvider.checkAuth()!==null ? (
    <div className="wrapper">
      <Sidebar {...props} routes={routes} backgroundColor={backgroundColor} />
      <div className="main-panel" ref={mainPanel}>
      <DemoNavbar {...props} />
        
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          
          <Redirect to="/student" to="/student/user-page" />
          <Redirect from="/" to="/" />
        </Switch>
      </div> 
    </div>) : <NotAuthorized /> 
  );
}

export default Student;
