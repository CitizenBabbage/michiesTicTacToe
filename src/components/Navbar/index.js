import React from "react";
import './navbar.css';
import { Link } from "react-router-dom"; // Assuming you're using React Router.

// import { Nav, NavLink, NavMenu }
//     from "./NavbarElements";
 
const Navbar = ( props ) => {
    return (
        <div>
            <div className = "Nav">
                <div className = "NavMenu">
                    <Link className = "NavLink" to="/about" >
                        Main
                    </Link>
                    <Link className = 'NavLink' to="/menace" >
                        Menace
                    </Link>
                    <Link className = 'NavLink' to="/minimax" >
                        Minimax
                    </Link>
                    <Link className = 'NavLink' to="/huris" >
                        Huris
                    </Link>
                    <Link className = 'NavLink' to="/evolvo" >
                        Evolvo
                    </Link>
                    {props.devMode && (<Link className = 'NavLink' to="/test" >
                        Test
                    </Link>)}
                </div>
            </div>
        </div>
    );
};
 
export default Navbar;