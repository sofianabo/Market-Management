import { NavLink } from "react-router-dom";

export default function SideBar() {
  /*******************Elements**************/
  return (
    <div className="side-bar">
      <NavLink to="/dashboard/users" className="item-sidebar">
        <i className="fa-solid fa-users"></i> Users
      </NavLink>
      <NavLink to="/dashboard/user/create" className="item-sidebar">
        <i className="fa-solid fa-user-plus"></i>
        New User
      </NavLink>
      <NavLink to="/dashboard/products" className="item-sidebar">
        <i class="fa-solid fa-cart-shopping"></i>Products
      </NavLink>
      <NavLink to="/dashboard/product/create" className="item-sidebar">
        <i class="fa-solid fa-cart-plus"></i>Add Product
      </NavLink>
    </div>
  );
}
