import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/Header";

export default function AuthRouter() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}
