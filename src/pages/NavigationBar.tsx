import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getObjectClassNames } from "../design/utils";

const classes: any = getObjectClassNames({
  navContainer: {
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 3px 10px gray",
    height: 80,
    background: "#ffffff",
    marginBottom: 20,
    justifyContent: 'space-around'
  },
  navText: {
    display: 'flex',
    width: '15%',
    fontSize: 20,
    fontFamily: "monospace",
    cursor: "pointer",
    "&:hover": {
      borderBottom: "2px solid blue",
    },
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'

  },
  logo: {
    width: 50,
    height: 50,
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    margin: 5
  }
});

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.navContainer}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className={classes.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 47.5 47.5" viewBox="0 0 47.5 47.5" id="bus"><defs><clipPath id="a"><path d="M0 38h38V0H0v38Z"/></clipPath></defs><g clip-path="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)"><path fill="#808285" d="M0 0v-7a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v7H0Z" transform="translate(1 15)"/><path fill="#ccd6dd" d="M0 0v9c0 1.657-3.343 3-5 3h-20c-8 0-11-2.343-11-4V0H0z" transform="translate(37 14)"/><path fill="#939598" d="M37 11H1v3h36v-3z"/><path fill="#bcbec0" d="M0 0a5.998 5.998 0 0 1-5.95-5.263A2.974 2.974 0 0 1-4-6H6a6 6 0 0 1-6 6" transform="translate(8 11)"/><path fill="#bcbec0" d="M0 0a5.998 5.998 0 0 1-11.95-.737h10c.749 0 1.425.284 1.95.737" transform="translate(35.95 5.737)"/><path d="M0 0a4 4 0 1 0-8 0 4 4 0 0 0 8 0" transform="translate(12 5)"/><path fill="#99aab5" d="M0 0a2 2 0 1 0-4.001.001A2 2 0 0 0 0 0" transform="translate(10 5)"/><path d="M0 0a4 4 0 1 0-8 0 4 4 0 0 0 8 0" transform="translate(34 5)"/><path fill="#99aab5" d="M0 0a2 2 0 1 0-4.001.001A2 2 0 0 0 0 0" transform="translate(32 5)"/><path fill="#f4900c" d="M2 9H1v2h1V9ZM37 11h-1v2h1v-2z"/><path fill="#58595b" d="M37 13H2v10h35V13Z"/><path fill="#292f33" d="M0 0h-1.658C-1.89-.344-2-.685-2-1v-11h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2" transform="translate(3 23)"/><path fill="#55acee" d="M0 0a1 1 0 0 0-1-1h-23a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h23a1 1 0 0 0 1-1V0Z" transform="translate(32 16)"/><path fill="#ffac33" d="M37 17h-1v-2h1v2z"/><path fill="#55acee" d="M0 0h-1v-8h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1" transform="translate(2 21)"/></g></svg>
        </div>
        <text style={{fontWeight: 800, fontStyle: 'italic', fontFamily: 'monospace', fontSize: 24, margin: '0px 10px'}}>BusService</text>
      </div>
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
