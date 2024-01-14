import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import DashboardData from "../helpers/dashboard.json";
import { getObjectClassNames } from "../design/utils";

const classes = getObjectClassNames({
  tableCellHeader: {
    padding: 10,
    fontWeight: 600,
    border: "1px solid black",
    borderCollapse: "collapse",
  },
  tableContatiner: {
    marginTop: 10,
    alignSelf: "center",
    width: "90%",
    borderCollapse: "collapse",
  },
  tableHead: {
    border: "1px solid black",
    borderCollapse: "collapse",
  },
  tableCell: {
    padding: 10,
    border: "1px solid black",
    borderCollapse: "collapse",
  },
});

const modalClasses = getObjectClassNames({
  container: {
    flexDirection: "column",
    background: "aliceblue",
    flexWrap: "wrap",
    width: "40%",
    margin: 50,
    alignContent: "center",
    height: 300,
    display: "flex",
    borderRadius: 2,
    padding: 10,
    justifyContent: 'center'
  },
  actionContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: 'center'
  },
  fields: {
    flexDirection: "column",
    display: "flex",
    padding: 10,
    width: '80%',
    alignContent: 'center'
  },
  input: {
    height: 25,
    margin: 5
  }
});
type Reservation = {
  first_name: string;
  last_name: string;
  email: string;
  seat_number: string;
  booking_date: string;
};

type UpdatedValue = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

type EditView = {
  onSaveChanges: any;
  onCancel: any;
  onUpdate: any;
  index: number;
  reservations: Array<Reservation>;
};

const EditView = (props: EditView) => {
  const data = props.reservations[props.index];
  return (
    <div className={modalClasses.container}>
      <div className={modalClasses.fields}>
        <input
          defaultValue={data.first_name}
          name="First Name"
          onChange={(e) => props.onUpdate("first_name", e.target.value)}
          className={modalClasses.input}
        />
        <input
          defaultValue={data.last_name}
          name="Last Name"
          onChange={(e) => props.onUpdate("last_name", e.target.value)}
          className={modalClasses.input}
        />
        <input
          defaultValue={data.email}
          name="Email"
          onChange={(e) => props.onUpdate("email", e.target.value)}
          className={modalClasses.input}
        />
      </div>
      <div className={modalClasses.actionContainer}>
        <Button onClick={props.onSaveChanges}>Save</Button>
        <Button onClick={props.onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

const ReservationDashboard = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [updatedValues, setUpdatedValues] = useState<UpdatedValue>({});
  const [showEditView, setShowEditView] = useState<boolean>(false);
  const currIndexRef = useRef<number>(0);

  useEffect(() => {
    // (async () => {
    //   const response = await axios.get("reservations");
    //   setReservations(response.data);
    // })();
    setReservations(DashboardData);
    debugger;
  });

  // useEffect(() => {
  //   console.log('running')
  // }, [reservations.length]);

  const onUpdate = (key: string, value: string) => {
    const temp = updatedValues;
    temp[key] = value;
    setUpdatedValues(temp);
  };

  const onEdit = (index: number) => {
    currIndexRef.current = index;
    setShowEditView(true);
  };

  const onSaveChanges = () => {
    const temp = reservations;
    temp[currIndexRef.current] = {
      ...temp[currIndexRef.current],
      ...updatedValues,
    };
    setReservations(temp);
    setShowEditView(false);
  };

  const onCancel = () => {
    setShowEditView(false);
  };

  const editView = () => {};

  const onDelete = (index: number) => {
    const temp = [...reservations];
    temp.splice(index, 1);
    console.log(temp);
    setReservations(temp);
  };

  return (
    <table className={classes.tableContatiner}>
      <thead>
        <tr>
          {[
            "Serial No.",
            "Name",
            "Email",
            "Seat No.",
            "Date of booking",
            "",
            "",
          ].map((e) => {
            return <td className={classes.tableCellHeader}>{e}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {reservations.map((e, i) => {
          return (
            <tr>
              <td className={classes.tableCell}>{i + 1}</td>
              <td className={classes.tableCell}>
                {e.first_name} {e.last_name}
              </td>
              <td className={classes.tableCell}>{e.email}</td>
              <td className={classes.tableCell}>{e.seat_number}</td>
              <td className={classes.tableCell}>{e.booking_date}</td>
              <td className={classes.tableCell}>
                <button onClick={(e) => onEdit(i)}>Edit</button>
              </td>
              <td className={classes.tableCell}>
                <button onClick={(e) => onDelete(i)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <Modal open={showEditView}>
        <EditView
          onUpdate={onUpdate}
          onCancel={onCancel}
          onSaveChanges={onSaveChanges}
          reservations={reservations}
          index={currIndexRef.current}
        />
      </Modal>
    </table>
  );
};

export default ReservationDashboard;
