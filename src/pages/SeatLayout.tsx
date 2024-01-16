import { Modal, useThemeProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import SeatsData from "../helpers/seats.json";
import { getObjectClassNames } from "design/utils";
import { Bus, BusMenu } from "./common/BusMenu";
import { BookingModal, UserData } from "./common/BookingModal";
import Request from "helpers/request";
import { Seat, SeatData } from "./common/Seat";

type DeckProps = {
  seats: Array<SeatData>;
  onClick: any;
  deckType: string;
};

const deckClasses = getObjectClassNames({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    height: 400,
    background: "#ffffff",
    borderRadius: 5,
    boxShadow: "3px 3px 10px gray",
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
    // justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(90deg, rgba(228,232,228,1) 0%, rgba(176,176,176,1) 100%)",
    padding: 10,
    height: 900,
    maxHeight: 1600
  },
  reservationText: {
    background: "red",
    margin: "10px 0px 5px 0px",
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    padding: 10,
    margin: 5,
    fontSize: 24,
    fontWeight: 600,
  },
  busContainer: {
    width: "50%",
  },
});

const seatClasses = getObjectClassNames({
  container: {
    height: 50,
    width: 100,
    display: "flex",
    justifyContent: "space-around",
    borderRadius: 5,
    flexDirection: "row",
  },
  head: {
    width: 15,
    height: 30,
  },
  backSeat: {
    height: "100px !important",
    width: "50px !important",
    borderRadius: 5,
    flexDirection: "column",
  },
  backSeatHead: {
    width: 30,
    height: 15,
  },
});

const Deck = (props: DeckProps) => {
  const seats = props.seats.filter((seat) => {
    return seat.type === props.deckType;
  });

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
          {seats.map((seat, i) => {
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
          {seats.map((seat, i) => {
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
          {seats.map((seat, i) => {
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
          seat={seats[seats.length - 1]}
          onClick={props.onClick}
          className={seatClasses.backSeat}
          headClass={seatClasses.backSeatHead}
        />
      </div>
    </div>
  );
};
const SeatLayout = () => {
  const [busSeats, setBusSeats] = useState<Array<SeatData>>([]);
  const [busDetails, setBusDeatils] = useState<Bus>();
  const [showReservationModal, setShowReservationModal] =
    useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<SeatData>();

  useEffect(() => {
    (async () => {
      if (busDetails?.id) {
        const response = await Request.get(`/seats?bus_id=${busDetails?.id}`);
        setBusSeats(response.data);
      }
    })();
  }, [busDetails?.id]);

  useEffect(() => {}, [busSeats]);

  const onCancel = () => {
    setShowReservationModal(false);
  };
  const onFailure = () => {
    setShowReservationModal(false);
  };
  const onSuccess = () => {
    setShowReservationModal(false);

    let temp = [...busSeats];
    const reqIndex = temp.findIndex((seat) => seat.id === selectedSeat.id);
    temp[reqIndex]["status"] = "booked";
    setBusSeats(temp);
  };

  const onSubmit = async (data: UserData) => {
    try {
      const response = await Request.post("/reservations", {
        passenger_details: data,
        bus_id: busDetails.id,
        seat_id: selectedSeat.id,
      });
      response.status === 200 ? onSuccess() : onFailure();
    } catch (e) {
      onFailure();
      console.log("Error occurred while making a resevation", e);
    }
  };
  const onSeatSelect = (seat: SeatData) => {
    setSelectedSeat(seat);
    setShowReservationModal(true);
  };

  const onBusSelect = (value: Bus) => {
    setBusDeatils(value);
  };
  return (
    <div className={classes.container}>
      <BusMenu
        onBusSelect={onBusSelect}
        containerClass={classes.busContainer}
      />
      {busSeats.length > 0 && (
        <>
          <span className={classes.reservationText}>
            Click on avaliable seats to make a reservation.
          </span>
          <span className={classes.headerText}>Lower Deck</span>
          <Deck deckType={"lower"} seats={busSeats} onClick={onSeatSelect} />
          <span className={classes.headerText}>Upper Deck</span>
          <Deck deckType={"upper"} seats={busSeats} onClick={onSeatSelect} />
        </>
      )}
      <Modal open={showReservationModal}>
        <BookingModal onSubmit={onSubmit} onCancel={onCancel} />
      </Modal>
    </div>
  );
};

export default SeatLayout;
