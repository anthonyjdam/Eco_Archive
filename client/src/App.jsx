import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/Login";
import AdminSidebar from "./component/AdminSidebar";
import SignUpCustomer from "./component/SignUpCustomer";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpCustomer />}></Route>
          <Route path="/admin" element={<AdminSidebar />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
