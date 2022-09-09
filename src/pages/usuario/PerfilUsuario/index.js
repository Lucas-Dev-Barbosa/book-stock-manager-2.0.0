import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiUsers from "../../../services/apiUsers";
import { useSelector } from "react-redux";

const PerfilUsuario = () => {
  const [perfilUsuario, setPerfilUsuario] = useState({});

  const { roles } = useSelector((state) => state);

  const getPerfilUsuario = useCallback(async () => {
    await apiUsers
      .get("user")
      .then((response) => {
        if (response.status === 200) {
          setPerfilUsuario(response.data);
        }
      })
      .catch((err) => {
        toast.error("Erro ao buscar os dados do servidor", {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Erro na requisição: " + err);
      });
  }, []);

  useEffect(() => {
    getPerfilUsuario();
  }, [getPerfilUsuario]);

  return (
    <div className="row g-3 mx-auto" style={{ width: "40rem" }}>
      <h2>Perfil do Usuário</h2>

      <p>
        Para alterar alguma informação do seu perfil, entre em contato com o
        administrador do sistema!
      </p>

      <br />

      <div className="col-md-6">
        <span>Nome</span>
        <div className="col-sm-10">
          <span className="fs-3">{perfilUsuario.nome}</span>
        </div>
      </div>

      <div className="col-md-6">
        <span>Sobre Nome</span>
        <div className="col-sm-10">
          <span className="fs-3">{perfilUsuario.sobrenome}</span>
        </div>
      </div>

      <div className="col-md-12">
        <span>Login</span>
        <div className="col-sm-10">
          <span className="fs-3">{perfilUsuario.username}</span>
        </div>
      </div>

      <div className="col-md-12">
        <span>E-mail</span>
        <div className="col-sm-10">
          <span className="fs-3">{perfilUsuario.email}</span>
        </div>
      </div>

      <div className="col-md-6">
        <span>Perfil</span>
        <div className="col-sm-10">
          <span className="fs-3">{roles}</span>
        </div>
      </div>

      <div className="col-md-6">
        <span>Status</span>
        <div className="col-sm-10">
          <span className="fs-3">
            {perfilUsuario.enabled ? (
              <i
                className="oi oi-circle-check"
                style={{ color: "green", fontSize: "40px" }}
              ></i>
            ) : (
              <i className="oi oi-circle-x" style={{ color: "red" }}></i>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
