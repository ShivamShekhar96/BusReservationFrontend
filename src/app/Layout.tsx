import React from "react";
import NavigationBar from "../pages/NavigationBar";
import { getObjectClassNames } from "design/utils";

const classes = getObjectClassNames({
  container: {
    background: "linear-gradient(90deg, rgba(228,232,228,1) 0%, rgba(176,176,176,1) 100%)",
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
