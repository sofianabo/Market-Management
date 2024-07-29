import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../Context/UserContext";
import "../../Auth/Auth.css";

export default function UpdateProduct() {
  /**********************Variables****************************/
  const [title, titleState] = useState("");
  const [description, descriptionState] = useState("");
  const [image, imageState] = useState("");
  const [accept, acceptstate] = useState(false);
  const ContextToken = useContext(User);
  const token = ContextToken.Auth.token;
  const nav = useNavigate();
  const id = window.location.pathname.split("/").slice(-1)[0];

  /****************************Functions**************************/
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        titleState(data.data[0].title);
        descriptionState(data.data[0].description);
      });
  }, []);

  async function updateProduct(e) {
    e.preventDefault();
    acceptstate(true);
    try {
      const formdate = new FormData();
      formdate.append("title", title);
      formdate.append("description", description);
      formdate.append("image", image);
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        formdate,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/products");
    } catch (error) {
      acceptstate(true);
    }
  }

  /**********************Elements**************/
  return (
    <div>
      <div className="parent_SignUp">
        <div className="register">
          <form onSubmit={updateProduct}>
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => titleState(e.target.value)}
            ></input>
            {title === "" && accept && (
              <p className="error">* Name is required</p>
            )}
            <label htmlFor="description">Desciption:</label>
            <input
              id="description"
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => descriptionState(e.target.value)}
            ></input>
            <label htmlFor="image">Image:</label>
            <input
              id="image"
              type="file"
              placeholder="Image"
              onChange={(e) => imageState(e.target.files.item(0))}
            ></input>
            <div style={{ textAlign: "center" }}>
              <button type="submit" className="butt" >AddProduct</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
