import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getObjectClassNames } from "../design/utils";

const classes: any = getObjectClassNames({
  navContainer: {
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 2px 10px grey",
    height: 40,
    justifyContent: "space-around",
    padding: 10,
    background: 'linear-gradient(90deg, grey, transparent)'
  },
  navText: {
    fontSize: 20,
    fontFamily: "monospace",
    cursor: 'pointer'
  },
});

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.navContainer}>
      <div className={classes.navText} onClick={() => navigate("/seats")}>
        Seats
      </div>
      <div className={classes.navText} onClick={() => navigate("/dashboard")}>
        Reservation
      </div>
    </div>
  );
};

export default NavigationBar;
