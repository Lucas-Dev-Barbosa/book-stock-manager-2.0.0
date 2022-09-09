import { useState } from "react";

const Registro = ({ dadosRegistro, onEdit }) => {
  const [habilitarInput, sethabilitarInput] = useState(false);
  const [edited, setEdited] = useState(false);

  const [nome, setNome] = useState(dadosRegistro.nome);
  const [sobrenome, setSobrenome] = useState(dadosRegistro.sobrenome);

  function clickEditHandler() {
    if (!habilitarInput) {
      setEdited(false);
      sethabilitarInput(true);
    } else {
      sethabilitarInput(false);
      if (edited) {
        dadosRegistro.nome = nome;
        dadosRegistro.sobrenome = sobrenome;

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
      <td>{dadosRegistro.email}</td>
      <td>
        {!habilitarInput ? (
          nome
        ) : (
          <input
            defaultValue={nome}
            type="text"
            className="form-control"
            onChange={(e) => {
              changeValueHandler();
              setNome(e.target.value);
            }}
          />
        )}
      </td>
      <td>
        {!habilitarInput ? (
          sobrenome
        ) : (
          <input
            defaultValue={sobrenome}
            type="text"
            className="form-control"
            onChange={(e) => {
              changeValueHandler();
              setSobrenome(e.target.value);
            }}
          />
        )}
      </td>
      <td>{dadosRegistro.username}</td>
      <td>
        {dadosRegistro.enabled ? (
          <i
            className="oi oi-circle-check"
            style={{ color: "green", fontSize: "25px" }}
          ></i>
        ) : (
          <i className="oi oi-circle-x" style={{ color: "red", fontSize: "25px" }}></i>
        )}
      </td>
      <td>
        <button
          onClick={clickEditHandler}
          className="btn btn-link"
          data-bs-toggle={edited && "modal"}
          data-bs-target="#modalEdit"
        >
          <i
            style={{ color: "black" }}
            title="Editar"
            className="oi oi-pencil"
          ></i>
        </button>
      </td>
    </tr>
  );
};

export default Registro;
