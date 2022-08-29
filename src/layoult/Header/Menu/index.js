import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "../Header.module.css";

const Menu = () => {
  const { roles } = useSelector((state) => state);

  return (
    <div className="mx-auto">
      <ul className={classes.menu + " navbar-nav"}>
        <li className="nav-item me-5">
          <Link to="/" className="nav-link">
            <i className="oi oi-home"></i> Home
          </Link>
        </li>
        <li className={classes.submenu + " nav-item me-5 dropdown"}>
          <a
            href="/#"
            className={"nav-link dropdown-toggle"}
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="oi oi-book"></i> Editorial
          </a>

          <ul
            className="dropdown-menu"
            style={{ margin: 0 }}
            aria-labelledby="navbarDropdown"
          >
            {roles.some((item) => item === "ROLE_ADMIN") && (
              <li>
                <Link to="/cadastro-livro" className="dropdown-item">
                  Cadastro de Livros
                </Link>
              </li>
            )}
            <li>
              <Link to="/livros-cadastrados" className="dropdown-item">
                Livros Cadastrados
              </Link>
            </li>
          </ul>
        </li>
        <li className={classes.submenu + " nav-item me-5 dropdown"}>
          <a
            href="/#"
            className={"nav-link dropdown-toggle"}
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="oi oi-box"></i> Comercial
          </a>

          <ul
            className="dropdown-menu"
            style={{ margin: 0 }}
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link to="/estoque" className="dropdown-item">
                Estoque
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
