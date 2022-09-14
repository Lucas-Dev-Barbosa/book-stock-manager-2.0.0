import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ControlePaginacao from "../../../layoult/components/ControlePaginacao";
import Filtro from "../../../layoult/components/Filtro";
import Spinner from "../../../layoult/components/Spinner";
import apiLivros from "../../../services/apiLivros";
import ListaItens from "./ListaItens";

const ListaLivrosCadastrados = () => {
  const [listaItens, setlistaItens] = useState({});
  const [paramsUri, setParamsUri] = useState({ filtro: "", pagina: "" });

  const [loading, setLoading] = useState(true);

  //Busca a lista dos livros na API
  const getListaLivros = useCallback(async () => {
    setLoading(true);

    await apiLivros
      .get(
        "livros/paginacao?filtro=" +
          (paramsUri.filtro ? paramsUri.filtro : "") +
          "&pagina=" +
          (paramsUri.pagina ? paramsUri.pagina : "")
      )
      .then((response) => {
        setlistaItens(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao buscar a lista no estoque", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Ocorreu um erro ao buscar os dados: " + err);
        setLoading(false);
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

      {loading && <Spinner />}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {!loading && listaItens.content && listaItens.content.length > 0 && (
          <ListaItens listaItens={listaItens.content} />
        )}
        {!loading && (!listaItens.content || listaItens.content.length < 1) && (
          <p className="col">Não existem livros cadastrados no estoque!</p>
        )}
      </div>

      {!loading && listaItens.content && listaItens.content.length > 0 && (
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
