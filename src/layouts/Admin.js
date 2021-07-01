import React from "react"; 
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js"; 
import Sidebar from "components/Sidebar/Sidebar.js";  
import routes from "./routes"; 
import authProvider from '../layouts/authProvider'
import NotAuthorized from "./NotAuthorized";

function Admin(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();
  
  return authProvider.checkAuth()!==null ? (
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
          {/* 
          <Redirect from="/admin" to="/admin/dashboard" />
          <Redirect from="/" to="/" /> */}
        </Switch>
      </div>
    </div>
  ) : <NotAuthorized /> 
    
}

export default Admin;
