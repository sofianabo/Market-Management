import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { User } from "../../Context/UserContext";

export default function RequiredAuth() {
  /*********************Variables*****************/
  const user = useContext(User);
  const location = useLocation();

  /*********************Elements**************/
  return user?.Auth?.token ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
