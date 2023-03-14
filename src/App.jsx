import { Routes, Route } from "react-router-dom";
import RightBar from "./components/RightBar/RightBar";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./pages/About";
import Index from "./pages/Index";
import Laporan from "./pages/Laporan";

function App() {
  return (
    <div className="App flex">
      <Sidebar />
      <div className="bg-gray-100 p-10 w-full">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/laporan' element={<Laporan />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <RightBar />
    </div>
  )
}

export default App
