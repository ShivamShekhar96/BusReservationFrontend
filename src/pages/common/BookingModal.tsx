import { Button } from "@mui/material";
import { getObjectClassNames } from "design/utils";
import React, { useState } from "react";

const modalClasses = getObjectClassNames({
  container: {
    flexDirection: "column",
    background: "aliceblue",
    flexWrap: "wrap",
    width: "40%",
    top: '30%',
    right: '30%',
    position: 'fixed',
    alignContent: "center",
    height: 300,
    display: "flex",
    borderRadius: 3,
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
type BookingModalProps = {
  onSubmit: any;
  onCancel: any;
};

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
};

export const BookingModal = (props: BookingModalProps) => {
  const [userData, setUserData] = useState<UserData>();

  const handleChange = (key: string, value: string) => {
    let temp = userData;
    temp = { ...temp, [key]: value };
    setUserData(temp);
  };
  return (
    <div className={modalClasses.container}>
      <div className={modalClasses.fields}>
        <label htmlFor="first-name-booking" className={modalClasses.label}>
          First Name
        </label>
        <input
          id="first-name-booking"
          onChange={(e) => handleChange("first_name", e.target.value)}
          className={modalClasses.input}
        />
        <label htmlFor="last-name-booking" className={modalClasses.label}>
          Last Name
        </label>
        <input
          id="first-name-booking"
          onChange={(e) => handleChange("last_name", e.target.value)}
          className={modalClasses.input}
        />
        <label htmlFor="email-booking" className={modalClasses.label}>
          Email
        </label>
        <input
          id="email-booking"
          onChange={(e) => handleChange("email", e.target.value)}
          className={modalClasses.input}
        />
      </div>
      <div className={modalClasses.actionContainer}>
        <Button onClick={() => props.onSubmit(userData)}>Book</Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
