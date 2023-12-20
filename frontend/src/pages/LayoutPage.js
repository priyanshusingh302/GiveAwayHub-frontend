import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
    return (
        <>
            <Outlet />
        </>
    )
};

export default Layout;
