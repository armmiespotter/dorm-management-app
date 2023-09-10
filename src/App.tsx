import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Rooms from "./views/Rooms";
import DateSections from "./views/DateSections";
import Invoices from "./views/Invoices";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="date-sections" element={<DateSections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
