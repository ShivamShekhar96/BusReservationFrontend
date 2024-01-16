import React from "react";

type SeatProps = {
  seat: SeatData;
  onClick: any;
  className?: any;
  headClass?: any;
};

export type SeatData = {
  id: string;
  type: string;
  number: string;
  status: string;
};

export const Seat = (props: SeatProps) => {
  const background = props.seat?.status == "booked" ? "darkseagreen" : "gray";
  return (
    <div
      className={props.className}
      style={{
        background: background,
        margin: 5,
        padding: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: props.seat?.status != "booked" && "pointer",
      }}
      onClick={() =>
        props.seat.status !== "booked" && props.onClick(props.seat)
      }
    >
      <text>{props.seat?.number}</text>
      <div
        className={props.headClass}
        style={{
          display: "flex",
          marginLeft: 5,
          border: "1px solid black",
          borderRadius: 3,
          alignItems: "center",
          background: "darkslategrey",
        }}
      ></div>
    </div>
  );
};
