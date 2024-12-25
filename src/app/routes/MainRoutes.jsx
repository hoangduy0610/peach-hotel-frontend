import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "../layouts/PageNotFound";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Home from "../pages/Home/Home";

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer  />
    </BrowserRouter>
  );
}
