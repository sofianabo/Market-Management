import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../../Context/UserContext";
import Header from "../../../Components/Bars/Header";

export default function SignUp() {
  /**********************Variables****************************/
  const [name, namestate] = useState("");
  const [email, emailstate] = useState("");
  const [password, passwordstate] = useState("");
  const [Rpassword, Rpasswordstate] = useState("");
  const [accept, acceptstate] = useState(false);
  const [emailError, emailErrorState] = useState(false);
  const [isclicked, isclickedState] = useState(false);
  const usernow = useContext(User);
  const cookie = new Cookies();
  const nav = useNavigate();

  /****************************Functions**************************/


  async function submitSignup(e) {
    e.preventDefault();
    acceptstate(true);
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: Rpassword,
      });
      const token = res.data.data.token;
      cookie.set("token", token, { path: "/" });
      const userDetails = res.data.data.user;
      usernow.setAuth({ token, userDetails });
      isclickedState(true);
      setTimeout(() => {
        nav("/dashboard/users");
      }, 3000);

    } catch (error) {
      if (error.response.status !== 200) {
        isclickedState(false);
        emailErrorState(true);
      }
      acceptstate(true);
    }
  }
  /***********************Elements****************/

  return (
    <div>
      <div className="photo-slider">
        <Header />
        <div className="parent_SignUp">
          <div className="register">
            <form onSubmit={submitSignup}>
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
                <p className="error">
                  * password must be more than 8 characters
                </p>
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
                <button
                  type="submit"
                  className={isclicked ? "btn hover" : "btn"}
                >
                  <span>Register</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
