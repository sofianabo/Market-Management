import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../../Context/UserContext";

export default function Users() {
  /******************Variables*************************/
  const [users, usersState] = useState([]);
  const [runeffect, runeffectSate] = useState(0);
  const ContextToken = useContext(User);
  const token = ContextToken.Auth.token;
  const cookie = new Cookies();
 const getToken= cookie.get('token');

  /******************API Function*********************/
  useEffect(() => {
    axios 
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: { 
          Accept: "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((data) => usersState(data.data));
  }, [runeffect]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        { headers: { Authorization: "Bearer " + getToken } }
      );
      if (res.status === 200) {
        runeffectSate((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*********************Data from API******************/
  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td style={{ justifyContent: "space-evenly" }}>
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen"
            style={{ color: "green", fontSize: "17px" ,marginRight:"40px",cursor: "pointer"}}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteUser(user.id)}
          style={{ color: "red", fontSize: "17px", cursor: "pointer",marginLeft:"40px" }}
        ></i>
      </td>
    </tr>
  ));

  /********************Elements************************/
  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Update / Delete</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
}
