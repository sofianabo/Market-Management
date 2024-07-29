import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../../Context/UserContext";
import Header from "../../../Components/Bars/Header";
import "../../WebSite/Home/Home.css";
import "../Auth.css";

export default function Login() {
  /**********************Variables****************************/
  const [email, emailstate] = useState("");
  const [password, passwordstate] = useState("");
  const [accept, acceptstate] = useState(false);
  const [emailError, emailErrorState] = useState(false);
  const [isclicked, isclickedState] = useState(false);
  const user = useContext(User);
  const cookie = new Cookies();
  const nav = useNavigate();

  /****************************Functions**************************/


  async function submitSignup(e) {
    e.preventDefault();
    acceptstate(true);
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("token", token, { path: "/" });
      const userDetails = res.data.data.user;
      user.setAuth({ token, userDetails });
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
  /*********************Elements*****************/
  return (
    <div>
      <div className="photo-slider">
        <Header />
        <div className="parent_SignUp">
          <div className="register">
            <form onSubmit={submitSignup}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => emailstate(e.target.value)}
              ></input>
              <label htmlFor="password">Password:</label>
              <input
                id="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => passwordstate(e.target.value)}
              ></input>
             
              <div style={{ textAlign: "center" }}>
                <button
                  className={isclicked ? "btn hover" : "btn"}
                  type="submit"
                >
                  <span>Login</span>
                </button>
              </div>
              {accept && emailError && (
                <p className="error">* Your Email or Password is Wrong</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
