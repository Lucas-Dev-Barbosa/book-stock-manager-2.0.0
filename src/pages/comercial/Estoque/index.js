import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Filtro from "../../../layoult/components/Filtro";
import Table from "./Table";
import ControlePaginacao from "../../../layoult/components/ControlePaginacao";
import { useParams } from "react-router-dom";
import AlertWarn from "../../../layoult/components/AlertWarn";
import api from "../../../services/api";

const Estoque = () => {
  const [listaItens, setlistaItens] = useState({});
  const [paramsUri, setParamsUri] = useState({ filtro: "", pagina: "" });
  const [registroEditado, setRegistroEditado] = useState();

  const { tituloLivro } = useParams();

  //Busca a lista dos registros no estoque na API
  const getListaEstoque = useCallback(async () => {
    await api
      .get(
        "estoque/paginacao?filtro=" +
          (tituloLivro && !paramsUri.filtro
            ? tituloLivro
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
        toast.error("Erro ao buscar a lista no estoque", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Ocorreu um erro ao buscar os dados: " + err);
      });
  }, [paramsUri, tituloLivro]);

  useEffect(() => {
    getListaEstoque();
  }, [getListaEstoque]);

  //Atualiza os dados do livro no estoque
  function updateHandler() {
    if (registroEditado) {
      api
        .put("estoque", registroEditado)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Informações do Estoque salvas com sucesso", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {
          toast.error("Erro ao enviar os dados do estoque", {
            position: toast.POSITION.TOP_RIGHT,
          });

          console.log("Erro na requisição: " + err);
        });

      setRegistroEditado();
      getListaEstoque();
    }
  }

  function editHandler(dadosRegistro) {
    setRegistroEditado(dadosRegistro);
  }

  return (
    <div>
      <AlertWarn
        titulo={"Editar estoque"}
        mensagem={"Confirma a edição dos dados deste título?"}
        buttonLabel={"Editar"}
        onClickAlert={updateHandler}
      />

      <h2>Estoque</h2>

      <br />

      <Filtro onSend={setParamsUri} label="Título do livro" />

      {listaItens.content && listaItens.content.length > 0 && (
        <Table listaRegistros={listaItens.content} onEdit={editHandler} />
      )}
      {(!listaItens.content || listaItens.content.length < 1) && (
        <p className="col">O estoque se encontra vazio!</p>
      )}

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

export default Estoque;
