import { Button, Input, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SeatsData from "../helpers/seats.json";
import { getObjectClassNames } from "design/utils";
import { BusMenu } from "./common/BusMenu";

type DeckProps = {
  seats: Array<Seat>;
  onClick: any;
  deckType: string;
};

type SeatProps = {
  seat: Seat;
  onClick: any;
  className?: any;
  headClass?: any;
};

type Seat = {
  type: string;
  number: string;
  status: string;
};

type ReservationModal = {
  seat: Seat;
  onSubmit: any;
  onCancel: any;
};

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
};

type BusDetails = {
  number: string;
};

const deckClasses = getObjectClassNames({
  container: {
    display: "flex",
    flexDirection: "row",
    width: '50%',
    height: 400,
    background: "floralwhite",
    borderRadius: 3,
    boxShadow: "3px 3px 3px gray",
  },
  busHandle: {
    display: "flex",
    width: "100%",
    boxShadow: "3px 0px 1px grey",
    borderRight: "1px solid black",
    height: "100%",
  },
});

const classes = getObjectClassNames({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(90deg, rgba(172,99,242,1) 0%, rgba(230,192,244,1) 100%)",
    padding: 10,
  },
  reservationText: {
    background: "red",
    margin: "10px 0px 5px 0px",
    padding: 10,
  },
  headerText: {
    padding: 10,
    margin: 5,
    fontSize: 24,
    fontWeight: 600,
  },
  busContainer: {
    width: '50%'
  }
});

const seatClasses = getObjectClassNames({
  container: {
    height: 50,
    width: 100,
    display: "flex",
    justifyContent: "space-around",
    borderRadius: 3,
    flexDirection: "row",
  },
  head: {
    width: 15,
    height: 30,
  },
  backSeat: {
    height: "100px !important",
    width: "50px !important",
    borderRadius: 3,
    flexDirection: "column",
  },
  backSeatHead: {
    width: 30,
    height: 15,
  },
});
const ReservationModal = (props: ReservationModal) => {
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleChange = (key: string, value: string) => {
    const temp = userData;
    temp[key] = value;
    setUserData(temp);
  };

  return (
    <React.Fragment>
      {["First Name", "Last Name", "Email"].map((t) => {
        return (
          <Input
            name={t}
            onChange={(e) => {
              handleChange(t, e.target.value);
            }}
          />
        );
      })}

      <div>
        <Button onClick={() => props.onSubmit(userData)}>Book</Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </div>
    </React.Fragment>
  );
};

const Seat = (props: SeatProps) => {
  const background =
    props.seat?.status == "confirmed" ? "darkseagreen" : "gray";
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
        cursor: "pointer",
      }}
      onClick={props.onClick}
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
const Deck = (props: DeckProps) => {
  return (
    <div className={deckClasses.container} style={{}}>
      <div style={{ width: "10%" }}>
        {props.deckType === "lower" && (
          <div className={deckClasses.busHandle} />
        )}
      </div>
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          {props.seats.map((seat, i) => {
            if (i < 5)
              return (
                <Seat
                  seat={seat}
                  onClick={props.onClick}
                  className={seatClasses.container}
                  headClass={seatClasses.head}
                />
              );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {props.seats.map((seat, i) => {
            if (i >= 5 && i < 10)
              return (
                <Seat
                  seat={seat}
                  onClick={props.onClick}
                  className={seatClasses.container}
                  headClass={seatClasses.head}
                />
              );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 100 }}>
          {props.seats.map((seat, i) => {
            if (i >= 10 && i < 15)
              return (
                <Seat
                  seat={seat}
                  onClick={props.onClick}
                  className={seatClasses.container}
                  headClass={seatClasses.head}
                />
              );
          })}
        </div>
      </div>
      <div style={{ width: "10%", display: "flex", alignItems: "center" }}>
        <Seat
          seat={props.seats[props.seats.length - 1]}
          onClick={props.onClick}
          className={seatClasses.backSeat}
          headClass={seatClasses.backSeatHead}
        />
      </div>
    </div>
  );
};
const SeatLayout = () => {
  const [busSeats, setBusSeats] = useState<Array<Seat>>([]);
  const [busDetails, setBusDeatils] = useState<BusDetails>({ number: "" });
  const [busNumber, setBusNumber] = useState<string>("");
  const [showReservationModal, setShowReservationModal] =
    useState<boolean>(false);
  const seatRef = useRef<Seat>({
    type: "",
    number: "",
    status: "",
  });
  useEffect(() => {
    (async () => {
      //   const response = await axios.get("bus seats");
      const response = SeatsData;
      setBusSeats(response.data.seats);
      setBusDeatils(response.data.bus_details);
    })();
  }, [busNumber]);

  const onCancel = () => {
    setShowReservationModal(false);
  };
  const onFailure = () => {};
  const onSuccess = () => {
    setShowReservationModal(false);
  };

  const onSubmit = async (data: UserData) => {
    try {
      const response = await axios.post("make reservation", {
        ...data,
        bus_number: busDetails.number,
        seat_number: seatRef.current.number,
      });
      response.status == 200 ? onSuccess() : onFailure();
    } catch (e) {
      onFailure();
      console.log("Error occurred while making a resevation", e);
    }
  };
  const onSeatSelect = (seat: Seat) => {
    seatRef.current = seat;
    setShowReservationModal(true);
  };

  const onBusSelect = (value: string) => {
    setBusNumber(value);
  };
  return (
    <div className={classes.container}>
      <BusMenu
        onBusSelect={onBusSelect}
        containerClass={classes.busContainer}
      />
      <span className={classes.reservationText}>
        Click on avaliable seats to make a reservation.
      </span>
      <span className={classes.headerText}>Lower Deck</span>
      <Deck
        deckType={"lower"}
        seats={busSeats.slice(0, busSeats.length / 2)}
        onClick={(e: any) => onSeatSelect(e.target.value)}
      />
      <span className={classes.headerText}>Upper Deck</span>
      <Deck
        deckType={"upper"}
        seats={busSeats.slice(busSeats.length / 2, busSeats.length)}
        onClick={(e: any) => onSeatSelect(e.target.value)}
      />
      <Modal open={showReservationModal}>
        <ReservationModal
          seat={seatRef.current}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Modal>
    </div>
  );
};

export default SeatLayout;
