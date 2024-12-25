import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../../../components/navbar/Navbar.tsx";

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminPage;
