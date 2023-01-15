import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ForgotPassword from "./LoginSignup/ForgotPassword";
import { Navigate } from "react-router-dom";
import { Context } from "./Context.js";
import { useState } from "react";
import DemoUser from "./UserPage/DemoUser";
import ShopPage from "./UserPage/ShopPage";
import AdminLoginPage from "./ShopSidePage/AdminLoginPage";
import AdminDashboard from "./ShopSidePage/AdminDashboard";
import CartPage from "./UserPage/CartPage";
import ParticularOrder from "./ShopSidePage/ParticularOrder";
import AddProduct from "./ShopSidePage/AddProduct";
import WelcomePage from "./WelcomePage";
function App() {
  const [a, setA] = useState("");
  return (
    <div className="App">
      <Context.Provider value={[a, setA]}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/users/forgotpassword/:id/:token"
            element={<ForgotPassword />}
          />
          {/* <Route path="/demo-user" element={<DemoUser />} /> */}
          <Route path="/shoppage" element={<ShopPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/orders" element={<ParticularOrder />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
