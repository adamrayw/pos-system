import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import Index from './pages/Index'
import Sidebar from './components/Sidebar/Sidebar'
import About from './pages/About'
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './components/LandingPage/components/Auth/Login/Login'
import Daftar from './components/LandingPage/components/Auth/Daftar/Daftar'
import ModalPricing from './components/LandingPage/components/Modal/ModalPricing'
import ModalTransaksiHariIni from './components/Modal/ModalTransaksiHariIni';
import ModalTransaksiBulanIni from './components/Modal/ModalTransaksiBulanIni';
import ModalRincianPembayaran from './components/Modal/ModalRincianPembayaran';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App />
      </div>
      <Login />
      <Daftar />
      <ModalTransaksiHariIni />
      <ModalTransaksiBulanIni />
      <ModalRincianPembayaran />
      <ModalPricing />
    </BrowserRouter>
  </Provider>
)
