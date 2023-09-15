import {Outlet} from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import TopBar from "./TopBar/topBar";
import "./Layout.css";
export default function Layout () {
    return (
        <div className="wwwbinancecom-by-htmltodes1">
            <div className="divcss-tq0shg1">
                <div className="Header_Admin">
                <Header></Header>
                </div>
                <div className="trang_Admin">
                <div className="TopBar_Admin">
                <TopBar></TopBar>
                </div>
<<<<<<< HEAD

=======
                
>>>>>>> origin/develop
                <div className="Noidungchinh_Admin">
                <Outlet></Outlet>
                </div>
                <div className="Footer_Admin">
                <Footer></Footer>
                </div>
                </div>
            </div>

        </div>


    );
}