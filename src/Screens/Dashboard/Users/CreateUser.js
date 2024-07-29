import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../Context/UserContext";
import "../../Auth/Auth.css";

export default function CreateUser() {
  /**********************Variables****************************/
  const [name, namestate] = useState("");
  const [email, emailstate] = useState("");
  const [password, passwordstate] = useState("");
  const [Rpassword, Rpasswordstate] = useState("");
  const [accept, acceptstate] = useState(false);
  const [emailError, emailErrorState] = useState(false);
  const ContextToken = useContext(User);
  const token = ContextToken.Auth.token;
  const nav = useNavigate();

  /****************************Functions**************************/
  async function createUser(e) {
    e.preventDefault();
    acceptstate(true);
    try {
      let res = await axios.post(
        "http://127.0.0.1:8000/api/user/create",
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: Rpassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/users");
    } catch (error) {
      if (error.response.status === 422) {
        emailErrorState(true);
      }
      acceptstate(true);
    }
  }

  /*************************Elements***************************/
  return (
    <div>
      <div className="parent_SignUp">
        <div className="register">
          <form onSubmit={createUser}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => namestate(e.target.value)}
            ></input>
            {name === "" && accept && (
              <p className="error">* Name is required</p>
            )}
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => emailstate(e.target.value)}
            ></input>
            {accept && emailError && (
              <p className="error">* Email is already been taken</p>
            )}
            <label htmlFor="password">Password:</label>
            <input
              id="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => passwordstate(e.target.value)}
            ></input>
            {password.length < 8 && accept && (
              <p className="error">* password must be more than 8 characters</p>
            )}
            <label htmlFor="Cpassword">Confirm Password:</label>
            <input
              id="CPassword"
              type="password"
              placeholder="Confirm Password"
              value={Rpassword}
              onChange={(e) => Rpasswordstate(e.target.value)}
            ></input>
            {Rpassword !== password && accept && (
              <p className="error">* password does not match</p>
            )}
            <div style={{ textAlign: "center" }}>
              <button type="submit" className="butt">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
