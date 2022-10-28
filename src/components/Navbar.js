import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return(
        <div>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            {/* <NavLink to="/">Account</NavLink> */}
            <NavLink></NavLink>
        </div>
        
        
    )
}


export default Navbar;