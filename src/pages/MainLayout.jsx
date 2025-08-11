import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout=()=>{
    const location = useLocation();
    const showNav = location.pathname === "/movies";
    return (
        <div className="mainLayout">
            <Header showNav={showNav}/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default MainLayout;