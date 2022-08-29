const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg bg-light shadow-sm p-3">
            {props.children}
        </nav>
     );
}
 
export default Navbar;