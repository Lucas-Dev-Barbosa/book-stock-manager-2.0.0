import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const Registro = ({ dadosRegistro, onEdit }) => {
  const [habilitarInput, sethabilitarInput] = useState(false);
  const [edited, setEdited] = useState(false);

  const [emEstoque, setEmEstoque] = useState(dadosRegistro.emEstoque);
  const [vendidos, setVendidos] = useState(dadosRegistro.vendidos);

  const { roles } = useSelector((state) => state);

  function clickEditHandler() {
    if (!habilitarInput) {
      setEdited(false);
      sethabilitarInput(true);
    } else {
      sethabilitarInput(false);
      if (edited) {
        dadosRegistro.emEstoque = emEstoque;
        dadosRegistro.vendidos = vendidos;

        onEdit(dadosRegistro);
        setEdited(false);
      }
    }
  }

  function changeValueHandler() {
    setEdited(true);
  }

  return (
    <tr>
      <th scope="row">{dadosRegistro.id}</th>
      <td>{dadosRegistro.livro.titulo}</td>
      <td>
        {!habilitarInput ? (
          emEstoque
        ) : (
          <NumberFormat
            autoFocus
            type="text"
            className="form-control"
            allowNegative={false}
            placeholder="0"
            defaultValue={emEstoque}
            onChange={(e) => {
              changeValueHandler();
              setEmEstoque(e.target.value);
            }}
          />
        )}
      </td>
      <td>
        {!habilitarInput ? (
          vendidos
        ) : (
          <NumberFormat
            type="text"
            className="form-control"
            allowNegative={false}
            placeholder="0"
            defaultValue={vendidos}
            onChange={(e) => {
              changeValueHandler();
              setVendidos(e.target.value);
            }}
          />
        )}
      </td>
      <td>{emEstoque > 0 ? "DISPONIVEL" : "INDISPONIVEL"}</td>
      {roles.some((item) => item === "ROLE_ADMIN") && (
        <td>
          <button
            onClick={clickEditHandler}
            className="btn btn-link"
            data-bs-toggle={edited && "modal"}
            data-bs-target="#alertModal"
          >
            <i
              style={{ color: "black" }}
              title="Editar"
              className="oi oi-pencil"
            ></i>
          </button>
        </td>
      )}
      <td>
        <Link
          to={`/detalhamento-livro/${dadosRegistro.livro.id}`}
          className="btn btn-link"
        >
          <i
            className="oi oi-folder"
            style={{ color: "black" }}
            title="Detalhar"
          ></i>
        </Link>
      </td>
    </tr>
  );
};

export default Registro;
