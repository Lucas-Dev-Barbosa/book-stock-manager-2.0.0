import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiAuth from "../../../services/apiAuth";
import { useSelector } from "react-redux";

const PerfilUsuario = () => {
  const [perfilUsuario, setPerfilUsuario] = useState({});

  const { roles } = useSelector((state) => state);

  const getPerfilUsuario = useCallback(async () => {
    await apiAuth
      .get("realms/bookstock/protocol/openid-connect/userinfo")
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

      <div className="col-md-12">
        <span>Nome</span>
        <div className="col-sm-10">
          <span className="fs-3">{perfilUsuario.name}</span>
        </div>
      </div>

      <div className="col-md-12">
        <span>E-mail</span>
        <div className="col-sm-10">
          <span className="fs-3">{perfilUsuario.email}</span>
        </div>
      </div>

      <div className="col-md-12">
        <span>Perfil</span>
        <div className="col-sm-10">
          <span className="fs-3">{roles}</span>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
