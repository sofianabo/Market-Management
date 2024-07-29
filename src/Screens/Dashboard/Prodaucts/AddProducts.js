import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../Context/UserContext";
import "../../Auth/Auth.css";

export default function AddProduct() {
  /**********************Variables****************************/
  const [title, titleState] = useState("");
  const [description, descriptionState] = useState("");
  const [image, imageState] = useState("");
  const [accept, acceptstate] = useState(false);
  const ContextToken = useContext(User);
  const token = ContextToken.Auth.token;
  const nav = useNavigate();

  /****************************Functions**************************/
  async function createProduct(e) {
    e.preventDefault();
    acceptstate(true);
    try {
      const formdate = new FormData();
      formdate.append("title", title);
      formdate.append("description", description);
      formdate.append("image", image);
      let res = await axios.post(
        "http://127.0.0.1:8000/api/product/create",
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

  /**********************Elements*****************/
  return (
    <div>
      <div className="parent_SignUp">
        <div className="register">
          <form onSubmit={createProduct}>
            <label htmlFor="title">Title:</label>
            <input
              id="tilte"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => titleState(e.target.value)}
            ></input>
            {title === "" && accept && (
              <p className="error">* Title is required</p>
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
              <button type="submit" className="butt">Add Prodauct</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
