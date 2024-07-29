import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../../../Context/UserContext";
import Loading from "../../../Components/Loading/Loading";

export default function PersistLogin() {
  /********************** Variable************************ */
  /****************get current user********************/
  const ContextToken = useContext(User);
  const [loadin, setLoading] = useState(true);
  const token = ContextToken.Auth.token;
  const cookie = new Cookies();
  const getToken = cookie.get("token");

  /*******************API Function***************/
  /****************send refresh token************/
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          })
          .then((data) => {
            cookie.set("token", data.data.token, { path: "/" });
            ContextToken.setAuth((prev) => {
              return { userDetails: data.data.user, token: data.data.token };
            });
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  /*********************Elements**************/
  return loadin ? <Loading /> : <Outlet />;
}
