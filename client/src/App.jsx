import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/Login/Login";
import SignUpCustomer from "./component/SignUpCustomer";
import CustomerDashboard from "./component/CustomerPages/CustomerDashboard";
import PickUp from "./component/CustomerPages/PickUp";
import DropOff from "./component/CustomerPages/DropOff";
import CustomerSettings from "./component/CustomerPages/CustomerSettings";
import AdminDashboard from "./component/AdminPages/AdminDashboard";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUpCustomer />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/customerDashboard" element={<CustomerDashboard />}></Route>
          <Route path="/pickUp" element={<PickUp />}></Route>
          <Route path="/dropOff" element={<DropOff />}></Route>
          <Route path="/customerSettings" element={<CustomerSettings />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
