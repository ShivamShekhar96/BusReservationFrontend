import React, { useState } from "react";

import { getObjectClassNames } from "design/utils";
import { Reservation } from "pages/ReservationDashboard";
import { Button } from "@mui/material";
import { UserData } from "./BookingModal";

const modalClasses = getObjectClassNames({
  container: {
    flexDirection: "column",
    background:
      "linear-gradient(90deg, rgba(228,232,228,1) 0%, rgba(176,176,176,1) 100%)",
    flexWrap: "wrap",
    width: "40%",
    top: "30%",
    right: "30%",
    position: "fixed",
    alignContent: "center",
    height: 300,
    display: "flex",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  actionContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
  },
  fields: {
    flexDirection: "column",
    display: "flex",
    padding: 10,
    width: "80%",
    alignContent: "center",
  },
  input: {
    height: 25,
    margin: 5,
  },
  label: {
    margin: 5,
  },
});
type EditView = {
  onSaveChanges: any;
  onCancel: any;
  reservation: Reservation;
};

export const EditView = (props: EditView) => {
  const [updatedUserData, setUpdatedUserData] = useState<UserData>();

  const handleChange = (key: string, value: string) => {
    let temp = userData;
    temp = { ...temp, [key]: value };
    setUpdatedUserData(temp);
  };
  const userData = props.reservation.passenger_data;
  return (
    <div className={modalClasses.container}>
      <div className={modalClasses.fields}>
        <label htmlFor="first-name-edit" className={modalClasses.label}>
          First Name
        </label>

        <input
          defaultValue={userData.first_name}
          id="first-name-edit"
          onChange={(e) => handleChange("first_name", e.target.value)}
          className={modalClasses.input}
        />
        <label htmlFor="last-name-edit" className={modalClasses.label}>
          Last Name
        </label>
        <input
          defaultValue={userData.last_name}
          id="last-name-edit"
          onChange={(e) => handleChange("last_name", e.target.value)}
          className={modalClasses.input}
        />
        <label htmlFor="email-edit" className={modalClasses.label}>
          Email
        </label>
        <input
          defaultValue={userData.email}
          id="email-edit"
          onChange={(e) => handleChange("email", e.target.value)}
          className={modalClasses.input}
        />
      </div>
      <div className={modalClasses.actionContainer}>
        <Button
          disabled={!!!updatedUserData?.email}
          onClick={() => props.onSaveChanges(updatedUserData)}
        >
          Save
        </Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
