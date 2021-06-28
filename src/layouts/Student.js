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

function Student(props) {
  const location = useLocation();
  const [backgroundColor, setBackgroundColor] = React.useState("blue");
  const mainPanel = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
  }, [location]);
  const handleColorClick = (color) => {
    setBackgroundColor(color);
  };
  return (
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
          
          <Redirect from="/Student" to="/Student/home" />
          <Redirect from="/" to="/" />
        </Switch>
      </div> 
    </div>
  );
}

export default Student;
