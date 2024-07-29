import { Route, Routes } from "react-router-dom";
import Home from "./Screens/WebSite/Home/Home";
import SignUp from "./Screens/Auth/SignUp/SignUp";
import Login from "./Screens/Auth/Login/login";
import PersistLogin from "./Screens/Auth/Login/persistLogin";
import RequiredAuth from "./Screens/Auth/RequiredAuth";
import Dashboard from "./Screens/Dashboard/Dashboard";
import Users from "./Screens/Dashboard/Users/Users";
import UpdateUser from "./Screens/Dashboard/Users/UpdateUser";
import CreateUser from "./Screens/Dashboard/Users/CreateUser";
import Products from "./Screens/Dashboard/Prodaucts/Products";
import AddProduct from "./Screens/Dashboard/Prodaucts/AddProducts";
import UpdateProduct from "./Screens/Dashboard/Prodaucts/UpdateProduct";

export default function App() {
  /*********************Routes**********************/
  return (
    <div>
      <Routes>
        /*****************Public Routes**************/
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        /*************protected Routes**************/
        <Route element={<PersistLogin />}>
          <Route element={<RequiredAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="product/create" element={<AddProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
