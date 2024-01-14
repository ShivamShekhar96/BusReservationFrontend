import { Button, Input, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SeatsData from "../helpers/seats.json";

type DeckProps = {
  seat: Seat;
  onClick: any;
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
const Deck = (props: DeckProps) => {
  return (
    <div style={{}} onClick={props.onClick}>
      {props.seat.number}
    </div>
  );
};
const SeatLayout = () => {
  const [busSeats, setBusSeats] = useState<Array<Seat>>([]);
  const [busDetails, setBusDeatils] = useState<BusDetails>({ number: "" });
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
  });

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

  return (
    <React.Fragment>
      <span>Click on avaliable seats to make a reservation.</span>
      <span>Lower Deck</span>
      {busSeats.map((seat) => {
        return seat.type === "lower" ? (
          <React.Fragment>
            <Deck
              seat={seat}
              onClick={(e: any) => onSeatSelect(e.target.value)}
            />
          </React.Fragment>
        ) : (
          ""
        );
      })}
      <span>Upper Deck</span>
      {busSeats.map((seat) => {
        return seat.type === "upper" ? (
          <React.Fragment>
            <Deck
              seat={seat}
              onClick={(e: any) => onSeatSelect(e.target.value)}
            />
          </React.Fragment>
        ) : (
          ""
        );
      })}
      <Modal open={showReservationModal}>
        <ReservationModal
          seat={seatRef.current}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Modal>
    </React.Fragment>
  );
};

export default SeatLayout;
