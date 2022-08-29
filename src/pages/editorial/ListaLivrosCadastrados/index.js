import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ControlePaginacao from "../../../layoult/components/ControlePaginacao";
import Filtro from "../../../layoult/components/Filtro";
import api from "../../../services/api";
import ListaItens from "./ListaItens";

const ListaLivrosCadastrados = (props) => {
  const [listaItens, setlistaItens] = useState({});
  const [paramsUri, setParamsUri] = useState({ filtro: "", pagina: "" });

  //Busca a lista dos livros na API
  const getListaLivros = useCallback(async () => {
    await api
      .get(
        "livros/paginacao?filtro=" +
          (paramsUri.filtro ? paramsUri.filtro : "") +
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
  }, [paramsUri]);

  useEffect(() => {
    getListaLivros();
  }, [getListaLivros]);

  return (
    <div>
      <h2>Lista dos livros cadastrados no sistema</h2>

      <br />

      <Filtro onSend={setParamsUri} label="Título do livro" />

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {listaItens.content && listaItens.content.length > 0 && (
          <ListaItens listaItens={listaItens.content} />
        )}
        {(!listaItens.content || listaItens.content.length < 1) && (
          <p className="col">Não existem livros cadastrados no estoque!</p>
        )}
      </div>

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

export default ListaLivrosCadastrados;
