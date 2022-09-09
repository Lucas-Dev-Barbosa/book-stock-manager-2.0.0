import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Filtro from "../../../layoult/components/Filtro";
import Table from "./Table";
import ControlePaginacao from "../../../layoult/components/ControlePaginacao";
import { useParams } from "react-router-dom";
import AlertWarn from "../../../layoult/components/AlertWarn";
import apiUsers from "../../../services/apiUsers";

const ListaUsuarios = () => {
  const [listaItens, setlistaItens] = useState({});
  const [paramsUri, setParamsUri] = useState({ filtro: "", pagina: "" });

  const [registroEditado, setRegistroEditado] = useState();

  const { buscaUsuario } = useParams();

  //Busca a lista dos usuários na API
  const getListaUsuario = useCallback(async () => {
    await apiUsers
      .get(
        "paginacao?filtro=" +
          (buscaUsuario && !paramsUri.filtro
            ? buscaUsuario
            : paramsUri.filtro
            ? paramsUri.filtro
            : "") +
          "&pagina=" +
          (paramsUri.pagina ? paramsUri.pagina : "1")
      )
      .then((response) => {
        setlistaItens(response.data);
      })
      .catch((err) => {
        toast.error("Erro ao buscar a lista de usuários", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Ocorreu um erro ao buscar os dados: " + err);
      });
  }, [paramsUri, buscaUsuario]);

  useEffect(() => {
    getListaUsuario();
  }, [getListaUsuario]);

  //Atualiza os dados do usuário no sistema
  function updateHandler() {
    if (registroEditado) {
      apiUsers
        .put("", registroEditado)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Informações do Usuário salvas com sucesso", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          toast.error("Erro ao enviar os dados do usuário", {
            position: toast.POSITION.TOP_RIGHT,
          });

          console.log("Erro na requisição: " + err);
        });

      setRegistroEditado();
      getListaUsuario();
    }
  }

  function editHandler(dadosRegistro) {
    setRegistroEditado(dadosRegistro);
  }

  return (
    <div>
      <AlertWarn
        id="modalEdit"
        titulo={"Editar usuário"}
        mensagem={"Confirma a edição dos dados deste usuário?"}
        buttonLabel={"Editar"}
        onClickAlert={updateHandler}
      />

      <h2>Lista dos usuários do sistema</h2>

      <br />

      <Filtro onSend={setParamsUri} label="Nome/Sobrenome/E-mail" />

      {listaItens.usuario && listaItens.usuario.length > 0 && (
        <Table
          listaRegistros={listaItens.usuario}
          onEdit={editHandler}
        />
      )}
      {!listaItens.usuario ||
        (listaItens.usuario.length < 1 && (
          <p className="col">Não existem usuários cadastrados no sistema!</p>
        ))}

      {listaItens.usuario && listaItens.usuario.length > 0 && (
        <ControlePaginacao
          onSend={setParamsUri}
          paginacao={{
            numPagina: listaItens.numPagina,
            totalPaginas: listaItens.totalPaginas,
            filtro: paramsUri.filtro,
          }}
        />
      )}
    </div>
  );
};

export default ListaUsuarios;
