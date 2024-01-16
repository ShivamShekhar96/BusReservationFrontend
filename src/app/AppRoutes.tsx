import React from "react";
import Loadable from "react-loadable";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./Layout";
import Loader from "../helpers/Loading";
// import ReservationDashboard from "../pages/ReservationDashboard";
// import SeatLayout from "../pages/SeatLayout";

const SeatLayout: any = Loadable({
  loading: Loader,
  loader: () => import("../pages/SeatLayout"),
});

const ReservationDashboard: any = Loadable({
  loading: Loader,
  loader: () => import("../pages/ReservationDashboard"),
});

const AppRoutes = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" Component={SeatLayout}></Route>
            <Route path="/seats" Component={SeatLayout}></Route>
            <Route path="/dashboard" Component={ReservationDashboard}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRoutes;
