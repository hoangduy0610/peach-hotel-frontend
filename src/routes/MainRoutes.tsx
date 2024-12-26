import { Route, Routes, useLocation } from "react-router-dom";
import "@/App.scss";
import Footer from "@/layouts/Footer/Footer";
import Header from "@/layouts/Header/Header";
import PageNotFound from "@/layouts/PageNotFound";
import About from "@/pages/About/About";
import Booking from "@/pages/Booking/Booking";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import RoomDetails from "@/pages/Home/Rooms/RoomDetails";
import Login from "@/pages/Login/Login";
import PhotoGallery from "@/pages/PhotoGallery/PhotoGallery";
import Register from "@/pages/Register/Register";
import { useEffect } from "react";
import { useSystemContext } from "@/hooks/useSystemContext";
import Rooms from "@/pages/Home/Rooms/Rooms";
import RoomTier from "@/pages/RoomTier/RoomTier";

export default function MainRoutes() {
  const location = useLocation();
  const context = useSystemContext();

  // Check if current route is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (!context.token && !isAuthPage) {
      window.location.href = "/login";
    }
  }, [context]);

  return (
    <>
      {/* Only render Header and Footer if not on login or register page */}
      {!isAuthPage && <Header />}
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

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}
