import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Elements/Sidebar";
import TopBar from "./Elements/TopBar";

import EditEmployee from "./Pages/EditEmployee";
import CreateEmployee from "./Pages/CreateEmployee";
import ManageEmployee from "./Pages/ManageEmployee";

const Main = () => {
  return (
    <>
      <div className="container-scroller">
        <TopBar />

        <div className="container-fluid page-body-wrapper">
          <Sidebar />

          <Routes>
            <Route path="/" element={<ManageEmployee />} />
            <Route path="/create" element={<CreateEmployee />} />
            <Route path="/all" element={<ManageEmployee />} />
            <Route path="/edit" element={<EditEmployee />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Main;
