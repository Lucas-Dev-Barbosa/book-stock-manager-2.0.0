import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./Form.module.css";
import AlertError from "../../../layoult/components/AlertError";
import api from "../../../services/api";

const CadastroUsuario = () => {
  const [perfis, setPerfis] = useState([]);

  const nomeRef = useRef();
  const sobrenomeRef = useRef();
  const emailRef = useRef();
  const senhaRef = useRef();
  const perfilRef = useRef();
  const ativoRef = useRef();

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("usuarios/perfis")
      .then((response) => {
        if (response.status === 200) {
          setPerfis(response.data);
        }
      })
      .catch((err) => {
        toast.error("Erro ao buscar os dados do servidor", {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Erro na requisição: " + err);
      });
  }, []);

  //Processando os dados antes de enviar para a API
  function processaDadosUsuario() {
    const novoUsuario = {};
    novoUsuario.nome = nomeRef.current.value;
    novoUsuario.sobrenome = sobrenomeRef.current.value;
    novoUsuario.email = emailRef.current.value;
    novoUsuario.senha = senhaRef.current.value;
    novoUsuario.ativo = ativoRef.current.checked;
    novoUsuario.perfil =
      perfilRef.current.value === "0" ? null : { id: perfilRef.current.value };

    console.log(novoUsuario);

    return JSON.stringify(novoUsuario);
  }

  function submitHandler(e) {
    e.preventDefault();

    setErrors([]);

    let usuarioJson = processaDadosUsuario();

    api
      .post("usuarios", usuarioJson)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Usuário cadastrado no sistema com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate(`/lista-usuario/${response.data.email}`);
        }
      })
      .catch((err) => {
        toast.error("Erro ao tentar cadastrar o usuário no sistema!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        console.log("Erro na requisição: " + err);

        if (err.request.responseText) {
          let error = JSON.parse(err.request.responseText);
          if (error) {
            setErrors(error.message);
          }
        }
      });
  }

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className={classes.formCadastro + " row g-3 mx-auto"}
        noValidate
      >
        {errors &&
          errors.map((value, index) => (
            <AlertError mensagem={value} key={index} />
          ))}

        <h2>Cadastro de Usuário</h2>

        <p>
          Insira abaixo as informações pessoais e os dados de login do novo
          usuário!
        </p>

        <br />

        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input ref={nomeRef} type="text" className="form-control" id="nome" />
        </div>

        <div className="col-md-6">
          <label htmlFor="sobrenome" className="form-label">
            Sobrenome
          </label>

          <input
            ref={sobrenomeRef}
            type="text"
            className="form-control"
            id="sobrenome"
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <div className="input-group">
            <div className="input-group-text">@</div>
            <input
              ref={emailRef}
              type="text"
              className="form-control"
              id="email"
            />
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            ref={senhaRef}
            type="password"
            className="form-control"
            id="senha"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="perfil" className="form-label">
            Perfil
          </label>
          <select
            defaultValue={0}
            ref={perfilRef}
            id="perfil"
            className="form-select"
          >
            <option value={0}>Selecione um perfil para o usuário</option>
            {perfis &&
              perfis.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.nome}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-check form-switch col-md-12">
          <input
            ref={ativoRef}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Usuário Ativo
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
