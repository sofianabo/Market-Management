import { Link } from "react-router-dom";

export default function TopBar() {
  /*******************Elements**************/
  return (
    <div className="d-flex container shaddow top-bar">
      <h1>Marketing Management</h1>
      <Link to="/" className="register-nav butt">
        Go to Website
      </Link>
    </div>
  );
}
