import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RightBar from "./components/RightBar/RightBar";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Index from "./pages/Index";
import Laporan from "./pages/Laporan";
import Menu from "./pages/Manage/Menu";
import ManageMenu from "./pages/ManageMenu";
import 'react-toastify/dist/ReactToastify.css';
import Kategori from "./pages/Manage/Kategori";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App flex">
      <Sidebar />
      <div className="bg-gray-100 py-10 px-5 md:p-10 w-full max-h-screen overflow-auto">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='laporan' element={<Laporan />} />
          <Route path='about' element={<About />} />
          <Route path='manage' >
            <Route path='menu' element={<Menu />} />
            <Route path='kategori' element={<Kategori />} />
          </Route>
        </Routes>
      </div>
      {pathname === '/laporan' ? <></> : <RightBar />}
      <ToastContainer />
    </div >
  )
}

export default App
