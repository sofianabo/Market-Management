import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Bars/SideBar";
import TopBar from "../../Components/Bars/TopBar";
import "./Dashboard.css";

export default function Dashboard() {
  /********************Elements*****************/
  return (
    <div>
      <TopBar />
      <div className="content-flex">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
