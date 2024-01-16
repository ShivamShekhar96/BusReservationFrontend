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
  const background = props.seat?.status == "booked" ? "linear-gradient(90deg, rgba(80,214,86,1) 0%, rgba(196,236,198,1) 100%)" : "linear-gradient(90deg, rgba(129,129,129,1) 0%, rgba(218,222,218,1) 100%)";
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
        boxShadow: '1px 1px 5px grey'
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
          border: "1px solid #196f15",
          borderRadius: 5,
          alignItems: "center",
          background: "linear-gradient(90deg, rgba(25,111,21,1) 0%, rgba(39,41,39,1) 100%)",
          boxShadow: '1px 1px 10px grey'
        }}
      ></div>
    </div>
  );
};
