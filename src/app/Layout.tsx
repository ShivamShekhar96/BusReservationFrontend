import React from "react";
import NavigationBar from "../pages/NavigationBar";

const Layout = ({...props}) => {
  return (
    <React.Fragment>
      <NavigationBar />
      {props.children}
    </React.Fragment>
  );
};

export default Layout
