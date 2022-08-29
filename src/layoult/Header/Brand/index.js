import { Link } from "react-router-dom";

const Brand = () => {
    return ( 
        <div>
            <Link to="/" className="navbar-brand">
                <span className="oi oi-book"></span> {process.env.REACT_APP_NAME}
            </Link>
        </div>
     );
}
 
export default Brand;