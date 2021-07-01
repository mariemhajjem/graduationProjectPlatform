import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js"; 
import Sidebar from "components/Sidebar/Sidebar.js";  
import routes from "./routesProf";
import authProvider from '../layouts/authProvider'
import NotAuthorized from "./NotAuthorized";
var ps;

function Professor(props) {
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
          
          <Redirect from="/professor" to="/professor/user-page" />
          <Redirect to="/" />
        </Switch>
      </div> 
    </div>) : <NotAuthorized /> 
  );
}

export default Professor;
