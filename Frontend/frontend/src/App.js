import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import SearchByEmpId from './Pages/SearchByEmpId';
import SearchByDate from './Pages/SearchByDate';
import LiveTracking from './Pages/LiveTracking';
import Intruders from './Pages/Intruders';
import Connectivity from './Pages/Connectivity';
import Database from './Pages/Database';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AddEmployee from './Pages/AddEmployee';
import UpdateEmployee from './Pages/UpdateEmployee';
import Personalinfo from './components/Personalinfo';
import { EmpIdProvider } from "./components/EmpIdContext";

function App() {
  function LayoutWithSidebar({ children }) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-4 ">{children}</main>
        </div>
      </div>
    );
  }

  function LayoutWithDatabase({ children }) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-4 ">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <EmpIdProvider> {/* Wrap your entire application with EmpIdProvider */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="liveTracking" element={<LayoutWithSidebar><LiveTracking /></LayoutWithSidebar>} />
        <Route path="searchByDate" element={<LayoutWithSidebar><SearchByDate /></LayoutWithSidebar>} />
        <Route path="searchByEmpId" element={<LayoutWithSidebar><SearchByEmpId /></LayoutWithSidebar>} />
        <Route path="intruders" element={<LayoutWithSidebar><Intruders /></LayoutWithSidebar>} />
        <Route path="connectivity" element={<LayoutWithSidebar><Connectivity /></LayoutWithSidebar>} />
        <Route path="database" element={<LayoutWithDatabase><Database /></LayoutWithDatabase>} />
        <Route path="Database/addEmployee" element={<LayoutWithDatabase><AddEmployee /></LayoutWithDatabase>} />
        <Route path="Database/updateemployee" element={<LayoutWithDatabase><UpdateEmployee /></LayoutWithDatabase>} />
      </Routes>
    </EmpIdProvider>
  );
}

export default App;