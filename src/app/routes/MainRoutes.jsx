import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Tours from "../pages/Home/Tours/Tours";
import TourDetails from "../pages/Home/Tours/TourDetails";
import Booking from "../pages/Booking/Booking";
import Destinations from "../pages/Destinations/Destinations";
import PhotoGallery from "../pages/PhotoGallery/PhotoGallery";
import "../../App.scss";
export default function MainRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about-us" element={<About />} />
        <Route path="contact-us" element={<Contact />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tour-details" element={<TourDetails />} />
        <Route path="booking" element={<Booking />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="gallery" element={<PhotoGallery />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer  />
    </>
  );
}
