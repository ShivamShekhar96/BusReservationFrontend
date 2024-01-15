import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import axios from "axios";
import DashboardData from "../helpers/dashboard.json";
import { getObjectClassNames } from "../design/utils";
import { Bus, BusMenu } from "./common/BusMenu";
import { EditView } from "./common/EditModal";

const classes = getObjectClassNames({
  tableCellHeader: {
    padding: 10,
    fontWeight: 600,
    // border: "1px solid black",
    borderCollapse: "collapse",
    boxShadow: "0px 2px 5px grey",
  },
  tableContainer: {
    alignSelf: "center",
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0px 1px 3px grey",
  },
  tableHead: {
    // border: "1px solid black",
    // borderCollapse: "collapse",
    position: "sticky",
    // border: "1px solid black",
    top: 0,
    background: "white",
    boxShadow: "0px 2px 5px grey",
  },
  tableCell: {
    padding: 10,
    borderRight: "1px solid black",
    boxShadow: "0px 1px 2px grey",
  },
  tableBody: {
    "&:last-child tr": {
      border: 0,
    },
  },
  tableRow: {
    "&:last-child tr": {
      border: 0,
    },
  },
  container: {
    width: "80%",
    height: 500,
    overflowY: "auto",
    marginTop: 20,
    border: "1px solid black",
    borderRadius: 3,
  },
  busContainer: {
    width: "80%",
  },
  // bodyContainer: {
  //   width: "80%",
  //   // display: "flex",
  //   // flexDirection: "column",
  //   // justifyContent: "center",
  //   height: 300,
  //   overflowY: "auto",
  // },
});

export type Reservation = {
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

const ReservationDashboard = () => {
  const [reservations, setReservations] = useState<Array<Reservation>>([]);
  const [updatedValues, setUpdatedValues] = useState<UpdatedValue>({});
  const [showEditView, setShowEditView] = useState<boolean>(false);
  const [busNumber, setBusNumber] = useState<string>("");
  const currIndexRef = useRef<number>(0);

  useEffect(() => {
    // (async () => {
    //   const response = await axios.get("reservations");
    //   setReservations(response.data);
    // })();
    setReservations(DashboardData);
  }, [busNumber]);

  const onBusSelect = (value: string) => {
    setBusNumber(value);
  };
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
    <div
      style={{
        padding: 10,
        height: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "ghostwhite",
      }}
    >
      <BusMenu
        onBusSelect={onBusSelect}
        containerClass={classes.busContainer}
      />
      <div className={classes.container}>
        <table className={classes.tableContainer}>
          <thead className={classes.tableHead}>
            <tr>
              <td className={classes.tableCellHeader} style={{ width: "10%" }}>
                Serial No.
              </td>
              <td className={classes.tableCellHeader} style={{ width: "30%" }}>
                Name
              </td>
              <td className={classes.tableCellHeader} style={{ width: "30%" }}>
                Email
              </td>
              <td className={classes.tableCellHeader} style={{ width: "7%" }}>
                Seat No.
              </td>
              <td className={classes.tableCellHeader} style={{ width: "10%" }}>
                Booking Date
              </td>
              <td className={classes.tableCellHeader} style={{ width: "5%" }} />
              <td className={classes.tableCellHeader} style={{ width: "8%" }} />
            </tr>
          </thead>
          <tbody className={classes.tableBody}>
            {reservations.map((e, i) => {
              let background = i % 2 == 0 ? "floralwhite" : "lavender";
              return (
                <tr className={classes.tableRow}>
                  <td
                    className={classes.tableCell}
                    style={{ width: "10%", background: background }}
                  >
                    {i + 1}.
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "30%", background: background }}
                  >
                    {e.first_name} {e.last_name}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "30%", background: background }}
                  >
                    {e.email}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "7%", background: background }}
                  >
                    {e.seat_number}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "10%", background: background }}
                  >
                    {e.booking_date}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "5%", background: background }}
                  >
                    <button onClick={(e) => onEdit(i)}>Edit</button>
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "8%", background: background }}
                  >
                    <button onClick={(e) => onDelete(i)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal open={showEditView}>
        <EditView
          onUpdate={onUpdate}
          onCancel={onCancel}
          onSaveChanges={onSaveChanges}
          reservations={reservations}
          index={currIndexRef.current}
        />
      </Modal>
    </div>
  );
};

export default ReservationDashboard;
