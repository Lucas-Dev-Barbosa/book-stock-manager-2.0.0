import { useState } from "react";

const Registro = ({ dadosRegistro, onEdit, onDelete, selectPerfis }) => {
  const [habilitarInput, sethabilitarInput] = useState(false);
  const [edited, setEdited] = useState(false);

  const [perfil, setPerfil] = useState(dadosRegistro.perfil);
  const [nome, setNome] = useState(dadosRegistro.nome);
  const [sobrenome, setSobrenome] = useState(dadosRegistro.sobrenome);
  const [status, setStatus] = useState(dadosRegistro.ativo);

  const [perfis] = useState(selectPerfis);

  function clickEditHandler() {
    if (!habilitarInput) {
      setEdited(false);
      sethabilitarInput(true);
    } else {
      sethabilitarInput(false);
      if (edited) {
        dadosRegistro.nome = nome;
        dadosRegistro.sobrenome = sobrenome;
        dadosRegistro.ativo = status;
        dadosRegistro.perfil = perfil;

        onEdit(dadosRegistro);
        setEdited(false);
      }
    }
  }

  function clickDeleteHandler() {
    onDelete(dadosRegistro.id);
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
      <td>
        {!habilitarInput ? (
          status ? (
            "ATIVO"
          ) : (
            "INATIVO"
          )
        ) : (
          <input
            defaultChecked={status}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={(e) => {
              changeValueHandler();
              setStatus(e.target.checked);
            }}
          />
        )}
      </td>
      <td>
        {!habilitarInput ? (
          perfil.nome
        ) : (
          <select
            defaultValue={perfil && perfil.id}
            className="form-select"
            onChange={(e) => {
              setPerfil(
                perfis.find((item) => {
                  return (Number(item.id) === Number(e.target.value));
                })
              );
              changeValueHandler();
            }}
          >
            {perfis.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.nome}
                </option>
              );
            })}
          </select>
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
      <td>
        <button
          onClick={clickDeleteHandler}
          className="btn btn-link"
          data-bs-toggle={"modal"}
          data-bs-target="#modalDelete"
        >
          <i
            style={{ color: "black" }}
            title="Excluir"
            className="oi oi-delete"
          ></i>
        </button>
      </td>
    </tr>
  );
};

export default Registro;
