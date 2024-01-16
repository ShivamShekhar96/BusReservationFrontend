import React, { useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import { getObjectClassNames } from "../design/utils";
import { Bus, BusMenu } from "./common/BusMenu";
import { EditView } from "./common/EditModal";
import Request from "helpers/request";
import { UserData } from "./common/BookingModal";

const classes = getObjectClassNames({
  tableCellHeader: {
    padding: 10,
    fontWeight: 600,
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
    position: "sticky",
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
    maxHeight: 600,
    overflowY: "auto",
    marginTop: 20,
    border: "1px solid black",
    borderRadius: 3,
  },
  busContainer: {
    width: "80%",
  },
});

export type Reservation = {
  passenger_data: { first_name: string; last_name: string; email: string };
  seat_id: string;
  bus_id: string;
  status: string;
  id: string;
  created_at: string;
  number: string;
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
  const [busData, setBusData] = useState<Bus>({
    id: "",
    name: "",
    type: "",
    number: "",
  });
  const [selectedReservation, setSelectedReservation] = useState<Reservation>();

  useEffect(() => {
    (async () => {
      if (busData?.id) {
        const response = await Request.get(
          `/reservations?bus_id=${busData.id}`
        );
        setReservations(response.data);
      }
    })();
  }, [busData?.id]);

  const onBusSelect = (value: Bus) => {
    setBusData(value);
  };

  const onEdit = (value: Reservation) => {
    setSelectedReservation(value);
    setShowEditView(true);
  };

  const onSaveChanges = async (updatedUserData: UserData) => {
    const temp = [...reservations];
    const reqIndex = temp.findIndex(
      (resv) => resv.id === selectedReservation.id
    );
    const newPassengerData = {
      ...selectedReservation.passenger_data,
      ...updatedUserData,
    };
    temp[reqIndex]["passenger_data"] = newPassengerData;
    await Request.put(`/reservations/${selectedReservation.id}`, {
      passenger_data: newPassengerData,
    });
    setReservations(temp);
    setShowEditView(false);
  };

  const onCancel = () => {
    setShowEditView(false);
  };

  const deleteReservation = async (reservation_id: any) => {
    await Request.delete(`/reservations/${reservation_id}`);
  };

  const onDelete = (index: number, resv: Reservation) => {
    const temp = [...reservations];
    deleteReservation(resv.id);
    temp.splice(index, 1);
    setReservations(temp);
  };

  return (
    <div
      style={{
        padding: 10,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "ghostwhite",
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
            {reservations?.map((resv, i) => {
              let background = i % 2 == 0 ? "floralwhite" : "lavender";
              let userData = resv.passenger_data;
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
                    {userData.first_name || "John"}{" "}
                    {userData.last_name || "Doe"}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "30%", background: background }}
                  >
                    {userData.email}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "7%", background: background }}
                  >
                    {resv.number}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "10%", background: background }}
                  >
                    {resv.created_at}
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "5%", background: background }}
                  >
                    <button onClick={(e) => onEdit(resv)}>Edit</button>
                  </td>
                  <td
                    className={classes.tableCell}
                    style={{ width: "8%", background: background }}
                  >
                    <button onClick={(e) => onDelete(i, resv)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal open={showEditView}>
        <EditView
          onCancel={onCancel}
          onSaveChanges={onSaveChanges}
          reservation={selectedReservation}
        />
      </Modal>
    </div>
  );
};

export default ReservationDashboard;
