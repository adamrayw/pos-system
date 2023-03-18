import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RightBar from "./components/RightBar/RightBar";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Index from "./pages/Index";
import Laporan from "./pages/Laporan";
import Menu from "./pages/Manage/Menu";
import ManageMenu from "./pages/ManageMenu";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <div className="bg-gray-100 p-10 w-full">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='laporan' element={<Laporan />} />
          <Route path='about' element={<About />} />
          <Route path='manage'>
            <Route path='menu' element={<Menu />} />
          </Route>
        </Routes>
      </div>
      <RightBar />
      <ToastContainer />
    </div>
  )
}

export default App
