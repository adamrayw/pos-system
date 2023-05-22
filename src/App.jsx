import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RightBar from "./components/RightBar/RightBar";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Index from "./pages/Index";
import Laporan from "./pages/Laporan";
import Menu from "./pages/Manage/Menu";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import 'react-toastify/dist/ReactToastify.css';
import Kategori from "./pages/Manage/Kategori";
import Login from "./pages/Auth/Login/Login";
import { useState } from "react";
import Protected from "./components/Protected/Protected";
import jwtDecode from "jwt-decode";

function App() {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    alert("Sesi anda telah berakhir, silahkan login kembali");
  }


  return (
    <div className="App flex">
      <div className="bg-gray-50">
        {pathname === '/auth/login' || pathname === '/payment-success' ? <></> : <Sidebar />}
      </div>
      <div className={` ${pathname === '/auth/login' ? 'bg-gray-50' : 'bg-gray-100'}  py-10 md:p-10 w-full h-screen overflow-auto`}>
        <Routes>
          <Route path='/' element={
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
          <Route path='auth'>
            <Route path='login' element={<Login />} />
          </Route>
          <Route path='payment-success' element={
            <PaymentSuccess />
          } />
        </Routes>
      </div>
      {pathname === '/auth/login' || pathname === '/payment-success' ? <></> : <RightBar />}
      <ToastContainer />
    </div >
  )
}

export default App
