import { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../asset/logo.png"
import { Outlet } from "react-router-dom";


const Navbar = () => {
    return (
        <Fragment>

            <div className="navbar-container">

                <span className="logo">
                    <Link to="/">
                        <img src={logo} alt="" style={{ height: "100px" }} />
                    </Link>
                </span>
                <div className="nav-links">
                    <Link to="/userdropdown" className="link">Acount</Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navbar; 