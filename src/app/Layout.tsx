import React from "react";
import NavigationBar from "../pages/NavigationBar";
import { getObjectClassNames } from "design/utils";

const classes = getObjectClassNames({
  container: {
    background: "ghostwhite",
  },
});
const Layout = ({ ...props }) => {
  return (
    <div className={classes.container}>
      <NavigationBar />
      {props.children}
    </div>
  );
};

export default Layout;
