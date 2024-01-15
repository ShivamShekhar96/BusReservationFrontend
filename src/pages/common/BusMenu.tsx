import axios from "axios";
import React, { useEffect, useState } from "react";
import busDataArray from "../../helpers/bus.json";
import { getObjectClassNames } from "design/utils";

export type Bus = {
  number: string;
};
const classes = getObjectClassNames({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
    alignItems: 'center',
    background: 'floralwhite',
    borderRadius: 3,
    margin: 10
  },
  label:{
    fontWeight: 600,
    textDecoration: 'underline'
  }
});
type BusMenuProps = {
  optionClass?: any;
  datalistClass?: any;
  containerClass?: any;
  onBusSelect: any;
};
export const BusMenu = (props: BusMenuProps) => {
  const [busData, setBusData] = useState<Array<Bus>>([{ number: "" }]);
  useEffect(() => {
    (async () => {
    //   const response = await axios.get("fetch bus");
      setBusData(busDataArray);
    })();
  });

  const onSelect = () => {
    var val = (document.getElementById("bus-input") as HTMLInputElement).value;
    var opts: any = (
      document.getElementById("buses-list") as HTMLDataListElement
    ).children;
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        // An item was selected from the list!
        props.onBusSelect(val);
      }
    }
  };
  return (
    <div className={`${classes.container} ${props.containerClass}`}>
      <label className={classes.label} htmlFor="bus-menu">Select Bus:</label>
      <input
        list="buses-list"
        id="bus-input"
        name="bus-menu"
        onInput={onSelect}
      />
      <datalist className={`${classes.datalist}`} id="buses-list">
        {busData.map((bus) => {
          return <option className={`${classes.option}`}>{bus.number}</option>;
        })}
      </datalist>
    </div>
  );
};
