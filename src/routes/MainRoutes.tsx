import { Route, Routes, useLocation } from "react-router-dom";
import "@/App.scss";
import Footer from "@/layouts/Footer/Footer";
import Header from "@/layouts/Header/Header";
import PageNotFound from "@/layouts/PageNotFound";
import About from "@/pages/About/About";
import Booking from "@/pages/Booking/Booking";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import RoomDetails from "@/pages/Rooms/RoomDetails";
import Login from "@/pages/Login/Login";
import PhotoGallery from "@/pages/PhotoGallery/PhotoGallery";
import Register from "@/pages/Register/Register";
import { useEffect } from "react";
import { useSystemContext } from "@/hooks/useSystemContext";
import AdminPage from "@/pages/AdminPage/Admin/admin";
import Dashboard from "@/pages/AdminPage/Dasboard/Dashboard";
import AdminBooking from "@/pages/AdminPage/AdminBooking/AdminBooking";

import Rooms from "@/pages/Rooms/Rooms";
import RoomTier from "@/pages/RoomTier/RoomTier";
import AdminService from "@/pages/AdminPage/Service/AdminService";
import Promote from "@/pages/AdminPage/Promote/Promote";
import AdminStaff from "@/pages/AdminPage/Staff/AdminStaff";

export default function MainRoutes() {
  const location = useLocation();
  const context = useSystemContext();

  // Check if current route is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const isAdminPage = location.pathname.includes('/admin')

  useEffect(() => {
    if (!context)
      return;
    console.log(context.token)
    if (!localStorage.getItem('token') && !isAuthPage) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      {/* Only render Header and Footer if not on login or register page */}
      {!isAuthPage && !isAdminPage && <Header />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="room-details" element={<RoomDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="roomtier" element={<RoomTier />} />
        <Route path="gallery" element={<PhotoGallery />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="booking" element={<AdminBooking />} />
          <Route path="service" element={<AdminService/>} />
          <Route path="promote" element={<Promote/>} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}
