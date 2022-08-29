import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Filtro from "../../../layoult/components/Filtro";
import Table from "./Table";
import ControlePaginacao from "../../../layoult/components/ControlePaginacao";
import { useParams } from "react-router-dom";
import AlertWarn from "../../../layoult/components/AlertWarn";
import api from "../../../services/api";

const ListaUsuarios = () => {
  const [listaItens, setlistaItens] = useState({});
  const [paramsUri, setParamsUri] = useState({ filtro: "", pagina: "" });
  const [perfis, setPerfis] = useState([]);

  const [registroEditado, setRegistroEditado] = useState();
  const [registroExcluido, setRegistroExcluido] = useState();

  const { buscaUsuario } = useParams();

  //Obtem a lista de perfis disponíveis na base
  const getListaPerfis = useCallback(async () => {
    await api
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

  useEffect(() => {
    getListaPerfis();
  }, [getListaPerfis]);

  //Busca a lista dos usuários na API
  const getListaUsuario = useCallback(async () => {
    await api
      .get(
        "usuarios/paginacao?filtro=" +
          (buscaUsuario && !paramsUri.filtro
            ? buscaUsuario
            : paramsUri.filtro
            ? paramsUri.filtro
            : "") +
          "&pagina=" +
          (paramsUri.pagina ? paramsUri.pagina : "")
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
      api
        .put("usuarios", registroEditado)
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

  //Remove o usuário no sistema
  function removeHandler() {
    if (registroExcluido) {
      api
        .delete(`usuarios/${registroExcluido}`)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Usuário excluído do sistema com sucesso", {
              position: toast.POSITION.TOP_RIGHT,
            });

            getListaUsuario();
          }
        })
        .catch((err) => {
          toast.error("Erro ao enviar os dados do usuário", {
            position: toast.POSITION.TOP_RIGHT,
          });

          console.log("Erro na requisição: " + err);
        });

      setRegistroExcluido();
    }
  }

  function deleteHandler(idRegistro) {
    setRegistroExcluido(idRegistro);
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

      <AlertWarn
        id="modalDelete"
        titulo={"Excluir usuário"}
        mensagem={"Deseja realmente excluir este usuário do sistema?"}
        buttonLabel={"Excluir"}
        onClickAlert={removeHandler}
      />

      <h2>Lista dos usuários do sistema</h2>

      <br />

      <Filtro onSend={setParamsUri} label="Nome/Sobrenome/E-mail" />

      {listaItens.content && listaItens.content.length > 0 && perfis && (
        <Table
          listaRegistros={listaItens.content}
          selectPerfis={perfis}
          onEdit={editHandler}
          onDelete={deleteHandler}
        />
      )}
      {!listaItens.content ||
        (listaItens.content.length < 1 && (
          <p className="col">Não existem usuários cadastrados no sistema!</p>
        ))}

      {listaItens.content && listaItens.content.length > 0 && (
        <ControlePaginacao
          onSend={setParamsUri}
          paginacao={{
            numPagina: listaItens.number + 1,
            totalPaginas: listaItens.totalPages,
            filtro: paramsUri.filtro,
          }}
        />
      )}
    </div>
  );
};

export default ListaUsuarios;
