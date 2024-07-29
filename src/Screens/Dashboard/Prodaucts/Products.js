import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../../Context/UserContext";

export default function Products() {
  /******************Variables*************************/
  const [products, productsState] = useState([]);
  const [runeffect, runeffectSate] = useState(0);
  const ContextToken = useContext(User);
  const token = ContextToken.Auth.token;
  const cookie = new Cookies();
  const getToken = cookie.get("token");

  /******************Functions*********************/
  useEffect(() => {
    const ress = axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + getToken,
        },
      })
      .then((data) => {
        productsState(data.data);
        console.log(data.data.Products);
      });
  }, [runeffect]);

  async function deleteproduct(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
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
  const showProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td style={{ justifyContent: "space-evenly", display: "flex" }}>
        <Link to={`${product.id}`}>
          <i
            className="fa-solid fa-pen"
            style={{
              color: "green",
              fontSize: "17px",
              marginRight: "40px",
              cursor: "pointer",
            }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          onClick={() => deleteproduct(product.id)}
          style={{
            color: "red",
            fontSize: "17px",
            cursor: "pointer",
            marginLeft: "40px",
          }}
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
            <th>Tilte</th>
            <th>Description</th>
            <th>Update / Delete</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
}
