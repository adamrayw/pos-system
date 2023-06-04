import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import RightBar from "./components/RightBar/RightBar";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Index from "./pages/Index";
import Home from "./pages/LandingPage/Home/Home.jsx";
import Dashboard from "./pages/LandingPage/Dashboard/Dashboard.jsx";
import SuccessCheckout from "./pages/LandingPage/SuccessCheckout/SuccessCheckout.jsx";
import Laporan from "./pages/Laporan";
import Menu from "./pages/Manage/Menu";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import 'react-toastify/dist/ReactToastify.css';
import Kategori from "./pages/Manage/Kategori";
import Login from "./pages/Auth/Login/Login";
import { useState } from "react";
import Protected from "./components/Protected/Protected";
import jwtDecode from "jwt-decode";
import NotFound from "./pages/NotFound/NotFound";
import MissingRoute from "./components/MissingRoute/MissingRoute";

function App() {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
    toast.warn("Sesi anda telah berakhir, silahkan login kembali");
  }


  return (
    <div className="App flex relative">
      <div className="bg-gray-50">
        {pathname === '/auth/login' || pathname === '/payment-success' || pathname === '/' || pathname === '/dashboard' | pathname === '/success-checkout' || pathname === "/404" ? <></> : <Sidebar />}
      </div>
      <div className={` ${pathname === '/auth/login' || pathname === "/" || pathname === '/dashboard' ? 'bg-white w-full h-screen overflow-auto' : 'bg-gray-100 py-10 md:p-10 w-full h-screen overflow-auto'}  `}>
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success-checkout" element={<SuccessCheckout />} />
          {/* App Routes */}
          <Route path="app">
            <Route index element={
              <Protected>
                <Index />
              </Protected>
            } />
            <Route path='laporan' element={
              <Protected>
                <Laporan />
              </Protected>
            } />
            <Route path='about' element={
              <Protected>
                <About />
              </Protected>
            } />
            <Route path='manage' >
              <Route path='menu' element={
                <Protected>
                  <Menu />
                </Protected>
              } />
              <Route path='kategori' element={
                <Protected>
                  <Kategori />
                </Protected>
              } />
            </Route>
          </Route>
          <Route path='auth'>
            <Route path='login' element={<Login />} />
          </Route>
          <Route path='payment-success' element={
            <PaymentSuccess />
          } />
          <Route path="*" element={
            <MissingRoute>
              <NotFound />
            </MissingRoute>
          } />
          <Route path="404" element={<NotFound />} />
        </Routes>
      </div>
      {pathname === '/auth/login' || pathname === '/payment-success' || pathname === '/' || pathname === '/dashboard' || pathname === '/success-checkout' || pathname === "/404" ? <></> : <RightBar />}
      <ToastContainer />
    </div >
  )
}

export default App
