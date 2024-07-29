import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  /**************** Variables ***************/
  const cookie = new Cookies();
  const token = cookie.get("token");

  /*******************Functions**************/
  async function logout() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("token");
    window.location.pathname = "/";
  }

  /******************Elements**************/
  return (
    <nav className="d-flex">
      <div className="d-flex nav-parts">
        <h2>Home</h2>
        <h2>About</h2>
      </div>
      <div className="d-flex">
        {!token ? (
          <div className="auth">
            <Link to="/register" className="register-nav butt">
              Register
            </Link>
            <Link to="/login" className="register-nav">
              Login
            </Link>
          </div>
        ) : (
          <div className="auth">
            <Link to="/dashboard" className="register-nav butt">
              Dashboard
            </Link>
            <Link to="/" className="register-nav butt" onClick={logout}>
              Log out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
