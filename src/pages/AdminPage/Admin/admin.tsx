import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from 'react-router-dom';


const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminPage;
