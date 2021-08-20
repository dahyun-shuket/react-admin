import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

// core components
import DemoNavbar from "./DemoNavbar.js";
import Footer from "./Footer.js";
import Sidebar from "./Sidebar.js";
// import FixedPlugin from "./FixedPlugin.js";

import routes from "../routes.js";
import RecruitView from "../pages/views/RecruitView.js";
import ResumeView from "../pages/views/ResumeView.js"
var ps;

function Admin(props) {
  const location = useLocation();
  const [backgroundColor] = React.useState("blue");
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
  // const handleColorClick = (color) => {
  //   setBackgroundColor(color);
  // };
  return (
    <div className="wrapper">
      <Sidebar {...props} routes={routes} backgroundColor={backgroundColor} />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          <Route path="/admin/recruit/:id" component={RecruitView}></Route>
          <Route path="/admin/resume/:id" component={ResumeView}></Route>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
        <Footer fluid />
      </div>
      {/* <FixedPlugin
        bgColor={backgroundColor}
        handleColorClick={handleColorClick}
      /> */}
    </div>
  );
}

export default Admin;