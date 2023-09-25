import { Outlet } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";
import TopBar from "./TopBar/topBar";
import "./Layout.scss";
export default function Layout() {
  return (
    <div className="Layout_Admin-container">
      <div className="Admin-container">
        <div className="Header_Admin">
          <Header></Header>
        </div>
        <div className="Site_Admin_Right">
          <div className="TopBar_Admin">
            <TopBar></TopBar>
          </div>
          <div className="Noidungchinh_Admin">
            <Outlet></Outlet>
          </div>
          {/* <div className="Footer_Admin">
                <Footer></Footer>
                </div> */}
        </div>
      </div>
    </div>
  );
}
