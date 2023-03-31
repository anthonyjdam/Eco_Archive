import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/Login";
import AdminDashboard from "./component/AdminPages/AdminDashboard";
import AdminSidebar from "./component/AdminPages/AdminSidebar";

function App() {

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/signup" element={<SignUpCustomer />}></Route>
          <Route path="/admin" element={<AdminSidebar />}></Route>
        </Routes>
      </BrowserRouter> */}

      <AdminDashboard/>
    </>
  );
}

export default App;
