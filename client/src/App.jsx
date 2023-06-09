import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./component/LoginPages/Login";
import SignUpCustomer from "./component/SignInPages/SignUpCustomer";
import CustomerDashboard from "./component/CustomerPages/CustomerDashboard";
import PickUp from "./component/CustomerPages/PickUp";
import DropOff from "./component/CustomerPages/DropOff";
import CustomerSettings from "./component/CustomerPages/CustomerSettings";
import AdminDashboard from "./component/AdminPages/AdminDashboard";
import EmployeeDashboard from "./component/EmployeePages/EmployeeDashboard";
import AdminEditCustomer from "./component/AdminPages/AdminEditCustomer";
import AdminEditMaterial from "./component/AdminPages/AdminEditMaterial";
import AdminEditEmployee from "./component/AdminPages/AdminEditEmployee";
import AdminEditCharities from "./component/AdminPages/AdminEditCharities";
import userContext from "./component/userContext";
import { useState } from "react";
import DropOffService from "./component/EmployeePages/DropOffService";
import PickUpService from "./component/EmployeePages/PickUpService";
import AdminShipments from "./component/AdminPages/AdminShipments";


function App() {

  const [currentUser, setCurrentUser] = useState("");

  return (
    <>
      <BrowserRouter>

        <userContext.Provider value={{ currentUser, setCurrentUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUpCustomer />}></Route>
            <Route path="/admin" element={<AdminDashboard />}></Route>
            <Route path="/customerDashboard" element={<CustomerDashboard />}></Route>
            <Route path="/pickUp" element={<PickUp />}></Route>
            <Route path="/dropOff" element={<DropOff />}></Route>
            <Route path="/customerSettings" element={<CustomerSettings />}></Route>
            <Route path="/employeeDashboard" element={<EmployeeDashboard />}></Route>
            <Route path="/editmaterial" element={<AdminEditMaterial />}></Route>
            {/* <Route path="/editemployee" element={<AdminEditEmployee/>}></Route> */}
            {/* <Route path="/editcustomer" element={<AdminEditCustomer/>}></Route> */}
            <Route path="/editemployee" element={<AdminEditEmployee />}></Route>
            <Route path="/editcustomer" element={<AdminEditCustomer />}></Route>
            <Route path="/editcharity" element={<AdminEditCharities />}></Route>
            <Route path="/shipments" element={<AdminShipments />}></Route>
            <Route path="/dropoffService" element={<DropOffService />}></Route>
            <Route path="/pickupService" element={<PickUpService />}></Route>
          </Routes>
        </userContext.Provider>
      </BrowserRouter>

    </>
  );
}

export default App;
