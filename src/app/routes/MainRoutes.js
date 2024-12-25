import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/header/Header.tsx';
import Footer from '../components/footer/Footer.tsx';
import PageNotFound from '../layouts/PageNotFound';
import AdminPage from '../pages/AdminPage/Admin/admin.tsx';
import Dashboard from '../pages/AdminPage/Dasboard/Dashboard.tsx';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
