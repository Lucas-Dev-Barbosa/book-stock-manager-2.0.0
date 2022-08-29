import { Link } from "react-router-dom";
import slice from "../../../store/modules/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useJwt } from "react-jwt";

const MenuUsuario = () => {
  const dispath = useDispatch();

  const { token } = useSelector((state) => state);
  const {decodedToken} = useJwt(token);

  function logOutHandler() {
    dispath(slice.actions.signInOut());
  }

  return (
    <div>
      <div className="dropstart">
        <button
          className="btn btn-secondary dropdown-toggle"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="oi oi-person"></i>
        </button>
        <ul
          className="dropdown-menu"
          style={{ margin: 0 }}
          aria-labelledby="dropdownMenuLink"
        >
          <li>
            <p className="dropdown-header">{decodedToken && decodedToken.name}</p>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/perfil-usuario" className="dropdown-item">Perfil</Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={logOutHandler}>
              Sign out
            </button>
          </li>

          {false && <li>
            <hr className="dropdown-divider" />
          </li>}
          {false && <li>
            <Link to="/cadastro-usuario" className="dropdown-item">
              Cadastrar Usuário
            </Link>
          </li>}
          {false && <li>
            <Link to="/lista-usuario" className="dropdown-item">
              Gerenciar Usuários
            </Link>
          </li>}
        </ul>
      </div>
    </div>
  );
};

export default MenuUsuario;
