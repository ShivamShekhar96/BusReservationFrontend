import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getObjectClassNames } from "../design/utils";

const classes: any = getObjectClassNames({
  navContainer: {
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 3px 10px gray",
    height: 80,
    background: "ghostwhite",
    marginBottom: 20,
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
    display: "flex",
    marginLeft: '20%',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.navContainer}>
      <div className={classes.logo}>
        <img height={40} width={40} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRklEQVR4nO2Wv0sjQRTHt9r4H1znaROwFZQTAv44DYiFpoigpFFjJSRyh4dKKvFHYS9a3Rm4M6Ikahc1YZf4I2h3eAoHFhYWm1YDWn1lRqO7SXZxs5PdCPPgC8nOzHvvM+8NPEHgxo2boSFV9xmSeAjJ9QjZBVskkVjiATJ19YJVo8nblbhcLHGfAcDzzU+F/Whq8cDd/KWqamrx4Mek/7US1gFebsOO5N0FiFbPaxWYARScB68/vVt6Z94DAQ6gUwG7hGpV4MMC/Iz9t1XgAC/GKxDjLcS+hZZX/mJ26Rwzi1qRb2RN79bNnIPVRwzJtaieQNXOyyWhTkYPwMw5aCZT10IlAJrxWe1cL4mC9ADMnIN2Mn0wD1A02joMgJoAmJ4/Q2DiEF7/Hjx921Tkd2AiRdfYAjBuodXoJbz+XbT1bpWVd3AXa9Erpi20oIZY3/xnCWAklKKJdvoSGP8uY2ouSzX+TabfyNpoOE33RmMXxY943jSACoQ6SsajlgDa++M0yVDkpGR/KHJC1zoG4nRvMrHOfha6SzdQx6QSlQB0+XZokuHIccn+cOSYrn31JZBM/MJ9uoE9gFMSOIDMK4DaaaFsI5CLAfkrQNkATt8eW8XKGvtkC0ACPdy8SfljHSBn7JMtQP5SG4z8twqQN/bJFoCUmHUFFGOfbAFIv5IA5JaU3+zegKLvky2AAxI4gCTeOlYBSby1XgFJ9EEScw4knyOxBVbWMxxEOdWq3xLjAE5XoHsoeFQaaCxTq365ceMmfAx7AlVRenK/zte9AAAAAElFTkSuQmCC" />
        <text style={{fontWeight: 800, fontStyle: 'italic', fontFamily: 'fantasy', fontSize: 24}}>Bus Reservation</text>
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
